import { Badge, Box, Tooltip } from '@mui/material';
import type { FC } from 'react';

interface IProps {
  icon: JSX.Element;
  tooltip?: string;
  onClick: () => void;
  badgeInfo?: {
    content: string;
    color:
      | 'default'
      | 'primary'
      | 'secondary'
      | 'error'
      | 'info'
      | 'success'
      | 'warning';
    position: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
  };
  clicked?: boolean;
}

const BarItem: FC<IProps> = ({
  icon,
  tooltip,
  onClick,
  badgeInfo,
  clicked,
}) => {
  let element = (
    <Box
      component="button"
      className={`w-10 h-10 hover:bg-gray-200 flex justify-center items-center cursor-pointer rounded-md ${clicked ? 'bg-gray-200' : ''}`}
      onClick={onClick}
    >
      {icon}
    </Box>
  );
  if (tooltip) {
    element = (
      <Tooltip title={tooltip} placement="right-start">
        {element}
      </Tooltip>
    );
  }
  if (badgeInfo) {
    element = (
      <Badge
        badgeContent={badgeInfo.content}
        color={badgeInfo.color}
        anchorOrigin={{
          vertical:
            badgeInfo.position === 'topLeft' ||
            badgeInfo.position === 'bottomLeft'
              ? 'top'
              : 'bottom',
          horizontal:
            badgeInfo.position === 'topLeft' ||
            badgeInfo.position === 'topRight'
              ? 'left'
              : 'right',
        }}
      >
        {element}
      </Badge>
    );
  }
  return element;
};

export default BarItem;
