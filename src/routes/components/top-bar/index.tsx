import SeerIcon from '@/assets/imgs/seer-icon.svg';
import { Box, Grid, Stack } from '@mui/material';
import AiAssistant from './ai-assitant';
import FileSearcher from './file-searcher';

const TopBar = () => {
  return (
    <Grid container className="h-16 w-screen flex pl-4 pr-4">
      <Grid size={5} className="flex items-center">
        <SeerIcon
          className="h-12 w-12"
          viewBox="0 0 1000 1000"
          style={{ marginLeft: -12 }}
        />
        <Box component="h1" className="flex items-center">
          <Box
            component="span"
            className="ml-2 text-2xl font-mono font-bold bg-gradient-to-tr from-pink-500 to-yellow-500 bg-clip-text text-transparent"
          >
            Seer
          </Box>
          <Box component="span" className="ml-4 text-sm text-slate-400">
            AI-Powered Web IDE
          </Box>
        </Box>
      </Grid>
      <Grid size={2} className="flex items-center justify-center">
        <FileSearcher />
      </Grid>
      <Grid size={5} className="flex items-center justify-end">
        <Stack direction="row" spacing={2} className="items-center">
          <AiAssistant />
          <Box component="span" className="h-full text-xs text-slate-400">
            Version: 0.0.1-alpha
          </Box>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default TopBar;
