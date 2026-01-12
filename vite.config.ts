import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['src/components/**/*', 'src/lib/**/*', 'src/utils/**/*', 'src/index.ts'],
      exclude: ['src/main.tsx', 'src/App.tsx', 'src/pages/**/*', 'src/cli/**/*', 'src/**/*.test.tsx', 'src/**/*.test.ts'],
      rollupTypes: true,
      tsconfigPath: './tsconfig.app.json'
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'TakaUI',
      fileName: (format) => `takaui.${format === 'es' ? 'js' : 'cjs'}`,
      formats: ['es', 'cjs']
    },
    copyPublicDir: false,
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        '@radix-ui/react-checkbox',
        '@radix-ui/react-dialog',
        '@radix-ui/react-dropdown-menu',
        '@radix-ui/react-label',
        '@radix-ui/react-popover',
        '@radix-ui/react-select',
        '@radix-ui/react-slot',
        'class-variance-authority',
        'clsx',
        'date-fns',
        'date-holidays',
        'lucide-react',
        'react-day-picker',
        'tailwind-merge',
        '@tanstack/react-table'
      ],
      output: {
        preserveModules: false,
        exports: 'named',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime'
        }
      }
    },
    sourcemap: true,
    emptyOutDir: true
  }
})
