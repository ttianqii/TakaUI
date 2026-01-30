# TakaUI DataGrid v0.2.4 - Quick Reference Tables

## 📊 Props Comparison Table

### Core Props

| Prop | Type | Required | Default | v0.2.3 | v0.2.4 | Use Case |
|------|------|----------|---------|---------|---------|----------|
| `columns` | `DataGridColumn<T>[]` | ✅ | - | ✅ | ✅ | Define table columns |
| `data` | `T[]` | ✅ | - | ✅ | ✅ | Data array to display |
| `children` | `ReactNode` | ✅ | - | ✅ | ✅ | DataGridTable, DataGridPagination |
| `getRowId` | `(row) => string` | ❌ | Auto | ✅ | ✅ | Custom row ID function |
| `onRowClick` | `(row) => void` | ❌ | - | ✅ | ✅ | Handle row clicks |

### Pagination Props

| Prop | Type | Required | Default | v0.2.3 | v0.2.4 | Use Case |
|------|------|----------|---------|---------|---------|----------|
| `currentPage` | `number` | ❌ | 1 | ✅ | ✅ | Controlled page (1-indexed) |
| `pageSize` | `number` | ❌ | 10 | ✅ | ✅ | Controlled page size |
| `recordCount` | `number` | ❌ | data.length | ✅ | ✅ | Total records (server-side) |
| `onPaginationChange` | `(state) => void` | ❌ | - | ✅ | ✅ | Pagination change callback |

### NEW in v0.2.4

| Prop | Type | Required | Default | Description | When to Use |
|------|------|----------|---------|-------------|-------------|
| `loading` | `boolean` | ❌ | `false` | Show loading spinner | During data fetch |
| `emptyMessage` | `string` | ❌ | 'No data found' | Custom empty message | User guidance |
| `manualPagination` | `boolean` | ❌ | `false` | Server-side mode | Skip client slicing |

---

## 🎛️ DataGridColumn Properties

| Property | Type | Required | Default | Description | Example |
|----------|------|----------|---------|-------------|---------|
| `id` | `string` | ✅ | - | Unique identifier | `'name'`, `'email'` |
| `accessorKey` | `keyof T` | ❌ | - | Data key to access | `'user.name'` |
| `header` | `string \| ReactNode` | ✅ | - | Column header | `'Full Name'` |
| `cell` | `(row, index) => ReactNode` | ❌ | - | Custom cell renderer | `(row) => <Badge>{row.status}</Badge>` |
| `size` | `number` | ❌ | auto | Column width (px) | `200`, `300` |
| `enableSorting` | `boolean` | ❌ | `false` | Enable sorting | `true` |
| `enableHiding` | `boolean` | ❌ | `false` | Allow hiding | `true` |
| `align` | `'left' \| 'center' \| 'right'` | ❌ | `'left'` | Content alignment | `'center'` |

---

## 🔄 Pagination Modes Comparison

| Feature | Simple Mode | Advanced Mode |
|---------|-------------|---------------|
| **Display** | Previous/Next only | Page numbers + size selector |
| **Page Size Selector** | ❌ No | ✅ Yes |
| **Page Numbers** | ❌ No | ✅ Yes |
| **Mobile Optimized** | ✅ Yes | ✅ Yes |
| **Compact** | ✅ Very | ❌ Larger |
| **User Control** | ⭐ Low | ⭐⭐⭐ High |
| **Best For** | Simple lists | Complex tables |

### Usage

```tsx
// Simple Mode
<DataGridPagination mode="simple" />

// Advanced Mode
<DataGridPagination 
  mode="advanced" 
  pageSizeOptions={[5, 10, 25, 50, 100]} 
/>
```

---

## 🏗️ Implementation Patterns

### Pattern Matrix

| Pattern | Client-Side | Server-Side | Static Data | Dynamic Data | Loading State |
|---------|-------------|-------------|-------------|--------------|---------------|
| **Basic Table** | ✅ | ❌ | ✅ | ❌ | ❌ |
| **Server Pagination** | ❌ | ✅ | ❌ | ✅ | ✅ |
| **Search + Filter** | ✅/❌ | ✅ | ❌ | ✅ | ✅ |
| **Infinite Scroll** | ❌ | ✅ | ❌ | ✅ | ✅ |
| **Export Data** | ✅ | ✅ | ✅ | ✅ | ❌ |

---

## 📋 Props Requirements by Use Case

### Use Case 1: Basic Static Table

| Prop | Required | Example |
|------|----------|---------|
| `columns` | ✅ | `[{id: 'name', ...}]` |
| `data` | ✅ | `users` |
| Others | ❌ | - |

```tsx
<DataGrid columns={columns} data={data}>
  <DataGridTable />
  <DataGridPagination />
</DataGrid>
```

---

### Use Case 2: Server-Side Pagination

