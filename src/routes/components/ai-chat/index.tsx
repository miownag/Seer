import { useMainStore } from '@/stores';
import { Box } from '@mui/material';

const AIChat = () => {
  const visible = useMainStore((state) => state.aiVisible);
  return <Box className={`${visible ? '' : 'hidden'}`}>AI聊天框</Box>;
};

export default AIChat;
