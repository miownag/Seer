import { FitAddon } from '@xterm/addon-fit';
import {
  type FC,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { useXTerm } from 'react-xtermjs';
import '@xterm/xterm/css/xterm.css';
import type { ITheme } from '@xterm/xterm';

// biome-ignore lint/complexity/noBannedTypes: <explanation>
const TerminalComp = (_props: {}, ref: React.Ref<{ resize: () => void }>) => {
  const { instance, ref: xtermRef } = useXTerm();
  const fitAddon = new FitAddon();
  const curLine = useRef('');

  useImperativeHandle(ref, () => ({
    resize: () => {
      fitAddon.fit();
    },
  }));

  useEffect(() => {
    if (instance) {
      instance.loadAddon(fitAddon);
      // 处理用户输入
      instance.onData((data) => {
        switch (data) {
          case '\r': // Enter
            console.log('run', curLine.current);
            instance.writeln('');
            curLine.current = '';
            break;
          case '\u007F': // Backspace
            if (instance.buffer.active.cursorX > 2) {
              instance.write('\b \b');
              curLine.current = curLine.current.slice(0, -1);
            }
            break;
          default:
            if (
              (data >= String.fromCharCode(0x20) &&
                data <= String.fromCharCode(0x7e)) ||
              data >= '\u00a0'
            ) {
              instance.write(data);
              curLine.current += data;
            }
        }
      });

      requestAnimationFrame(() => {
        fitAddon.fit();
      });
    }
  }, [instance, fitAddon]);

  // @ts-ignore
  return <div ref={xtermRef} className="w-full h-full" />;
};

export default forwardRef(TerminalComp);
