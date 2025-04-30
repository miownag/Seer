import CommitRoundedIcon from '@mui/icons-material/CommitRounded';
import FolderOpenRoundedIcon from '@mui/icons-material/FolderOpenRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

const topHalfItems = [
  {
    pathName: 'file-editor',
    // tooltip: '文件',
    icon: <FolderOpenRoundedIcon />,
  },
  {
    pathName: 'search',
    // tooltip: '搜索',
    icon: <SearchRoundedIcon />,
  },
  {
    pathName: 'diff',
    tooltip: '变动',
    icon: <CommitRoundedIcon />,
  },
];

export { topHalfItems };