| Prop | Required | Example |
|------|----------|---------|
| `columns` | ✅ | `[{id: 'name', ...}]` |
| `data` | ✅ | `users` |
| `loading` | ✅ | `isLoading` |
| `manualPagination` | ✅ | `true` |
| `currentPage` | ✅ | `page` |
| `pageSize` | ✅ | `limit` |
| `recordCount` | ✅ | `total` |
| `onPaginationChange` | ✅ | `handleChange` |
| `emptyMessage` | ⭐ | `'No results'` |

```tsx
<DataGrid
  columns={columns}
  data={data}
  loading={loading}
  manualPagination={true}
  currentPage={page}
  pageSize={limit}
  recordCount={total}
  onPaginationChange={handlePaginationChange}
  emptyMessage="No results found"
>
  <DataGridTable />
  <DataGridPagination mode="advanced" />
</DataGrid>
```

---

### Use Case 3: With Row Selection

| Prop | Required | Example |
|------|----------|---------|
| `columns` | ✅ | `[{id: 'name', ...}]` |
| `data` | ✅ | `users` |
| `getRowId` | ✅ | `(row) => row.id` |
| `onRowClick` | ✅ | `handleRowClick` |

```tsx
<DataGrid
  columns={columns}
  data={data}
  getRowId={(row) => row.id}
  onRowClick={handleRowClick}
>
  <DataGridTable />
  <DataGridPagination />
</DataGrid>
```

---

## 🎨 Column Configuration Examples

### Common Column Patterns

| Pattern | Configuration | Example |
|---------|---------------|---------|
| **Simple Text** | `accessorKey` only | `{id: 'name', accessorKey: 'name', header: 'Name'}` |
| **Custom Render** | Use `cell` function | `{id: 'status', cell: (row) => <Badge>{row.status}</Badge>}` |
| **Fixed Width** | Add `size` prop | `{id: 'id', accessorKey: 'id', header: 'ID', size: 80}` |
| **Centered** | Set `align` | `{id: 'actions', header: 'Actions', align: 'center'}` |
| **No Accessor** | `cell` only | `{id: 'actions', cell: (row) => <Button>Edit</Button>}` |
| **Nested Data** | Use dot notation | `{id: 'user', accessorKey: 'user.name', header: 'User'}` |

---

## 🔢 State Management Patterns

### Pattern Comparison

| Aspect | Uncontrolled | Controlled (Client) | Controlled (Server) |
|--------|--------------|---------------------|---------------------|
| **Page State** | Internal | External | External |
| **Data Source** | Props | Props | API |
| **Pagination Logic** | Component | Component | Server |
| `currentPage` | ❌ Not needed | ✅ Required | ✅ Required |
| `pageSize` | ❌ Not needed | ✅ Required | ✅ Required |
| `onPaginationChange` | ❌ Not needed | ✅ Required | ✅ Required |
| `manualPagination` | ❌ `false` | ❌ `false` | ✅ `true` |
| `loading` | ❌ Not needed | ❌ Optional | ✅ Required |

### Code Examples

**Uncontrolled (Simplest)**
```tsx
const [data] = useState(staticData);
<DataGrid columns={columns} data={data}>
  <DataGridTable />
  <DataGridPagination />
</DataGrid>
```

**Controlled Client-Side**
```tsx
const [data] = useState(allData);
const [page, setPage] = useState(1);
const [limit, setLimit] = useState(10);

<DataGrid
  columns={columns}
  data={data}
  currentPage={page}
  pageSize={limit}
  onPaginationChange={(p) => {
    setPage(p.page);
    setLimit(p.limit);
  }}
>
  <DataGridTable />
  <DataGridPagination />
</DataGrid>
```

**Controlled Server-Side**
```tsx
const [data, setData] = useState([]);
const [loading, setLoading] = useState(false);
const [page, setPage] = useState(1);
const [limit, setLimit] = useState(10);
const [total, setTotal] = useState(0);

useEffect(() => {
  setLoading(true);
  fetchData(page, limit).then(result => {
    setData(result.data);
    setTotal(result.total);
    setLoading(false);
  });
}, [page, limit]);

<DataGrid
  columns={columns}
  data={data}
  loading={loading}
  manualPagination={true}
  currentPage={page}
  pageSize={limit}
  recordCount={total}
  onPaginationChange={(p) => {
    setPage(p.page);
    setLimit(p.limit);
  }}
>
  <DataGridTable />
  <DataGridPagination mode="advanced" />
</DataGrid>
```

---

## ⚡ Performance Optimization

| Optimization | Client-Side | Server-Side | Impact | Complexity |
|--------------|-------------|-------------|--------|------------|
| **Debounce Limit Changes** | ❌ Not needed | ✅ Recommended | High | Low |
| **Memo Columns** | ✅ Yes | ✅ Yes | Medium | Low |
| **Virtual Scrolling** | ✅ For large data | ❌ Not needed | High | High |
| **Lazy Loading** | ❌ Not applicable | ✅ Built-in | High | Low |
| **Cache Results** | ❌ Not needed | ✅ Recommended | High | Medium |

