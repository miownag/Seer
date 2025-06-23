import ConfigIcon from '@/assets/imgs/config-icon.svg';
import CssIcon from '@/assets/imgs/css-icon.svg';
import HtmlIcon from '@/assets/imgs/html-icon.svg';
import JavascriptIcon from '@/assets/imgs/javascript-icon.svg';
import JsonIcon from '@/assets/imgs/json-icon.svg';
import JavascriptReactIcon from '@/assets/imgs/jsx-icon.svg';
import MdIcon from '@/assets/imgs/markdown-icon.svg';
import TypescriptReactIcon from '@/assets/imgs/tsx-icon.svg';
import TypescriptIcon from '@/assets/imgs/typescript-icon.svg';
import YamlIcon from '@/assets/imgs/yaml-icon.svg';
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';
import ImageIcon from '@mui/icons-material/Image';
import { FileType } from './enums';

const FILE_TYPE_ICON_MAP = {
  [FileType.image]: ImageIcon,
  [FileType.typescript]: TypescriptIcon,
  [FileType.javascript]: JavascriptIcon,
  [FileType.json]: JsonIcon,
  [FileType.typescriptReact]: TypescriptReactIcon,
  [FileType.javascriptReact]: JavascriptReactIcon,
  [FileType.css]: CssIcon,
  [FileType.html]: HtmlIcon,
  [FileType.rc]: ConfigIcon,
  [FileType.yaml]: YamlIcon,
  [FileType.md]: MdIcon,
  [FileType.config]: ConfigIcon,
  [FileType.folder]: FolderRoundedIcon,
  [FileType.pinned]: FolderRoundedIcon,
};

const FILE_TYPE_SUFFIX_MAP = {
  png: FileType.image,
  ts: FileType.typescript,
  js: FileType.javascript,
  json: FileType.json,
  tsx: FileType.typescriptReact,
  jsx: FileType.javascriptReact,
  css: FileType.css,
  html: FileType.html,
  rc: FileType.rc,
  yaml: FileType.yaml,
  md: FileType.md,
  config: FileType.config,
  folder: FileType.folder,
  pinned: FileType.pinned,
};

export { FILE_TYPE_ICON_MAP, FILE_TYPE_SUFFIX_MAP };
