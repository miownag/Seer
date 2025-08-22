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
    id: '//root-folder',
    label: 'root-folder',
    fileType: FileType.folder,
    children: [
      {
        id: '//root-folder/a.ts',
        label: 'a.ts',
        fileType: FileType.typescript,
        gitStatus: GitFileStatus.none,
      },
    ],
    gitStatus: GitFileStatus.none,
  },
];

const buildFileTree = async (
  webcontainer: WebContainer,
  path: string,
): Promise<IFile[]> => {
  const entries = await webcontainer.fs.readdir(path, { withFileTypes: true });
  console.log('根目录2', path, await webcontainer?.fs.readdir('//root-folder'));
  const children = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = `${path}/${entry.name}`;
      return {
        id: fullPath, // 用完整路径作为唯一 ID
        label: entry.name,
        fileType: entry.isDirectory()
          ? FileType.folder
          : getFileTypeByName(entry.name),
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
    fileContentMap: new Map(),
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
      const { webcontainer, syncFileTreeFromFs } = get();
      // biome-ignore lint/complexity/noForEach: <explanation>
      fileTreeData.forEach(async (item) => {
        if (item.fileType === 'folder') {
          await webcontainer?.fs.mkdir(item.id);
        } else {
          await webcontainer?.fs.writeFile(item.id, '');
        }
      });
      await syncFileTreeFromFs();
      set({
        webcontainerLoading: false,
      });
    },

    createFsItem: async (label, fileType) => {
      console.log('dispatch create');
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
            ? selectedFsItemNode.id
            : parentNode?.id || '/';
      }
      const fullPath = `${basePath}/${label}`;
      console.log('创建文件', fullPath);
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
      console.log('dispatch rename');
      if (!id) return;
      const { webcontainer, syncFileTreeFromFs, fileContentMap } = get();
      const newPath = `${id.split('/').slice(0, -1).join('/')}/${newName}`;
      if (id === newPath) return;
      console.log('重命名', id, newPath);
      await webcontainer?.fs.rename(id, newPath);
      console.log('根目录', await webcontainer?.fs.readdir('//root-folder'));
      await syncFileTreeFromFs();
      if (fileContentMap.has(id)) {
        set((state) => {
          state.fileContentMap.set(newPath, fileContentMap.get(id) as string);
          fileContentMap.delete(id);
          return state;
        });
      }
    },

    editFileContent: async (id, newContent) => {
      if (!id) return;
      const { webcontainer } = get();
      await webcontainer?.fs.writeFile(id, newContent);
      set((state) => {
        state.fileContentMap.set(id, newContent);
        return state;
      });
    },

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

    selectFsItem: async (id) => {
      const { fileContentMap, webcontainer } = get();
      if (!fileContentMap.has(id)) {
        try {
          const content = (await webcontainer?.fs.readFile(id))?.toString();
          set((state) => {
            state.fileContentMap.set(id, content || '');
            return state;
          });
        } catch (e) {
          console.error('读取文件内容失败:', e);
        }
      }
      set({
        selectedFsItem: id,
        fileContentMap,
      });
    },

    getFileType: (id) => {
      if (!id) return;
      const { fileTree } = get();
      const [node] = findTreeNode(fileTree, id);
      return node?.fileType;
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
