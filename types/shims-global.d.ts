// 声明全局的 window ，不然使用 window.XX 时会报错
declare var window: Window & typeof globalThis;
declare var document: Document;
