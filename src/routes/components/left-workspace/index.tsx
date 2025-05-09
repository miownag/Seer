import ResizableBox from '@/components/resizable-box';
import { usePath } from '@/hooks';
import FileWorkspace from './file-workspace';

const LeftWorkspace = () => {
  const path = usePath();
  return (
    <ResizableBox
      contentClassName="bg-white rounded-lg p-2"
      positions={['right']}
      fixedHeight="h-full"
      defaultWidth={300}
      maxWidth={400}
      minWidth={220}
    >
      {path === 'file-editor' ? <FileWorkspace /> : null}
    </ResizableBox>
  );
};

export default LeftWorkspace;
