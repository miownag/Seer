import { Outlet } from '@modern-js/runtime/router';
import { Box } from '@mui/material';
import SideBar from './components/side-bar';
import TopBar from './components/top-bar';
import './index.css';
import ResizableBox from '@/components/resizable-box';
import LeftWorkspace from './components/left-workspace';

const Layout = () => {
  // TODO: 根组件逻辑
  return (
    <Box className="bg-slate-100 flex flex-col h-screen">
      <TopBar />
      <Box className="flex flex-1">
        <SideBar />
        <LeftWorkspace />
        <Box className="flex-1 pr-2 pb-2">
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
