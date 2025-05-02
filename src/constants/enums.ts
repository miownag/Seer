enum CodeLanguage {
  ts = 'typescript',
  tsx = 'typescript-react',
  js = 'javascript',
  jsx = 'typescript-react',
  unknown = 'unknown',
}

enum GitFileStatus {
  new = 'U',
  modified = 'M',
  deleted = 'D',
  none = 'N',
}

export { CodeLanguage, GitFileStatus };
