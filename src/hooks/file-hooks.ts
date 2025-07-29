import type { FileType } from '@/constants';
import { useMainStore } from '@/stores';
import { pick } from 'es-toolkit';

const useCreateFile = () => {
  const createFsItem = useMainStore((state) => state.createFsItem);
  const createFile = (label: string, fileType: FileType) => {
    createFsItem(label, fileType);
  };
  return {
    createFile,
  };
};

const useFileSystem = () => {
  const createFile = useCreateFile();
  const { fileTree, selectFsItem, selectedFsItem, renameFsItem } = useMainStore(
    (state) =>
      pick(state, [
        'fileTree',
        'selectFsItem',
        'selectedFsItem',
        'renameFsItem',
      ]),
  );
  return {
    fileTree,
    selectFsItem,
    selectedFsItem,
    renameFsItem,
    createFile,
  };
};

export { useFileSystem, useCreateFile };
