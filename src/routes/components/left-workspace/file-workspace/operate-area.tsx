import TooltipIconButton from '@/components/tooltip-icon-button';
import { FileType } from '@/constants/enums';
import { useMainStore } from '@/stores';
import CreateNewFolderRoundedIcon from '@mui/icons-material/CreateNewFolderRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import NoteAddRoundedIcon from '@mui/icons-material/NoteAddRounded';
import UnfoldLessRoundedIcon from '@mui/icons-material/UnfoldLessRounded';
import { Box, Stack } from '@mui/material';
import { pick } from 'es-toolkit';

const OperateArea = () => {
  const { selectedFsItem, createFsItem, deleteFsItem, foldFolders } =
    useMainStore((state) =>
      pick(state, [
        'selectedFsItem',
        'createFsItem',
        'deleteFsItem',
        'foldFolders',
      ]),
    );
  return (
    <Box className="h-6 w-full flex items-center justify-between pl-2 mb-4">
      <Box className="text-gray-700 font-bold">文件</Box>
      <Stack direction="row">
        <TooltipIconButton
          content="新建文件"
          buttonProps={{
            onClick: () => createFsItem('test.ts', FileType.typescript),
          }}
        >
          <NoteAddRoundedIcon fontSize="small" />
        </TooltipIconButton>
        <TooltipIconButton
          content="新建文件夹"
          buttonProps={{
            onClick: () => createFsItem('test', FileType.folder),
          }}
        >
          <CreateNewFolderRoundedIcon fontSize="small" />
        </TooltipIconButton>
        <TooltipIconButton
          content="删除"
          buttonProps={{
            onClick: () => {
              if (selectedFsItem) {
                deleteFsItem(selectedFsItem);
              }
            },
          }}
        >
          <DeleteOutlineRoundedIcon fontSize="small" />
        </TooltipIconButton>
        <TooltipIconButton
          content="折叠"
          buttonProps={{
            onClick: () => {
              foldFolders('all');
            },
          }}
        >
          <UnfoldLessRoundedIcon fontSize="small" />
        </TooltipIconButton>
      </Stack>
    </Box>
  );
};

export default OperateArea;
