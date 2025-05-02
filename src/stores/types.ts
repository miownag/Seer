import type { CodeLanguage, GitFileStatus } from '@/constants/enums';

type fileType = 'file';
type folderType = 'folder';
type fsItemType = fileType | folderType;

interface IFsItemBase {
  name: string;
  gitStatus: GitFileStatus;
  parentFolder?: IFolder;
}

interface IFile extends IFsItemBase {
  type: fileType;
  language: CodeLanguage;
}

interface IFolder extends IFsItemBase {
  type: folderType;
  children: fsItem[];
}

type fsItem = IFile | IFolder;

type State = {
  fileTree: fsItem[];
  selectedFsItem: fsItem | undefined;
  expandedFolders: IFolder[];
  aiVisible: boolean;
};

type Actions = {
  createFsItem: (name: string, type: fsItemType) => void;
  renameFsItem: (fsItem: fsItem, newName: string) => void;
  editFileContent: (file: IFile, newContent: string) => void;
  deleteFsItem: (fsItem: fsItem) => void;
  expandFolders: (folders: IFolder[]) => void;
  selectFsItem: (fsItem: fsItem) => void;
  setAiVisible: (visible: boolean) => void;
};

export type {
  fileType,
  folderType,
  IFile,
  IFolder,
  fsItem,
  State,
  Actions,
  IFsItemBase,
};
