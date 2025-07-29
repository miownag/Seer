import { GitFileStatus } from '@/constants/enums';
import { findTreeNode } from '@/utils';
import { WebContainer } from '@webcontainer/api';
import { enableMapSet } from 'immer';
import { createContext, useContext } from 'react';
import { useStore } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { useShallow } from 'zustand/react/shallow';
import { createStore } from 'zustand/vanilla';
import type { Actions, IFile, State } from './types';

enableMapSet();

const mainStore = createStore<State & Actions>()(
  immer((set, get) => ({
    fileTree: [],
    selectedFsItem: undefined,
    expandedFolders: [],
    aiVisible: false,
    webcontainer: null,
    webcontainerReady: false,

    setWebcontainer: (webcontainer) => {
      set((state) => {
        state.webcontainer = webcontainer;
        state.webcontainerReady = true;
      });
    },

    initWebcontainer: async () => {
      try {
        const webcontainer = await WebContainer.boot();
        get().setWebcontainer(webcontainer);
        console.log('WebContainer initialized successfully');
      } catch (error) {
        console.error('Failed to initialize WebContainer:', error);
      }
    },

    createFsItem: (label, fileType) => {
      const newId = `${Date.now()}-${Math.random()}-${label}`;
      set((state) => {
        const { fileTree, selectedFsItem } = state;
        const [selectedFsItemNode, parentNode] = findTreeNode(
          fileTree,
          selectedFsItem ?? '',
        );
        const newFileItem: IFile = {
          id: newId,
          label,
          fileType,
          gitStatus: GitFileStatus.new,
        };
        if (fileType === 'folder') {
          newFileItem.children = [];
        }
        if (
          !selectedFsItemNode ||
          (selectedFsItemNode.fileType !== 'folder' &&
            selectedFsItemNode.fileType !== 'pinned' &&
            !selectedFsItemNode.parentFolder)
        ) {
          fileTree.push(newFileItem);
          return;
        }
        const parentFolder = (
          selectedFsItemNode.fileType === 'folder'
            ? selectedFsItemNode
            : parentNode
        ) as IFile;
        newFileItem.parentFolder = parentFolder;
        parentFolder.children?.push(newFileItem);
      });
      return newId;
    },

    renameFsItem: (fsItem, newName, fileType) => {
      set((state) => {
        const { fileTree } = state;
        const [fsItemNode] = findTreeNode(fileTree, fsItem);
        if (!fsItemNode) return;
        fsItemNode.label = newName;
        fsItemNode.fileType = fileType;
      });
    },
    editFileContent: (file, newContent) => {},
    deleteFsItem: (fsItem) => {},
    expandFolders: (folders) => {},
    foldFolders: (folders, foldChildren = false) => {},
    selectFsItem: (id) => {
      set((state) => {
        state.selectedFsItem = id;
        return state;
      });
    },
    setAiVisible: (visible) => {
      set((state) => {
        if (state.aiVisible !== visible) {
          state.aiVisible = visible;
        }
        return state;
      });
    },
  })),
);

// 在store创建后立即初始化webcontainer
mainStore.getState().initWebcontainer();

const MainStoreContext = createContext<typeof mainStore | null>(null);

const useMainStore = <TSelected>(
  selector: (state: State & Actions) => TSelected,
): TSelected => {
  const store = useContext(MainStoreContext);
  if (!store) throw new Error('Missing Provider in the tree');
  return useStore(store, useShallow(selector));
};

export { mainStore, MainStoreContext, useMainStore };
