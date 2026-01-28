# DataGrid v0.2.0 - Quick Reference

## 🎯 What Changed?

### Before v0.2.0 (Uncontrolled Only)
```tsx
// Could only use internal state
<DataGrid columns={columns} data={data}>
  <DataGridTable />
  <DataGridPagination />
</DataGrid>

// ❌ No way to control pagination externally
// ❌ No callback for API integration
```

### After v0.2.0 (Controlled + Uncontrolled)
```tsx
// Option 1: Uncontrolled (still works!)
<DataGrid columns={columns} data={data}>
  <DataGridTable />
  <DataGridPagination />
</DataGrid>

// Option 2: Controlled (NEW!)
<DataGrid 
  columns={columns} 
  data={data}
  currentPage={page}
  pageSize={limit}
  recordCount={total}
  onPaginationChange={handleChange}
>
  <DataGridTable />
  <DataGridPagination />
</DataGrid>

// ✅ Full control over pagination
// ✅ Perfect for server-side pagination
```

## 📋 New Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `currentPage` | `number` | No | Current page (1-indexed). Enables controlled mode. |
| `pageSize` | `number` | No | Records per page. Enables controlled mode. |
| `recordCount` | `number` | No | Total records (from server). Used for totalPages calculation. |
| `onPaginationChange` | `(state: PaginationState) => void` | No | Callback when pagination changes. |

## 🔄 PaginationState Interface

```typescript
interface PaginationState {
  page: number;        // Current page (1-indexed) - e.g., 1, 2, 3
  limit: number;       // Page size - e.g., 10, 20, 50
  total: number;       // Total records - e.g., 150
  totalPages: number;  // Total pages - e.g., 15 (if limit=10)
}
```

## 🚀 Quick Start

### 1. Install
```bash
npm install @ttianqii/takaui@0.2.0
```

### 2. Import
```tsx
import { 
  DataGrid, 
  DataGridTable, 
  DataGridPagination,
  type PaginationState 
} from '@ttianqii/takaui';
```

### 3. Use
```tsx
const [pagination, setPagination] = useState<PaginationState>({
  page: 1,
  limit: 10,
  total: 0,
  totalPages: 0
});

<DataGrid
  columns={columns}
  data={data}
  currentPage={pagination.page}
  pageSize={pagination.limit}
  recordCount={pagination.total}
  onPaginationChange={setPagination}
>
  <DataGridTable />
  <DataGridPagination pageSizeOptions={[10, 20, 50]} />
</DataGrid>
```

## 🎨 Usage Patterns

### Pattern 1: Uncontrolled (Default)
**When to use**: Local data, no server-side pagination needed

```tsx
<DataGrid columns={columns} data={localData}>
  <DataGridTable />
  <DataGridPagination />
</DataGrid>
```

### Pattern 2: Controlled with Callback
**When to use**: Server-side pagination, need to call API

```tsx
const [pagination, setPagination] = useState({
  page: 1, limit: 10, total: 0, totalPages: 0
});

useEffect(() => {
  fetchData(pagination.page, pagination.limit);
}, [pagination.page, pagination.limit]);

<DataGrid
  currentPage={pagination.page}
  pageSize={pagination.limit}
  recordCount={pagination.total}
  onPaginationChange={setPagination}
  // ...
/>
```

### Pattern 3: Hybrid Control
**When to use**: Control only page OR only size

```tsx
// Control only page
<DataGrid 
  currentPage={page} 
  onPaginationChange={handleChange}
  // DataGrid manages pageSize internally
/>

// Control only size
<DataGrid 
  pageSize={limit}
  onPaginationChange={handleChange}
  // DataGrid manages currentPage internally
/>
```

## 🔀 Migration Guide

### From Uncontrolled to Controlled

**Step 1: Add state**
```tsx
const [pagination, setPagination] = useState<PaginationState>({
  page: 1,
  limit: 10,
  total: 0,
  totalPages: 0
});
```

**Step 2: Add useEffect for API calls**
```tsx
useEffect(() => {
  fetchData(pagination.page, pagination.limit);
}, [pagination.page, pagination.limit]);
```

**Step 3: Update DataGrid props**
```tsx
<DataGrid
  currentPage={pagination.page}
  pageSize={pagination.limit}
  recordCount={pagination.total}
  onPaginationChange={setPagination}
  // ... other props
/>
```

## 💡 Best Practices

1. **Always set `recordCount` for server-side pagination**
   ```tsx
   recordCount={totalFromServer}  // Not data.length!
   ```

2. **Reset to page 1 when filters change**
   ```tsx
   setPagination(prev => ({ ...prev, page: 1 }));
   ```

3. **Handle page size changes**
   ```tsx
   const handlePaginationChange = (newPagination: PaginationState) => {
     if (newPagination.limit !== pagination.limit) {
       // Page size changed, reset to page 1
       setPagination({ ...newPagination, page: 1 });
     } else {
       setPagination(newPagination);
     }
   };
   ```

4. **Add loading states**
   ```tsx
   const [loading, setLoading] = useState(false);
   
   useEffect(() => {
     setLoading(true);
     fetchData().finally(() => setLoading(false));
   }, [pagination.page, pagination.limit]);
   ```

5. **Debounce search inputs**
   ```tsx
   const debouncedSearch = useDebouncedValue(search, 300);
   
   useEffect(() => {
     fetchData();
   }, [debouncedSearch, pagination.page]);
   ```

## ⚡ Performance Tips

- Use `recordCount` prop instead of passing full dataset
- Fetch only current page data from server
- Implement cursor-based pagination for large datasets
- Consider caching pages in client state
- Use React Query or SWR for data fetching

## 🐛 Troubleshooting

### Page doesn't update
**Issue**: Clicking next/previous doesn't change page  
**Fix**: Make sure you're passing `currentPage` and updating state in `onPaginationChange`

### Wrong total pages
**Issue**: Shows incorrect number of pages  
**Fix**: Set `recordCount` to total records from server, not `data.length`

### Infinite re-renders
**Issue**: Component keeps re-rendering  
**Fix**: Don't create new objects in render. Use `useState` or `useMemo`

### Page resets unexpectedly
**Issue**: Page goes back to 1 when not expected  
**Fix**: Check if you're resetting page in `onPaginationChange` handler

## 📚 Full Documentation

- **Comprehensive Guide**: [DATAGRID_CONTROLLED_PAGINATION.md](./DATAGRID_CONTROLLED_PAGINATION.md)
- **Quick Examples**: [DATAGRID_CONTROLLED_EXAMPLE.md](./DATAGRID_CONTROLLED_EXAMPLE.md)
- **Release Notes**: [RELEASE_NOTES_0.2.0.md](./RELEASE_NOTES_0.2.0.md)
- **Implementation Report**: [IMPLEMENTATION_REPORT_V0.2.0.md](./IMPLEMENTATION_REPORT_V0.2.0.md)

## 🎯 When to Use What?

| Scenario | Component | Mode |
|----------|-----------|------|
| Local data, < 1000 rows | DataTable or DataGrid | Uncontrolled |
| Server-side pagination | DataTable or DataGrid | Controlled |
| Need search callbacks | DataTable | Controlled |
| Need sort callbacks | DataTable | Controlled |
| Complex custom layout | DataGrid | Either |
| Simple table | DataTable | Either |

## 📦 Version Info

- **Package**: `@ttianqii/takaui`
- **Version**: 0.2.0
- **Published**: 2026-01-21
- **Breaking Changes**: None ✅
- **Backward Compatible**: Yes ✅

---

**Quick Install**: `npm install @ttianqii/takaui@0.2.0`
