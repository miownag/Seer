import { FileType, GitFileStatus } from '@/constants/enums';
import { findTreeNode, getFileTypeByName } from '@/utils';
import { WebContainer } from '@webcontainer/api';
import { enableMapSet } from 'immer';
import { createContext, useContext } from 'react';
import { useStore } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { useShallow } from 'zustand/react/shallow';
import { createStore } from 'zustand/vanilla';
import type { Actions, IFile, State } from './types';

const fileTreeData: IFile[] = [
  {
    id: 'root-folder',
    label: 'root-folder',
    fileType: FileType.folder,
    children: [],
    path: '/root-folder',
    gitStatus: GitFileStatus.none,
  },
];

const buildFileTree = async (
  webcontainer: WebContainer,
  path: string,
): Promise<IFile[]> => {
  const entries = await webcontainer.fs.readdir(path, { withFileTypes: true });
  const children = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = `${path}/${entry.name}`;
      return {
        id: fullPath, // 用完整路径作为唯一 ID
        label: entry.name,
        fileType: entry.isDirectory()
          ? FileType.folder
          : getFileTypeByName(entry.name),
        path: fullPath,
        children: entry.isDirectory()
          ? await buildFileTree(webcontainer, fullPath)
          : [],
        gitStatus: GitFileStatus.none,
      };
    }),
  );
  return children;
};

enableMapSet();

const mainStore = createStore<State & Actions>()(
  immer((set, get) => ({
    fileTree: [],
    selectedFsItem: undefined,
    expandedFolders: [],
    aiVisible: false,
    webcontainer: null,
    webcontainerReady: false,
    webcontainerLoading: false,

    setWebcontainer: (webcontainer) => {
      set((state) => {
        state.webcontainer = webcontainer;
        state.webcontainerReady = true;
      });
    },

    initWebcontainer: async () => {
      if (get().webcontainerReady) return;
      try {
        set({
          webcontainerLoading: true,
        });
        const webcontainer = await WebContainer.boot();
        get().setWebcontainer(webcontainer);
      } catch (error) {
        console.error('Failed to initialize WebContainer:', error);
      }
    },

    syncFileTreeFromFs: async () => {
      const fileTree = await buildFileTree(
        get().webcontainer as WebContainer,
        '/',
      );
      console.log('测试文件树', fileTree);
      set({
        fileTree,
      });
    },

    /**
     * 加载文件树：1.加载至Web Container 2.加载至本地状态
     */
    loadFileTree: async () => {
      const { webcontainer } = get();
      // biome-ignore lint/complexity/noForEach: <explanation>
      fileTreeData.forEach(async (item) => {
        if (item.fileType === 'folder') {
          await webcontainer?.fs.mkdir(item.id);
        } else {
          await webcontainer?.fs.writeFile(item.id, '');
        }
      });
      await get().syncFileTreeFromFs();
      set({
        fileTree: fileTreeData,
        webcontainerLoading: false,
      });
    },

    createFsItem: async (label, fileType) => {
      const { fileTree, selectedFsItem, webcontainer, syncFileTreeFromFs } =
        get();
      const [selectedFsItemNode, parentNode] = findTreeNode(
        fileTree,
        selectedFsItem ?? '',
      );
      let basePath = '';
      if (!selectedFsItemNode) {
        basePath = '/';
      } else {
        basePath =
          selectedFsItemNode.fileType === 'folder'
            ? selectedFsItemNode.path
            : parentNode?.path || '/';
      }
      const fullPath = `${basePath}/${label}`;
      try {
        if (fileType === FileType.folder) {
          await webcontainer?.fs.mkdir(fullPath); // 调用 WebContainer API 创建目录
        } else {
          await webcontainer?.fs.writeFile(fullPath, ''); // 创建文件
        }
        // 创建后自动同步状态
        await syncFileTreeFromFs();
        return fullPath;
      } catch (err) {
        console.error('创建失败:', err);
        return false;
      }
    },

    renameFsItem: async (id, newName, fileType) => {
      if (!id) return;
      const { webcontainer, syncFileTreeFromFs } = get();
      console.log('重命名', id, newName);
      await webcontainer?.fs.rename(
        id,
        `${id.split('/').slice(0, -1).join('/')}/${newName}`,
      );
      syncFileTreeFromFs();
    },

    editFileContent: (_file, newContent) => {},

    deleteFsItem: async (id) => {
      if (!id) return;
      const { webcontainer, syncFileTreeFromFs } = get();
      try {
        await webcontainer?.fs.rm(id, {
          recursive: true,
        });
        syncFileTreeFromFs();
      } catch (e) {
        console.error('删除失败:', e);
      }
    },

    expandFolders: (folders) => {},
    foldFolders: (folders, foldChildren = false) => {},

    selectFsItem: (id) => {
      set({
        selectedFsItem: id,
      });
    },

    toggleAiVisible: () => {
      set((state) => ({
        aiVisible: !state.aiVisible,
      }));
    },
  })),
);

// 在store创建后立即初始化webcontainer
mainStore
  .getState()
  .initWebcontainer()
  .then(() => {
    if (mainStore.getState().webcontainerReady) {
      mainStore.getState().loadFileTree();
    }
  });

const MainStoreContext = createContext<typeof mainStore | null>(null);

const useMainStore = <TSelected>(
  selector: (state: State & Actions) => TSelected,
): TSelected => {
  const store = useContext(MainStoreContext);
  if (!store) throw new Error('Missing Provider in the tree');
  return useStore(store, useShallow(selector));
};

export { mainStore, MainStoreContext, useMainStore };
