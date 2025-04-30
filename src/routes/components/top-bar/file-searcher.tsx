import ContentPasteSearchRoundedIcon from '@mui/icons-material/ContentPasteSearchRounded';
import { Autocomplete, Box, TextField } from '@mui/material';
import { useState } from 'react';

const FileSearcher = () => {
  // TODO: 从状态管理库中获取文件列表
  const fileList = ['index.ts', 'src/components/test.tsx'];
  const [inputValue, setInputValue] = useState('');

  return (
    <Autocomplete
      popupIcon={<ContentPasteSearchRoundedIcon />}
      disablePortal
      fullWidth
      size="small"
      options={fileList}
      renderOption={(props, option) => {
        return (
          <Box component="li" {...props} key={option}>
            <Box className="flex items-center">
              <Box component="span" className="mr-2">
                {option.split('/').slice(-1)[0]}
              </Box>
              <Box component="span" className="text-gray-400">
                {option}
              </Box>
            </Box>
          </Box>
        );
      }}
      inputValue={inputValue}
      onInputChange={(_e, value) => setInputValue(value)}
      renderInput={params => <TextField {...params} label="文件名/路径" />}
      onChange={(_e, value) => {
        setInputValue('');
        console.log('打开文件', value);
        // TODO: 打开某个文件
      }}
      value={null}
    />
  );
};

export default FileSearcher;
