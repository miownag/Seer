import { useTreeViewApiRef } from '@mui/x-tree-view/hooks';
import FileTree from './file-tree';
import OperateArea from './operate-area';

const FileWorkspace = () => {
  const apiRef = useTreeViewApiRef();
  return (
    <div className="w-full h-full flex flex-col">
      <OperateArea apiRef={apiRef} />
      <FileTree apiRef={apiRef} />
    </div>
  );
};

export default FileWorkspace;
