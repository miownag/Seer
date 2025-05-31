import { FILE_TYPE_ICON_MAP } from '@/constants';
import { useMainStore } from '@/stores';
import type { IFile } from '@/stores/types';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import type { TransitionProps } from '@mui/material/transitions';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import {
  TreeItemCheckbox,
  TreeItemIconContainer,
  TreeItemLabel,
} from '@mui/x-tree-view/TreeItem';
import { TreeItemDragAndDropOverlay } from '@mui/x-tree-view/TreeItemDragAndDropOverlay';
import { TreeItemIcon } from '@mui/x-tree-view/TreeItemIcon';
import { TreeItemProvider } from '@mui/x-tree-view/TreeItemProvider';
import { useTreeItemModel } from '@mui/x-tree-view/hooks';
import type {
  TreeViewPublicAPI,
  UseTreeViewExpansionSignature,
  UseTreeViewFocusSignature,
  UseTreeViewItemsSignature,
  UseTreeViewKeyboardNavigationSignature,
  UseTreeViewLabelSignature,
  UseTreeViewSelectionSignature,
} from '@mui/x-tree-view/internals';
import {
  type UseTreeItemParameters,
  useTreeItem,
} from '@mui/x-tree-view/useTreeItem';
import { animated, useSpring } from '@react-spring/web';
import { pick } from 'es-toolkit';
import React, { type RefObject } from 'react';

declare module 'react' {
  interface CSSProperties {
    '--tree-view-color'?: string;
    '--tree-view-bg-color'?: string;
  }
}
interface CustomLabelProps {
  children: React.ReactNode;
  icon?: React.ElementType;
  expandable?: boolean;
}

interface CustomTreeItemProps
  extends Omit<UseTreeItemParameters, 'rootRef'>,
    Omit<React.HTMLAttributes<HTMLLIElement>, 'onFocus'> {}

const TreeItemRoot = styled('li')(({ theme }) => ({
  listStyle: 'none',
  margin: 0,
  padding: 0,
  outline: 0,
  color: theme.palette.grey[400],
  ...theme.applyStyles('light', {
    color: theme.palette.grey[800],
  }),
}));

const TreeItemContent = styled('div')(({ theme }) => ({
  padding: theme.spacing(0.5),
  paddingRight: theme.spacing(1),
  paddingLeft: `calc(${theme.spacing(1)} + var(--TreeView-itemChildrenIndentation) * var(--TreeView-itemDepth))`,
  width: '100%',
  boxSizing: 'border-box', // prevent width + padding to overflow
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  cursor: 'pointer',
  WebkitTapHighlightColor: 'transparent',
  flexDirection: 'row-reverse',
  borderRadius: theme.spacing(0.7),
  marginBottom: theme.spacing(0.5),
  marginTop: theme.spacing(0.5),
  fontWeight: 500,
  '&[data-expanded]:not([data-focused], [data-selected]) .labelIcon': {
    '&::before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      left: '16px',
      top: '44px',
      height: 'calc(100% - 48px)',
      width: '1.5px',
      backgroundColor: '#f1f5f9',
      ...theme.applyStyles('light', {
        backgroundColor: theme.palette.grey[300],
      }),
    },
  },
  '&[data-focused], &[data-selected]': {
    backgroundColor: '#f1f5f9',
  },
  '&:not([data-focused], [data-selected]):hover': {
    backgroundColor: 'rgba(241, 245, 249, 0.6)',
  },
}));

const CustomCollapse = styled(Collapse)({
  padding: 0,
});

const AnimatedCollapse = animated(CustomCollapse);

