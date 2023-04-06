/// <reference types="vite/client" />
declare module 'jsencrypt/bin/jsencrypt';

interface Math {
    easeInOutQuad: any
}
interface Window {
    webkitRequestAnimationFrame: any,
    mozRequestAnimationFrame: any,
}
interface ParentNode {
    scrollTop: any
}

interface HTMLElement {
    parentNode: any
}



