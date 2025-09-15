// import { WebContainer } from '@webcontainer/api';

// class WebContainerManager {
//   webcontainer?: WebContainer;
//   fileWatchers = new Map();

//   init = async () => {
//     if (!this.webcontainer) {
//       const webcontainer = await WebContainer.boot();
//       this.webcontainer = webcontainer;
//       this.watchDirectory('/');
//     }
//   };

//   watchDirectory = (path: string) => {
//     if (this.fileWatchers.has(path)) return;

//     const watcher = this.webcontainer?.fs.watch(path, (eventType, filename) => {
//       // 事件类型：'rename'（创建/删除）、'change'（内容修改）
//       syncFileSystemToZustand(); // 触发状态同步
//     });

//     this.fileWatchers.set(path, watcher);

//     // 递归监听子目录
//     this.webcontainer?.fs
//       .readdir(path, { withFileTypes: true })
//       .then((entries) => {
//         // biome-ignore lint/complexity/noForEach: <explanation>
//         entries.forEach((entry) => {
//           if (entry.isDirectory()) {
//             this.watchDirectory(`${path}/${entry.name}`);
//           }
//         });
//       });
//   };
// }

// export default WebContainerManager;