### Debouncing Example

```tsx
const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

const handlePaginationChange = (pagination: PaginationState) => {
  if (debounceTimerRef.current) {
    clearTimeout(debounceTimerRef.current);
  }
  
  // Page changes: immediate
  if (pagination.page !== page) {
    setPage(pagination.page);
  }
  
  // Limit changes: debounced (300ms)
  if (pagination.limit !== limit) {
    debounceTimerRef.current = setTimeout(() => {
      setLimit(pagination.limit);
      setPage(1); // Reset to first page
    }, 300);
  }
};

useEffect(() => {
  return () => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
  };
}, []);
```

---

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution | Prevention |
|-------|-------|----------|------------|
| Empty state during loading | Missing `loading` prop | Add `loading={isLoading}` | Always pass loading state |
| Data sliced twice | Wrong pagination mode | Add `manualPagination={true}` | Use correct mode |
| Wrong page count | Missing `recordCount` | Pass `recordCount={total}` | Always pass total from server |
| Too many API calls | No debouncing | Debounce limit changes | Implement debounce |
| Buttons not disabled | Missing `loading` prop | Add `loading={isLoading}` | Pass loading to DataGrid |
| Page stuck on old data | Stale state | Reset page on filter change | Always reset page |

---

## 📊 Feature Availability Matrix

| Feature | v0.2.3 | v0.2.4 | Notes |
|---------|---------|---------|-------|
| Client-Side Pagination | ✅ | ✅ | Default behavior |
| Server-Side Pagination | ⚠️ Partial | ✅ Full | Use `manualPagination` |
| Loading States | ❌ | ✅ | New `loading` prop |
| Empty State Customization | ❌ | ✅ | New `emptyMessage` prop |
| Loading Spinner | ❌ | ✅ | Built-in component |
| Disabled Controls | ❌ | ✅ | Auto-disabled when loading |
| Custom Cell Rendering | ✅ | ✅ | Via `cell` function |
| Row Click Handling | ✅ | ✅ | Via `onRowClick` |
| Column Alignment | ✅ | ✅ | Via `align` prop |
| Column Sizing | ✅ | ✅ | Via `size` prop |
| Sorting | ✅ | ✅ | Via `enableSorting` |
| Row Selection | ✅ | ✅ | Via context |
| TypeScript Support | ✅ | ✅ | Full type safety |

---

## 🎯 Migration Checklist

### From v0.2.3 to v0.2.4

| Task | Required | Breaking | Benefit |
|------|----------|----------|---------|
| Update package to 0.2.4 | ✅ | ❌ | Bug fixes |
| Add `loading` prop | ⭐ Recommended | ❌ | Better UX |
| Add `manualPagination={true}` | ⭐ For server-side | ❌ | Correct behavior |
| Add `emptyMessage` | ❌ Optional | ❌ | Better messaging |
| Remove custom loading overlay | ⭐ Recommended | ❌ | Cleaner code |
| Test loading states | ✅ | ❌ | Quality assurance |
| Update documentation | ⭐ Recommended | ❌ | Team knowledge |

---

## 📈 Quick Decision Tree

```
Do you need pagination?
├─ NO → Use basic DataGrid without pagination props
└─ YES → Where is the data?
    ├─ CLIENT (all data loaded) → 
    │   └─ Use default settings (manualPagination=false)
    └─ SERVER (API pagination) →
        └─ Use these props:
            ├─ loading={true/false}
            ├─ manualPagination={true}
            ├─ currentPage={page}
            ├─ pageSize={limit}
            ├─ recordCount={total}
            └─ onPaginationChange={handler}
```

---

## 🎓 Learning Path

| Level | Topics | Time | Resources |
|-------|--------|------|-----------|
| **Beginner** | Basic table, columns, data | 15 min | Quick Start section |
| **Intermediate** | Custom cells, row clicks, alignment | 30 min | Examples section |
| **Advanced** | Server pagination, loading, debouncing | 45 min | Server-Side guide |
| **Expert** | Performance, caching, optimization | 60 min | Advanced patterns |

---

## 📞 Quick Help

| Question | Answer |
|----------|--------|
| How do I show loading? | `<DataGrid loading={true} ... />` |
| How do I enable server-side? | `<DataGrid manualPagination={true} ... />` |
| How do I customize empty message? | `<DataGrid emptyMessage="Custom text" ... />` |
| How do I handle page changes? | Use `onPaginationChange` callback |
| How do I debounce limit changes? | Use `setTimeout` in pagination handler |
| How do I disable buttons? | Pass `loading={true}` (auto-disables) |
| How do I get row ID? | Use `getRowId={(row) => row.id}` |
| How do I handle row clicks? | Use `onRowClick={(row) => ...}` |

---

**Version**: 0.2.4  
**Quick Reference Guide**  
**Last Updated**: January 29, 2026
