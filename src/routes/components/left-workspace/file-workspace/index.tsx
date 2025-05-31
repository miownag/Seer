import { useTreeViewApiRef } from '@mui/x-tree-view/hooks';
import FileTree from './file-tree';
import OperateArea from './operate-area';

const FileWorkspace = () => {
  const apiRef = useTreeViewApiRef();
  return (
    <>
      <OperateArea apiRef={apiRef} />
      <FileTree apiRef={apiRef} />
    </>
  );
};

export default FileWorkspace;
