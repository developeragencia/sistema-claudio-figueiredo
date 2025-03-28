/// <reference types="vite/client" />

declare module 'rollup-plugin-visualizer' {
  export function visualizer(options?: {
    filename?: string;
    gzipSize?: boolean;
    brotliSize?: boolean;
  }): any;
}

declare module 'vite-bundle-analyzer' {
  export const ViteBundleAnalyzer: any;
}

declare module 'vite-plugin-circular-dependency' {
  export default function circularDependency(options?: {
    exclude?: RegExp;
    failOnError?: boolean;
  }): any;
}

declare module 'vite-plugin-compression' {
  export default function compression(): any;
}

declare module 'vite-plugin-inspect' {
  export default function inspect(options?: {
    build?: boolean;
    outputDir?: string;
  }): any;
}

declare module 'vite-plugin-node-polyfills' {
  export function nodePolyfills(): any;
}

declare module 'vite-plugin-pwa' {
  export const VitePWA: any;
}

declare module 'vite-plugin-radar' {
  export default function radar(options?: {
    analytics?: {
      id?: string;
    };
  }): any;
}

declare module 'vite-plugin-remove-console' {
  export default function removeConsole(): any;
}

declare module 'vite-plugin-webfont-dl' {
  export default function webfontDownload(): any;
} 