import { GitFileStatus } from '@/constants/enums';
import { createContext } from 'react';
import { immer } from 'zustand/middleware/immer';
import { createStore } from 'zustand/vanilla';
import type { Actions, IFile, IFolder, State } from './types';

const mainStore = createStore<State & Actions>()(
  immer((set) => ({
    fileTree: [],
    selectedFsItem: undefined,
    expandedFolders: [],
    aiVisible: false,
    createFsItem: (name, type) => {
      set((state) => {
        const { fileTree, selectedFsItem } = state;
        const baseItem = {
          name,
          type,
          gitStatus: GitFileStatus.new,
        };
        if (type === 'folder') {
          (baseItem as IFolder).children = [];
        }
        if (
          !selectedFsItem ||
          (selectedFsItem.type === 'file' && !selectedFsItem.parentFolder)
        ) {
          fileTree.push(baseItem as IFile);
          return state;
        }
        const parentFolder =
          selectedFsItem.type === 'file'
            ? (selectedFsItem.parentFolder as IFolder)
            : selectedFsItem;
        parentFolder.children.push(baseItem as IFile);
        return state;
      });
    },
    renameFsItem: (fsItem, newName) => {},
    editFileContent: (file, newContent) => {},
    deleteFsItem: (fsItem) => {},
    expandFolders: (folders) => {},
    selectFsItem: (fsItem) => {},
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

const MainStoreContext = createContext<typeof mainStore | null>(null);

export { mainStore, MainStoreContext };
