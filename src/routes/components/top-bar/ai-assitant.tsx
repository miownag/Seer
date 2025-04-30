import SmartToyRoundedIcon from '@mui/icons-material/SmartToyRounded';
import { Box } from '@mui/material';

const AiAssistant = () => {
  const openAssistant = () => {
    // TODO: 打开 AI 助手
  };
  return (
    <Box className="hover:bg-slate-200 cursor-pointer h-12 flex items-center justify-center w-40 rounded-md">
      <SmartToyRoundedIcon className="text-orange-600" fontSize="large" />
      <Box
        component="span"
        className="ml-2 text-sm text-gray-500 font-bold"
        onClick={openAssistant}
      >
        打开 AI 助手
      </Box>
    </Box>
  );
};

export default AiAssistant;
