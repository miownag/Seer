import CodeEditor from '@/components/code-editor';
import { useMainStore } from '@/stores';
import { pick } from 'es-toolkit';

const FileEditor = () => {
  const { selectedFsItem } = useMainStore((state) =>
    pick(state, ['selectedFsItem']),
  );
  return (
    <div className="flex-1 p-2 rounded-lg bg-white flex flex-col min-h-0">
      <div className="h-16">文件夹</div>
      {selectedFsItem ? <CodeEditor /> : <div>未选中文件</div>}
    </div>
  );
};

export default FileEditor;
