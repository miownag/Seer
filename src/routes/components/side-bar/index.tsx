import type { matchesType } from '@/typings/modern';
import { useMatches, useNavigate } from '@modern-js/runtime/router';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import { Box, Stack } from '@mui/material';
import SideBarAvatar from './avatar';
import BarItem from './bar-item';
import { topHalfItems } from './config';

const SideBar = () => {
  const matches = useMatches() as matchesType;
  const currentPath = matches[1]?.handle?.pathName;
  const navigate = useNavigate();

  // TODO: 处理items，加上badgeInfo

  return (
    <div className="w-14 flex flex-col justify-between items-center pb-2">
      <Box component="section">
        <Stack spacing={2}>
          {topHalfItems.map(({ pathName, ...restProps }) => (
            <BarItem
              key={pathName}
              {...restProps}
              clicked={pathName === currentPath}
              onClick={() => {
                navigate(`/${pathName === currentPath ? '' : pathName}`);
              }}
            />
          ))}
        </Stack>
      </Box>
      <Stack spacing={2} className="items-center">
        <SideBarAvatar />
        <Box
          component="button"
          className="w-8 h-8 hover:bg-gray-200 flex justify-center items-center cursor-pointer rounded-md"
          onClick={() => {
            console.log('click settings');
          }}
        >
          <SettingsRoundedIcon />
        </Box>
      </Stack>
    </div>
  );
};

export default SideBar;