const TransitionComponent = (props: TransitionProps) => {
  const style = useSpring({
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(0, ${props.in ? 0 : 20}px, 0)`,
    },
  });

  return <AnimatedCollapse style={style} {...props} />;
};

const TreeItemLabelText = styled(Typography)({
  color: 'inherit',
  fontFamily: 'General Sans',
  fontWeight: 500,
});

const CustomLabel = ({
  icon: Icon,
  expandable,
  children,
  ...other
}: CustomLabelProps) => (
  <TreeItemLabel
    {...other}
    sx={{
      display: 'flex',
      alignItems: 'center',
    }}
  >
    {Icon && (
      <Box
        component={Icon}
        className="labelIcon"
        color="inherit"
        sx={{
          mr: 1,
          fontSize: '1.2rem',
          width: '1.2rem', // 添加宽度控制
          height: '1.2rem', // 添加高度控制
        }}
      />
    )}

    <TreeItemLabelText variant="body2">{children}</TreeItemLabelText>
    {expandable && (
      <Box
        sx={{
          width: 6,
          height: 6,
          borderRadius: '70%',
          bgcolor: 'warning.main',
          display: 'inline-block',
          verticalAlign: 'middle',
          zIndex: 1,
          mx: 1,
        }}
      />
    )}
  </TreeItemLabel>
);

const CustomTreeItem = React.forwardRef(
  (props: CustomTreeItemProps, ref: React.Ref<HTMLLIElement>) => {
    const { id, itemId, label, disabled, children, ...other } = props;

    const {
      getContextProviderProps,
      getRootProps,
      getContentProps,
      getIconContainerProps,
      getCheckboxProps,
      getLabelProps,
      getGroupTransitionProps,
      getDragAndDropOverlayProps,
      getLabelInputProps,
      status,
    } = useTreeItem({ id, itemId, children, label, disabled, rootRef: ref });

    const item = useTreeItemModel<IFile>(itemId);

    let icon: typeof FolderOpenIcon;
    if (status.expanded) {
      icon = FolderOpenIcon;
    } else if (item?.fileType) {
      icon = FILE_TYPE_ICON_MAP[item.fileType] ?? '';
    } else {
      icon = DescriptionRoundedIcon;
    }

    return (
      <TreeItemProvider {...getContextProviderProps()}>
        <TreeItemRoot {...getRootProps(other)}>
          <TreeItemContent {...getContentProps()}>
            <TreeItemIconContainer {...getIconContainerProps()}>
              <TreeItemIcon status={status} />
            </TreeItemIconContainer>
            <TreeItemCheckbox {...getCheckboxProps()} />
            {status.editing ? (
              <input
                {...getLabelInputProps()}
                className="border-none bg-transparent outline-none w-full"
              />
            ) : (
              <CustomLabel
                {...getLabelProps({
                  icon,
                  expandable: status.expandable && status.expanded,
                })}
              />
            )}
            <TreeItemDragAndDropOverlay {...getDragAndDropOverlayProps()} />
          </TreeItemContent>
          {children && <TransitionComponent {...getGroupTransitionProps()} />}
        </TreeItemRoot>
      </TreeItemProvider>
    );
  },
);

const FileTree = ({
  apiRef,
}: {
  apiRef: RefObject<
    | TreeViewPublicAPI<
        readonly [
          UseTreeViewItemsSignature,
          UseTreeViewExpansionSignature,
          UseTreeViewSelectionSignature,
          UseTreeViewFocusSignature,
          UseTreeViewKeyboardNavigationSignature,
          UseTreeViewLabelSignature,
        ]
      >
    | undefined
  >;
}) => {
  const { fileTree, selectFsItem, selectedFsItem, renameFsItem } = useMainStore(
    (state) =>
      pick(state, [
        'fileTree',
        'selectFsItem',
        'selectedFsItem',
        'renameFsItem',
      ]),
  );

  return (
    <RichTreeView
      items={fileTree}
      sx={{
        height: 'fit-content',
        flexGrow: 1,
        maxWidth: 400,
      }}
      slots={{
        item: CustomTreeItem,
      }}
      apiRef={apiRef}
      isItemEditable={true}
      onItemLabelChange={renameFsItem}
      itemChildrenIndentation={24}
      selectedItems={selectedFsItem}
      onSelectedItemsChange={(_, id) => {
        id && selectFsItem(id);
      }}
    />
  );
};

export default FileTree;
