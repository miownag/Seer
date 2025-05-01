import TooltipIconButton from '@/components/tooltip-icon-button';
import CreateNewFolderRoundedIcon from '@mui/icons-material/CreateNewFolderRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import NoteAddRoundedIcon from '@mui/icons-material/NoteAddRounded';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import UnfoldLessRoundedIcon from '@mui/icons-material/UnfoldLessRounded';
import { Box, Stack } from '@mui/material';

const OperateArea = () => {
  return (
    <Box className="h-6 w-full flex items-center justify-between pl-2 mb-4">
      <Box className="text-gray-700 font-bold">文件</Box>
      <Stack direction="row">
        <TooltipIconButton content="新建文件">
          <NoteAddRoundedIcon fontSize="small" />
        </TooltipIconButton>
        <TooltipIconButton content="新建文件夹">
          <CreateNewFolderRoundedIcon fontSize="small" />
        </TooltipIconButton>
        <TooltipIconButton content="删除">
          <DeleteOutlineRoundedIcon fontSize="small" />
        </TooltipIconButton>
        <TooltipIconButton content="刷新">
          <RefreshRoundedIcon fontSize="small" />
        </TooltipIconButton>
        <TooltipIconButton content="折叠">
          <UnfoldLessRoundedIcon fontSize="small" />
        </TooltipIconButton>
      </Stack>
    </Box>
  );
};

export default OperateArea;
