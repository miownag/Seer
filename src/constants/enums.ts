enum GitFileStatus {
  new = 'U',
  modified = 'M',
  deleted = 'D',
  none = 'N',
}

enum FileType {
  image = 'image',
  typescript = 'typescript',
  javascript = 'javascript',
  json = 'json',
  typescriptReact = 'typescript-react',
  javascriptReact = 'javascript-react',
  css = 'css',
  html = 'html',
  rc = 'rc',
  yaml = 'yaml',
  md = 'md',
  config = 'config',
  folder = 'folder',
  pinned = 'pinned',
}

export { FileType, GitFileStatus };
