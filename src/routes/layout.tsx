import { Outlet } from '@modern-js/runtime/router';
import { Box } from '@mui/material';
import SideBar from './components/side-bar';
import TopBar from './components/top-bar';
import './index.css';
import { MainStoreContext, mainStore } from '@/stores';
import AIChat from './components/ai-chat';
import BottomWorkspace from './components/bottom-workspace';
import LeftWorkspace from './components/left-workspace';

const Layout = () => {
  return (
    <MainStoreContext.Provider value={mainStore}>
      <Box className="bg-slate-100 flex flex-col h-screen">
        <TopBar />
        <Box className="flex flex-1 mb-2 min-h-0">
          {/* 添加min-h-0防止flex子元素溢出 */}
          <SideBar />
          <LeftWorkspace />
          <Box className="flex-1 pr-2 flex flex-col min-w-0">
            {/* 添加min-w-0防止flex子元素溢出 */}
            <Outlet />
            <BottomWorkspace />
          </Box>
          <AIChat />
        </Box>
      </Box>
    </MainStoreContext.Provider>
  );
};

export default Layout;
