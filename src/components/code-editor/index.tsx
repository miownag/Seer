import { Box } from '@mui/material';
import * as monaco from 'monaco-editor';
import type React from 'react';
import { type FC, useEffect, useRef } from 'react';

window.MonacoEnvironment = {
  getWorkerUrl: (_moduleId, label) => {
    if (label === 'json') {
      return './json.worker.bundle.js';
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return './css.worker.bundle.js';
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return './html.worker.bundle.js';
    }
    if (label === 'typescript' || label === 'javascript') {
      return './ts.worker.bundle.js';
    }
    return './editor.worker.bundle.js';
  },
};

const CodeEditor: FC = () => {
  const divEl = useRef<HTMLDivElement>(null);
  let editor: monaco.editor.IStandaloneCodeEditor;

  // TODO: 从props或状态管理库中获取文件内容
  const fileContent = 'function x() {\n\tconsole.log("Hello world!");\n}';
  // TODO:
  const fileLanguage = 'typescript';

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (divEl.current) {
      // TODO: create时写死了宽度
      editor = monaco.editor.create(divEl.current, {
        value: fileContent,
        language: fileLanguage,
        automaticLayout: true,
      });
    }
    return () => {
      editor.dispose();
    };
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    editor?.setValue?.(fileContent);
  }, [fileContent]);

  // 文件类型改变时，修改语言
  //   useEffect(() => {
  //     editor?.updateOptions?.({
  //       language: fileLanguage,
  //     });
  //   }, [fileLanguage]);

  return <Box className="flex-1 h-full" ref={divEl} />;
};

export default CodeEditor;
