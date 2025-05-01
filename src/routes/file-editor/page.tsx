import CodeEditor from '@/components/code-editor';
import { Box } from '@mui/material';

const FileEditor = () => {
  return (
    <Box className="flex h-full">
      <div className="h-full flex-1 rounded-lg">
        <CodeEditor />
      </div>
    </Box>
  );
};

export default FileEditor;
