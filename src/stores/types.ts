import type { FileType, GitFileStatus } from '@/constants/enums';
import type { TreeViewBaseItem } from '@mui/x-tree-view';
import type { WebContainer } from '@webcontainer/api';

interface IFile {
  id: string;
  label: string;
  gitStatus: GitFileStatus;
  parentFolder?: IFile;
  fileType?: FileType;
  children?: IFile[];
}

type State = {
  fileTree: TreeViewBaseItem<IFile>[];
  selectedFsItem: string | undefined;
  expandedFolders: string[];
  aiVisible: boolean;
  webcontainer: WebContainer | null;
  webcontainerReady: boolean;
};

type Actions = {
  createFsItem: (name: string, type?: FileType) => string;
  renameFsItem: (id: string, newName: string, type?: FileType) => void;
  editFileContent: (id: string, newContent: string) => void;
  deleteFsItem: (id: string) => void;
  expandFolders: (ids: string[]) => void;
  foldFolders: (ids: string[] | 'all', foldChildren?: boolean) => void;
  selectFsItem: (id: string) => void;
  setAiVisible: (visible: boolean) => void;
  setWebcontainer: (webcontainer: WebContainer) => void;
  initWebcontainer: () => Promise<void>;
};

export type { IFile, State, Actions };
