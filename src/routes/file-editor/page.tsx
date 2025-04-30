import ResizableBox from '@/components/resizable-box';
import { Box } from '@mui/material';

const FileEditor = () => {
  return (
    <Box className="flex h-full">
      <ResizableBox
        className="bg-white rounded-lg"
        positions={['right']}
        fixedHeight="h-full"
        defaultWidth={200}
      >
        <div className="h-full">123</div>
      </ResizableBox>
      <div className="h-full flex-1">456</div>
    </Box>
  );
};

export default FileEditor;
