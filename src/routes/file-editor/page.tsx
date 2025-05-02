import CodeEditor from '@/components/code-editor';
import { Box } from '@mui/material';

const FileEditor = () => {
  return (
    <Box className="flex flex-1 p-2 rounded-lg bg-white">
      <CodeEditor />
    </Box>
  );
};

export default FileEditor;
