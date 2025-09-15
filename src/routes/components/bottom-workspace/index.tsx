import ResizableBox from '@/components/resizable-box';
import ReportProblemRoundedIcon from '@mui/icons-material/ReportProblemRounded';
import TerminalRoundedIcon from '@mui/icons-material/TerminalRounded';
import { Box, Tab, Tabs } from '@mui/material';
import { useRef, useState } from 'react';
import TerminalComp from './components/terminal';
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  style?: React.CSSProperties;
}

const a11yProps = (index: number) => ({
  id: `simple-tab-${index}`,
  'aria-controls': `simple-tabpanel-${index}`,
});

const CustomTabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <div className="w-full h-full p-2">{children}</div>}
    </div>
  );
};

const BottomWorkspace = () => {
  const [tab, setTab] = useState(1);
  const terminalRef = useRef<{ resize: () => void }>(null);
  const [terminalTabHeight, setTerminalTabHeight] = useState(0);

  return (
    <ResizableBox
      onSizeChange={(_width, height) => {
        setTerminalTabHeight(height - 60);
        terminalRef.current?.resize();
      }}
      contentClassName="bg-white rounded-lg p-2"
      positions={['top']}
      fixedWidth="w-full"
      defaultHeight={300}
      maxHeight={350}
      minHeight={200}
    >
      <Box className="w-full h-full">
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={tab}
            onChange={(_, tab) => setTab(tab)}
            sx={{
              '& .MuiTab-root': { minHeight: 0 },
              '& .Mui-selected': {
                color: 'rgb(251, 146, 60) !important',
                fontWeight: 'bold',
              },
              '& .MuiTabs-indicator': {
                backgroundColor: 'rgb(251, 146, 60) !important',
              },
            }}
          >
            <Tab
              label="问题"
              icon={<ReportProblemRoundedIcon />}
              iconPosition="start"
              sx={{ fontSize: 14, fontWeight: 'bold' }}
              {...a11yProps(0)}
            />
            <Tab
              label="终端"
              icon={<TerminalRoundedIcon />}
              iconPosition="start"
              sx={{ fontSize: 14, fontWeight: 'bold' }}
              {...a11yProps(1)}
            />
          </Tabs>
        </Box>
        <CustomTabPanel value={tab} index={0}>
          问题
        </CustomTabPanel>
        <CustomTabPanel
          value={tab}
          index={1}
          style={{ height: terminalTabHeight }}
        >
          <TerminalComp ref={terminalRef} />
        </CustomTabPanel>
      </Box>
    </ResizableBox>
  );
};

export default BottomWorkspace;
