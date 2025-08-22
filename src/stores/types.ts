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
  fileContentMap: Map<string, string>;
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
  editFileContent: (id: string, newContent: string) => Promise<void>;
  deleteFsItem: (id: string) => void;
  expandFolders: (ids: string[]) => void;
  foldFolders: (ids: string[] | 'all', foldChildren?: boolean) => void;
  selectFsItem: (id: string) => Promise<void>;
  toggleAiVisible: () => void;
  setWebcontainer: (webcontainer: WebContainer) => void;
  initWebcontainer: () => Promise<void>;
  getFileType: (id: string | undefined) => string | undefined;
};

export type { IFile, State, Actions };
