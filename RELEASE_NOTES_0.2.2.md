# TakaUI v0.2.2 Release Notes

**Release Date:** January 28, 2026

## 🐛 Critical Bug Fixes

### DataGrid Generic Type Support Fixed

Fixed a critical TypeScript type casting issue in the DataGrid component that prevented proper generic type inference.

**Problem:**
- DataGrid context was being cast to non-generic `DataGridContextValue`, causing type mismatches
- Consumers couldn't properly use typed data with `DataGrid<T>`
- Build errors when using custom types with DataGrid columns

**Solution:**
- Fixed context provider casting to preserve generic type information
- Changed from `value as DataGridContextValue` to `value as unknown as DataGridContextValue`
- This allows proper type inference throughout the DataGrid component tree

**Impact:**
- ✅ `DataGrid<T>` now properly infers types for columns, data, and callbacks
- ✅ No more type errors when using custom interfaces with DataGrid
- ✅ Full TypeScript IntelliSense support for row data in cell renderers
- ✅ Type-safe `getRowId` and `onRowClick` callbacks

## Usage Example

Now works correctly:

```tsx
interface Department {
  id: number;
  name: string;
  description: string | null;
}

const columns: DataGridColumn<Department>[] = [
  {
    id: 'name',
    accessorKey: 'name',
    header: 'Department',
    cell: (row) => row.name, // ✅ row is typed as Department
  },
];

<DataGrid<Department>
  columns={columns}
  data={departments}
  getRowId={(row) => String(row.id)} // ✅ row is typed as Department
  onRowClick={(row) => console.log(row.name)} // ✅ row is typed as Department
>
  <DataGridTable />
  <DataGridPagination mode="advanced" />
</DataGrid>
```

## Migration Guide

If you were using type assertions as a workaround:

**Before (v0.2.1 - with workaround):**
```tsx
<DataGrid 
  columns={columns as any}
  data={departments as any}
  getRowId={(row: any) => String(row.id)}
/>
```

**After (v0.2.2 - proper types):**
```tsx
<DataGrid<Department>
  columns={columns}
  data={departments}
  getRowId={(row) => String(row.id)}
/>
```

## Upgrade Instructions

```bash
npm install @ttianqii/takaui@0.2.2
# or
bun install @ttianqii/takaui@0.2.2
```

## Full Changelog

- **Fixed:** DataGrid generic type casting issue (#bugfix)
- **Improved:** TypeScript type inference for DataGrid components
- **Enhanced:** IntelliSense support for custom data types

---

**Package:** `@ttianqii/takaui@0.2.2`  
**Previous Version:** `0.2.1`  
**Type:** Patch (Bug Fix)
