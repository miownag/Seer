import { Box, type SxProps, type Theme } from '@mui/material';
import {
  type CSSProperties,
  type FC,
  type ReactElement,
  useCallback,
  useRef,
  useState,
} from 'react';

interface IProps {
  children: ReactElement | null;
  containerClassName?: string;
  contentClassName?: string;
  positions: Array<'left' | 'right' | 'top' | 'bottom'>;
  defaultHeight?: number;
  defaultWidth?: number;
  fixedHeight?: CSSProperties['height'];
  fixedWidth?: CSSProperties['width'];
}

const ResizableBox: FC<IProps> = ({
  children,
  contentClassName,
  containerClassName,
  positions,
  defaultHeight = 0,
  defaultWidth = 0,
  fixedHeight,
  fixedWidth,
}) => {
  const posSet = new Set(positions);
  const [width, setWidth] = useState<number>(defaultWidth);
  const [height, setHeight] = useState<number>(defaultHeight);
  const ref = useRef<HTMLDivElement>(null);
  const startX = useRef(0);
  const startY = useRef(0);
  const startWidth = useRef(0);
  const startHeight = useRef(0);
  const resizeRight = posSet.has('right') && !fixedWidth;
  const resizeLeft = posSet.has('left') && !fixedWidth;
  const resizeTop = posSet.has('top') && !fixedHeight;
  const resizeBottom = posSet.has('bottom') && !fixedHeight;

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      startX.current = e.clientX;
      startY.current = e.clientY;
      startWidth.current = width;
      startHeight.current = height;
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [width, height],
  );

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const newWidth = startWidth.current + (e.clientX - startX.current);
    const newHeight = startHeight.current + (e.clientY - startY.current);
    setWidth(newWidth);
    setHeight(newHeight);
  }, []);

  const handleMouseUp = useCallback(() => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseMove]);

  const getContainerPadding = () => {
    const sx: Record<string, string> = {};
    if (resizeRight) {
      sx.paddingRight = '6px';
    }
    if (resizeLeft) {
      sx.paddingLeft = '6px';
    }
    if (resizeTop) {
      sx.paddingTop = '6px';
    }
    if (resizeBottom) {
      sx.paddingBottom = '6px';
    }
    return sx;
  };

  return (
    <Box
      ref={ref}
      className={`flex relative ${containerClassName || ''}`}
      sx={{
        width: fixedWidth ? fixedWidth : `${width}px`,
        height: fixedHeight ? fixedHeight : `${height}px`,
        ...getContainerPadding(),
      }}
    >
      <Box className={`flex-1 ${contentClassName || ''}`}>{children}</Box>
      {resizeRight && (
        <Box
          className="h-full w-1.5 cursor-col-resize absolute top-0 right-0"
          onMouseDown={handleMouseDown}
        >
          <Box className="hover:bg-orange-400 h-full w-0.5 ml-0.5" />
        </Box>
      )}
      {resizeLeft && (
        <Box
          className="h-full w-1.5 cursor-col-resize absolute top-0 left-0"
          onMouseDown={handleMouseDown}
        >
          <Box className="hover:bg-orange-400 h-full w-0.5 mr-0.5" />
        </Box>
      )}
      {resizeTop && (
        <Box
          className="h-1.5 w-full cursor-col-resize absolute top-0 left-0"
          onMouseDown={handleMouseDown}
        >
          <Box className="hover:bg-orange-400 h-0.5 w-full mb-0.5" />
        </Box>
      )}
      {resizeBottom && (
        <Box
          className="h-1.5 w-full cursor-col-resize absolute bottom-0 left-0"
          onMouseDown={handleMouseDown}
        >
          <Box className="hover:bg-orange-400 h-0.5 w-full mt-0.5" />
        </Box>
      )}
    </Box>
  );
};

export default ResizableBox;
