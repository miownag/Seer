import { IconButton, Tooltip } from '@mui/material';
import type { FC, ReactElement } from 'react';

interface IProps {
  content: string;
  children: ReactElement;
  className?: string;
}

const TooltipIconButton: FC<IProps> = ({ content, children, className }) => (
  <Tooltip title={content}>
    <IconButton className={className}>{children}</IconButton>
  </Tooltip>
);

export default TooltipIconButton;
