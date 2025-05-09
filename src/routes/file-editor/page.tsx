import CodeEditor from '@/components/code-editor';

const FileEditor = () => {
  return (
    <div className="flex-1 p-2 rounded-lg bg-white flex flex-col min-h-0">
      <div className="h-16">文件夹</div>
      <CodeEditor />
    </div>
  );
};

export default FileEditor;
