import type { FileType, GitFileStatus } from '@/constants/enums';
import type { TreeViewBaseItem } from '@mui/x-tree-view';
import type { WebContainer } from '@webcontainer/api';

interface IFile {
  id: string;
  label: string;
  gitStatus: GitFileStatus;
  path: string;
  parentFolder?: IFile;
  fileType?: FileType;
  children?: IFile[];
  content?: string;
}

type State = {
  fileTree: TreeViewBaseItem<IFile>[];
  selectedFsItem: string | undefined;
  expandedFolders: string[];
  aiVisible: boolean;
  webcontainer: WebContainer | null;
  webcontainerReady: boolean;
  webcontainerLoading: boolean;
};

type Actions = {
  loadFileTree: () => Promise<void>;
  syncFileTreeFromFs: () => Promise<void>;
  createFsItem: (name: string, type?: FileType) => Promise<string | false>;
  renameFsItem: (id: string, newName: string, type?: FileType) => void;
  editFileContent: (id: string, newContent: string) => void;
  deleteFsItem: (id: string) => void;
  expandFolders: (ids: string[]) => void;
  foldFolders: (ids: string[] | 'all', foldChildren?: boolean) => void;
  selectFsItem: (id: string) => void;
  toggleAiVisible: () => void;
  setWebcontainer: (webcontainer: WebContainer) => void;
  initWebcontainer: () => Promise<void>;
};

export type { IFile, State, Actions };
