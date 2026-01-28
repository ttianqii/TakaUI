# TakaUI v0.2.0 Release Notes

## 🎉 DataGrid Controlled Pagination

We're excited to announce **v0.2.0** with full controlled pagination support for DataGrid! This brings DataGrid to feature parity with DataTable for server-side pagination scenarios.

## ✨ What's New

### Controlled Pagination Props

DataGrid now supports three new optional props for external state control:

```typescript
<DataGrid 
  currentPage={page}              // Control current page (1-indexed)
  pageSize={limit}                // Control page size
  onPaginationChange={setState}   // Get notified of changes
  recordCount={totalRecords}      // Total records from server
  // ... other props
>
  <DataGridTable />
  <DataGridPagination pageSizeOptions={[10, 20, 50]} />
</DataGrid>
```

### PaginationState Interface

New exported interface for type-safe pagination state:

```typescript
interface PaginationState {
  page: number;        // Current page (1-indexed)
  limit: number;       // Page size
  total: number;       // Total records
  totalPages: number;  // Total pages
}
```

## 🚀 Key Features

### 1. Backward Compatible

Existing code works without changes:

```tsx
// Still works! (uncontrolled mode)
<DataGrid columns={columns} data={data}>
  <DataGridTable />
  <DataGridPagination />
</DataGrid>
```

### 2. Server-Side Pagination

Perfect for API integration:

```tsx
const [pagination, setPagination] = useState({
  page: 1,
  limit: 10,
  total: 0,
  totalPages: 0
});

useEffect(() => {
  fetch(`/api/data?page=${pagination.page}&limit=${pagination.limit}`)
    .then(res => res.json())
    .then(data => {
      setData(data.records);
      setPagination(prev => ({
        ...prev,
        total: data.total,
        totalPages: data.totalPages
      }));
    });
}, [pagination.page, pagination.limit]);

<DataGrid 
  data={data}
  currentPage={pagination.page}
  pageSize={pagination.limit}
  recordCount={pagination.total}
  onPaginationChange={setPagination}
>
  <DataGridTable />
  <DataGridPagination />
</DataGrid>
```

### 3. Flexible Control

Control both page and size, or just one:

```tsx
// Control only page
<DataGrid currentPage={page} onPaginationChange={handleChange}>

// Control only size
<DataGrid pageSize={size} onPaginationChange={handleChange}>

// Control both
<DataGrid currentPage={page} pageSize={size} onPaginationChange={handleChange}>
```

## 📚 Documentation

New comprehensive guide: [DATAGRID_CONTROLLED_PAGINATION.md](./DATAGRID_CONTROLLED_PAGINATION.md)

Includes:
- ✅ Controlled vs Uncontrolled modes
- ✅ Server-side pagination examples
- ✅ Express + Prisma backend examples
- ✅ TypeScript usage patterns
- ✅ Migration guide
- ✅ Best practices
- ✅ Troubleshooting

## 🔄 Migration Guide

### From v0.1.x to v0.2.0

**No breaking changes!** Your existing DataGrid code will continue to work.

To add server-side pagination:

```tsx
// Before (v0.1.x - uncontrolled)
<DataGrid columns={columns} data={data}>
  <DataGridTable />
  <DataGridPagination />
</DataGrid>

// After (v0.2.0 - controlled)
const [pagination, setPagination] = useState({ 
  page: 1, limit: 10, total: 0, totalPages: 0 
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
  <DataGridPagination />
</DataGrid>
```

## 🎯 Use Cases

Perfect for:
- ✅ Large datasets (thousands of records)
- ✅ API-driven tables
- ✅ Database pagination (Prisma, TypeORM, etc.)
- ✅ Real-time data updates
- ✅ Complex filtering and sorting

## 📊 Comparison: DataTable vs DataGrid

Both now support controlled pagination!

| Feature | DataTable | DataGrid |
|---------|-----------|----------|
| Controlled Pagination | ✅ | ✅ (NEW!) |
| Built-in Search Callback | ✅ | ❌ |
| Built-in Sort Callback | ✅ | ❌ |
| Modular Components | ❌ | ✅ |
| Composition Pattern | ❌ | ✅ |
| Customization | Medium | High |

**Choose DataTable when:**
- Need all-in-one solution
- Want built-in search/sort callbacks
- Prefer simpler API

**Choose DataGrid when:**
- Need maximum flexibility
- Want composition pattern
- Building custom layouts
- Need fine-grained control

## 🛠️ Technical Details

### How It Works

DataGrid now supports both controlled and uncontrolled modes:

```typescript
// Internal state (uncontrolled)
const [internalPage, setInternalPage] = useState(0);
const [internalPageSize, setInternalPageSize] = useState(5);

// Use external if provided, otherwise internal
const pageIndex = externalPage !== undefined 
  ? externalPage - 1  // Convert 1-indexed to 0-indexed
  : internalPage;

const pageSize = externalPageSize ?? internalPageSize;
```

When pagination changes, `onPaginationChange` is called with:
```typescript
{
  page: 2,           // 1-indexed
  limit: 20,
  total: 150,
  totalPages: 8
}
```

### State Management

- **Uncontrolled**: DataGrid manages state internally (default)
- **Controlled**: Parent component manages state
- **Hybrid**: Control one aspect (page or size), DataGrid manages the other

## 🔧 Installation

```bash
npm install @ttianqii/takaui@0.2.0
```

## 📝 Complete Example

```tsx
import { useState, useEffect } from 'react';
import { 
  DataGrid, 
  DataGridTable, 
  DataGridPagination,
  type DataGridColumn,
  type PaginationState 
} from '@ttianqii/takaui';

interface Course {
  id: string;
  name: string;
  code: string;
}

function CourseTable() {
  const [data, setData] = useState<Course[]>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });

  useEffect(() => {
    fetchCourses();
  }, [pagination.page, pagination.limit]);

  const fetchCourses = async () => {
    const res = await fetch(
      `/api/courses?page=${pagination.page}&limit=${pagination.limit}`
    );
    const result = await res.json();
    
    setData(result.data);
    setPagination(prev => ({
      ...prev,
      total: result.total,
      totalPages: result.totalPages
    }));
  };

  const columns: DataGridColumn<Course>[] = [
    { id: 'code', header: 'Code', accessorKey: 'code' },
    { id: 'name', header: 'Name', accessorKey: 'name' },
  ];

  return (
    <DataGrid<Course>
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
  );
}
```

## 🎊 What's Next?

Stay tuned for upcoming features:
- TanStack Table-compatible cell context API
- Advanced filtering hooks
- Export functionality
- Virtual scrolling for massive datasets

## 🙏 Feedback

We'd love to hear your feedback! Please:
- Report issues on GitHub
- Suggest features
- Share your use cases

---

**Full Changelog**: [CHANGELOG.md](./CHANGELOG.md)
**Documentation**: [DATAGRID_CONTROLLED_PAGINATION.md](./DATAGRID_CONTROLLED_PAGINATION.md)
