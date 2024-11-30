declare module 'vite-plugin-favicons-inject' {
  import type { Plugin } from 'vite';
  import type { FaviconOptions } from 'favicons';
  export type VPFIPluginConfig = {
    failGraciously?: boolean;
  };
  export default function vitePluginFaviconsInject(
    source: string,
    config?: FaviconOptions,
    pluginConfig?: VPFIPluginConfig,
  ): Plugin;
}
