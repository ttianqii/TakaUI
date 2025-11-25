# TakaUI CLI Install Command

> **Note:** This is a future feature roadmap. The CLI install command is not yet implemented.

## Planned Usage

```bash
npx takaui add data-table
```

This command will:

1. Install required dependencies (`@tanstack/react-table`, `lucide-react`)
2. Copy all DataTable component files to `src/components/ui/`
3. Update your `components/index.ts` with exports
4. Ensure base components are installed (button, table, select)

## Current Manual Installation

For now, manually copy these files from the TakaUI repository:

### Component Files

```text
src/components/ui/
├── data-table.tsx
├── data-table-container.tsx
├── data-table-view.tsx
├── data-table-pagination.tsx
└── data-table-column-header.tsx
```

### Required Base Components

```text
src/components/ui/
├── button.tsx
├── table.tsx
├── select.tsx
└── ... (other base components)
```

### Install Dependencies

```bash
bun add @tanstack/react-table lucide-react
# or
npm install @tanstack/react-table lucide-react
```

## Alternative: Use as NPM Package

Once published to npm:

```bash
npm install @takaui/data-table
# or
bun add @takaui/data-table
```

Then import directly:

```tsx
import {
  DataTable,
  DataTableContainer,
  DataTableView,
  DataTablePagination,
  DataTableColumnHeader,
} from '@takaui/data-table'
```

## Roadmap

- [ ] Create CLI tool similar to `shadcn`
- [ ] Publish to npm registry
- [ ] Add component registry
- [ ] Auto-detect and install dependencies
- [ ] Support multiple package managers (npm, bun, pnpm, yarn)
- [ ] Template generation
- [ ] TypeScript config validation

## Inspiration

This installation approach is inspired by:

- [shadcn/ui](https://ui.shadcn.com/) - Component CLI
- [Radix UI](https://www.radix-ui.com/) - Primitives approach
- [Tailwind UI](https://tailwindui.com/) - Copy-paste components

---

For full documentation, see [DATATABLE_INSTALL.md](./DATATABLE_INSTALL.md)
