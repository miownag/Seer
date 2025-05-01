import { Outlet } from '@modern-js/runtime/router';
import { Box } from '@mui/material';
import SideBar from './components/side-bar';
import TopBar from './components/top-bar';
import './index.css';
import AIChat from './components/ai-chat';
import BottomWorkspace from './components/bottom-workspace';
import LeftWorkspace from './components/left-workspace';

const Layout = () => {
  // TODO: 根组件逻辑，从store中取是否展示AI助手
  const showAI = false;
  return (
    <Box className="bg-slate-100 flex flex-col h-screen">
      <TopBar />
      <Box className="flex flex-1">
        <SideBar />
        <LeftWorkspace />
        <Box className="flex-1 pr-2 pb-2 flex flex-col">
          <Outlet />
          <BottomWorkspace />
        </Box>
        <AIChat visible={showAI} />
      </Box>
    </Box>
  );
};

export default Layout;
