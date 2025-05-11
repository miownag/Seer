import { IconButton, Tooltip } from '@mui/material';
import type { FC, ReactElement } from 'react';

interface IProps {
  content: string;
  children: ReactElement;
  className?: string;
  buttonProps?: Parameters<typeof IconButton>[0];
}

const TooltipIconButton: FC<IProps> = ({
  content,
  children,
  className,
  buttonProps,
}) => (
  <Tooltip title={content}>
    <IconButton className={className} {...buttonProps}>
      {children}
    </IconButton>
  </Tooltip>
);

export default TooltipIconButton;
