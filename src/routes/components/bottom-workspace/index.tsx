import ResizableBox from '@/components/resizable-box';
import ReportProblemRoundedIcon from '@mui/icons-material/ReportProblemRounded';
import TerminalRoundedIcon from '@mui/icons-material/TerminalRounded';
import { Box, Tab, Tabs } from '@mui/material';
import { useEffect, useState } from 'react';
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
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
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const BottomWorkspace = () => {
  const [tab, setTab] = useState(1);

  useEffect(() => {
    console.log('tab', tab);
  }, [tab]);

  return (
    <ResizableBox
      contentClassName="bg-white rounded-lg p-2"
      positions={['top']}
      fixedWidth="w-full"
      defaultHeight={300}
      maxHeight={350}
      minHeight={200}
    >
      <Box className="w-full">
        <Box
          sx={{ borderBottom: 1, borderColor: 'divider' }}
          // className="text-orange-400"
        >
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
        <CustomTabPanel value={tab} index={1}>
          终端
        </CustomTabPanel>
      </Box>
    </ResizableBox>
  );
};

export default BottomWorkspace;
