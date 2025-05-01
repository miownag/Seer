import { Box } from '@mui/material';
import type { FC } from 'react';

interface IProps {
  visible: boolean;
}

const AIChat: FC<IProps> = ({ visible }) => {
  return <Box className={`${visible ? '' : 'hidden'}`}>AI聊天框</Box>;
};

export default AIChat;
