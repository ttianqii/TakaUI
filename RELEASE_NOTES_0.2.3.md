# TakaUI v0.2.3 Release Notes

**Release Date:** January 28, 2026

## 🚀 Critical Flexibility Fix

### Removed Overly Restrictive Generic Constraint

Fixed a critical issue where the DataGrid component required types to satisfy `Record<string, unknown>` constraint, which forced users to add unnecessary index signatures to their clean interfaces.

## The Problem (v0.2.2)

```tsx
// This caused an error in v0.2.2
interface Department {
  id: number;
  name: string;
  description: string | null;
}

<DataGrid<Department> ... />
// ❌ Error: Type 'Department' does not satisfy constraint 'Record<string, unknown>'
// ❌ Index signature for type 'string' is missing
```

Users were forced to pollute their interfaces:
```tsx
interface Department {
  id: number;
  name: string;
  description: string | null;
  [key: string]: unknown;  // ❌ Required in v0.2.2
}
```

## The Solution (v0.2.3)

**Removed the constraint entirely** - Now DataGrid works like industry-standard libraries:

```tsx
// Clean interface - NO index signature needed! ✅
interface Department {
  id: number;
  name: string;
  description: string | null;
}

<DataGrid<Department>
  columns={columns}
  data={departments}
  getRowId={(row) => String(row.id)}
  onRowClick={(row) => console.log(row.name)}
>
  <DataGridTable />
  <DataGridPagination mode="advanced" />
</DataGrid>
```

## Changes Made

### Before (v0.2.2):
```tsx
// Too restrictive!
export interface DataGridProps<T extends Record<string, unknown>> { ... }
export interface DataGridColumn<T = Record<string, unknown>> { ... }
export function DataGrid<T extends Record<string, unknown>>({ ... }) { ... }
```

### After (v0.2.3):
```tsx
// Flexible like @tanstack/react-table! ✅
export interface DataGridProps<T = any> { ... }
export interface DataGridColumn<T = any> { ... }
export function DataGrid<T>({ ... }) { ... }
```

## Migration Guide

### If You Added Index Signatures as Workaround

You can now **REMOVE** them:

```tsx
// BEFORE (v0.2.2 workaround)
interface Department {
  id: number;
  name: string;
  [key: string]: unknown;  // ❌ Remove this!
}

// AFTER (v0.2.3)
interface Department {
  id: number;
  name: string;
  // ✅ Clean interface - that's it!
}
```

### Update Steps

```bash
# 1. Update TakaUI
npm install @ttianqii/takaui@0.2.3
# or
bun install @ttianqii/takaui@0.2.3

# 2. Remove all [key: string]: unknown from your interfaces

# 3. Rebuild
npm run build
# or
bun run build
```

## Why This Matters

### ✅ Benefits

1. **Type Safety Restored**: No more `[key: string]: unknown` bypassing TypeScript's checks
2. **Clean Code**: Interfaces stay pure and focused
3. **Industry Standard**: Works like @tanstack/react-table, ag-grid, MUI DataGrid
4. **Better DX**: No more wrestling with type constraints
5. **Flexible**: Support ANY data structure

### 📊 Comparison with Other Libraries

All major table libraries use unconstrained generics:

| Library | Generic Constraint |
|---------|-------------------|
| @tanstack/react-table | `<TData,>` (none) ✅ |
| ag-grid-react | No constraint ✅ |
| MUI DataGrid | No constraint ✅ |
| TakaUI v0.2.2 | `extends Record<string, unknown>` ❌ |
| **TakaUI v0.2.3** | **No constraint** ✅ |

## Complete Working Examples

### Example 1: Simple Interface

```tsx
interface User {
  id: number;
  name: string;
  email: string;
}

const columns: DataGridColumn<User>[] = [
  {
    id: 'name',
    accessorKey: 'name',
    header: 'Name',
    cell: (row) => row.name,
  },
  {
    id: 'email',
    accessorKey: 'email',
    header: 'Email',
    cell: (row) => row.email,
  },
];

<DataGrid<User>
  columns={columns}
  data={users}
  getRowId={(row) => String(row.id)}
/>
```

### Example 2: Complex Nested Types

```tsx
interface Department {
  id: number;
  name: string;
  description: string | null;
  users?: Array<{
    id: number;
    name: string;
  }>;
  _count?: {
    users: number;
    courses: number;
  };
}

// Works perfectly without any index signatures! ✅
<DataGrid<Department>
  columns={departmentColumns}
  data={departments}
  currentPage={page}
  pageSize={limit}
  recordCount={total}
  onPaginationChange={handlePaginationChange}
  getRowId={(row) => String(row.id)}
  onRowClick={(row) => navigate(`/departments/${row.id}`)}
>
  <DataGridTable />
  <DataGridPagination mode="advanced" pageSizeOptions={[10, 25, 50]} />
</DataGrid>
```

### Example 3: Type Inference

```tsx
// TypeScript automatically infers the type! ✅
<DataGrid
  columns={[
    { id: 'id', accessorKey: 'id', header: 'ID' },
    { id: 'name', accessorKey: 'name', header: 'Name' },
  ]}
  data={[
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
  ]}
  getRowId={(row) => String(row.id)}  // row type is inferred
>
  <DataGridTable />
</DataGrid>
```

## Technical Details

### What Changed

**Files Modified:**
- `src/components/DataGrid.tsx` - Removed all type constraints
- `package.json` - Version 0.2.2 → 0.2.3
- `CHANGELOG.md` - Added v0.2.3 entry

**Type Changes:**
1. `DataGridProps<T>` - No constraint
2. `DataGridColumn<T = any>` - Default changed to `any`
3. `DataGrid<T>` - No constraint
4. `DataGridContextValue<T = any>` - Default changed to `any`
5. `useDataGrid<T = any>()` - Default changed to `any`

### Generated Type Definitions

The compiled `dist/index.d.ts` now exports:

```typescript
export declare function DataGrid<T>({ ... }: DataGridProps<T>): JSX.Element;

export declare interface DataGridColumn<T = any> {
    id: string;
    accessorKey?: keyof T;
    header: string | React.ReactNode;
    cell?: (row: T, index: number) => React.ReactNode;
    // ...
}

export declare interface DataGridProps<T = any> {
    columns: DataGridColumn<T>[];
    data: T[];
    getRowId?: (row: T) => string;
    onRowClick?: (row: T) => void;
    // ...
}
```

## Full Changelog

- **Fixed:** Removed overly restrictive `extends Record<string, unknown>` constraint
- **Changed:** Default type parameter from `Record<string, unknown>` to `any`
- **Improved:** Now matches flexibility of @tanstack/react-table and other industry leaders
- **Enhanced:** Better TypeScript type inference
- **Removed:** Requirement for index signatures on user interfaces

---

## Upgrade Now! 🎉

```bash
npm install @ttianqii/takaui@0.2.3
```

**Package:** `@ttianqii/takaui@0.2.3`  
**Previous Version:** `0.2.2`  
**Type:** Patch (Bug Fix)  
**Breaking Changes:** None - only removes restrictions  
**Priority:** High - Improves developer experience significantly
