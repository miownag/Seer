import { useMainStore } from '@/stores';
import Editor from '@monaco-editor/react';
import { useDebounceFn } from 'ahooks';
import { pick } from 'es-toolkit';
import type { Position, editor } from 'monaco-editor';
import { type FC, useEffect, useRef } from 'react';

const CodeEditor: FC = () => {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const { selectedFsItem, editFileContent, fileContentMap, getFileType } =
    useMainStore((state) =>
      pick(state, [
        'selectedFsItem',
        'editFileContent',
        'fileContentMap',
        'getFileType',
      ]),
    );
  const fileType = getFileType(selectedFsItem);
  const cursorPositionRef = useRef<Position | null>(null);
  const { run: onSave } = useDebounceFn(
    (value: string) => {
      cursorPositionRef.current = editorRef.current?.getPosition() || null;
      editFileContent?.(selectedFsItem ?? '', value);
    },
    { wait: 0 },
  );

  useEffect(() => {
    if (selectedFsItem) {
      editorRef.current?.setValue(fileContentMap.get(selectedFsItem) ?? '-');
      if (cursorPositionRef.current) {
        editorRef.current?.setPosition(cursorPositionRef.current);
      }
    }
  }, [selectedFsItem, fileContentMap]);

  return (
    <Editor
      defaultValue=""
      onMount={(editor) => {
        editorRef.current = editor;
      }}
      language={fileType}
      onChange={onSave}
    />
  );
};

export default CodeEditor;
