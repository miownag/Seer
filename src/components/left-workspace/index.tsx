import { Box } from '@mui/material';
import { useCallback, useRef, useState } from 'react';

const LeftWorkspace = () => {
  const [width, setWidth] = useState(200); // 初始宽度
  const ref = useRef<HTMLDivElement>(null);
  const startX = useRef(0);
  const startWidth = useRef(0);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      startX.current = e.clientX;
      startWidth.current = width;
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [width],
  );

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const newWidth = startWidth.current + (e.clientX - startX.current);
    setWidth(newWidth);
  }, []);

  const handleMouseUp = useCallback(() => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseMove]);

  return (
    <Box ref={ref} className="h-full" sx={{ width: `${width}px` }}>
      <Box className="h-full bg-gray-200">123</Box>
      <Box
        className="absolute right-0 top-0 h-full w-2 cursor-col-resize bg-gray-400"
        onMouseDown={handleMouseDown}
      />
    </Box>
  );
};

export default LeftWorkspace;
