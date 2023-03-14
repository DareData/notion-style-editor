// vite.config.ts
import path from "node:path";
import react from "file:///Users/knofz/Documents/milkdown-datedata/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { defineConfig } from "file:///Users/knofz/Documents/milkdown-datedata/node_modules/vite/dist/node/index.js";
import dts from "file:///Users/knofz/Documents/milkdown-datedata/node_modules/vite-plugin-dts/dist/index.mjs";
import svgr from "file:///Users/knofz/Documents/milkdown-datedata/node_modules/vite-plugin-svgr/dist/index.mjs";
var __vite_injected_original_dirname = "/Users/knofz/Documents/milkdown-datedata";
var vite_config_default = defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          [
            "babel-plugin-styled-components",
            {
              ssr: false,
              pure: true,
              displayName: true,
              fileName: false
            }
          ]
        ]
      }
    }),
    dts({
      insertTypesEntry: true
    }),
    svgr()
  ],
  build: {
    lib: {
      entry: path.resolve(__vite_injected_original_dirname, "src/lib/index.tsx"),
      name: "MyLib",
      formats: ["es", "umd"],
      fileName: (format) => `milkdown-datedata.${format}.js`
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM"
        }
      }
    }
  },
  server: {
    open: "src/index.html"
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMva25vZnovRG9jdW1lbnRzL21pbGtkb3duLWRhdGVkYXRhXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMva25vZnovRG9jdW1lbnRzL21pbGtkb3duLWRhdGVkYXRhL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9rbm9mei9Eb2N1bWVudHMvbWlsa2Rvd24tZGF0ZWRhdGEvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcGF0aCBmcm9tICdub2RlOnBhdGgnO1xuXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgZHRzIGZyb20gJ3ZpdGUtcGx1Z2luLWR0cyc7XG5pbXBvcnQgc3ZnciBmcm9tICd2aXRlLXBsdWdpbi1zdmdyJztcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KHtcbiAgICAgIGJhYmVsOiB7XG4gICAgICAgIHBsdWdpbnM6IFtcbiAgICAgICAgICBbXG4gICAgICAgICAgICAnYmFiZWwtcGx1Z2luLXN0eWxlZC1jb21wb25lbnRzJyxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc3NyOiBmYWxzZSxcbiAgICAgICAgICAgICAgcHVyZTogdHJ1ZSxcbiAgICAgICAgICAgICAgZGlzcGxheU5hbWU6IHRydWUsXG4gICAgICAgICAgICAgIGZpbGVOYW1lOiBmYWxzZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgfSksXG4gICAgZHRzKHtcbiAgICAgIGluc2VydFR5cGVzRW50cnk6IHRydWUsXG4gICAgfSksXG4gICAgc3ZncigpLFxuICBdLFxuICBidWlsZDoge1xuICAgIGxpYjoge1xuICAgICAgZW50cnk6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvbGliL2luZGV4LnRzeCcpLFxuICAgICAgbmFtZTogJ015TGliJyxcbiAgICAgIGZvcm1hdHM6IFsnZXMnLCAndW1kJ10sXG4gICAgICBmaWxlTmFtZTogZm9ybWF0ID0+IGBtaWxrZG93bi1kYXRlZGF0YS4ke2Zvcm1hdH0uanNgLFxuICAgIH0sXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgZXh0ZXJuYWw6IFsncmVhY3QnLCAncmVhY3QtZG9tJ10sXG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgZ2xvYmFsczoge1xuICAgICAgICAgIHJlYWN0OiAnUmVhY3QnLFxuICAgICAgICAgICdyZWFjdC1kb20nOiAnUmVhY3RET00nLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICBzZXJ2ZXI6IHtcbiAgICBvcGVuOiAnc3JjL2luZGV4Lmh0bWwnLFxuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTBTLE9BQU8sVUFBVTtBQUUzVCxPQUFPLFdBQVc7QUFDbEIsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sVUFBVTtBQUxqQixJQUFNLG1DQUFtQztBQU96QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsTUFDSixPQUFPO0FBQUEsUUFDTCxTQUFTO0FBQUEsVUFDUDtBQUFBLFlBQ0U7QUFBQSxZQUNBO0FBQUEsY0FDRSxLQUFLO0FBQUEsY0FDTCxNQUFNO0FBQUEsY0FDTixhQUFhO0FBQUEsY0FDYixVQUFVO0FBQUEsWUFDWjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0YsQ0FBQztBQUFBLElBQ0QsSUFBSTtBQUFBLE1BQ0Ysa0JBQWtCO0FBQUEsSUFDcEIsQ0FBQztBQUFBLElBQ0QsS0FBSztBQUFBLEVBQ1A7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLEtBQUs7QUFBQSxNQUNILE9BQU8sS0FBSyxRQUFRLGtDQUFXLG1CQUFtQjtBQUFBLE1BQ2xELE1BQU07QUFBQSxNQUNOLFNBQVMsQ0FBQyxNQUFNLEtBQUs7QUFBQSxNQUNyQixVQUFVLFlBQVUscUJBQXFCO0FBQUEsSUFDM0M7QUFBQSxJQUNBLGVBQWU7QUFBQSxNQUNiLFVBQVUsQ0FBQyxTQUFTLFdBQVc7QUFBQSxNQUMvQixRQUFRO0FBQUEsUUFDTixTQUFTO0FBQUEsVUFDUCxPQUFPO0FBQUEsVUFDUCxhQUFhO0FBQUEsUUFDZjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
