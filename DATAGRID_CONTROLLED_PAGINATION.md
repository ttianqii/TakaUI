# DataGrid Controlled Pagination

DataGrid now supports **controlled pagination** for server-side data management, similar to DataTable's pagination features.

## Features

- **Controlled Mode**: External state management for server-side pagination
- **Uncontrolled Mode**: Internal state management (default behavior)
- **Backward Compatible**: Existing code continues to work
- **Type-Safe**: Full TypeScript support with `PaginationState` interface

## PaginationState Interface

```typescript
interface PaginationState {
  page: number;        // Current page number (1-indexed)
  limit: number;       // Current page size
  total: number;       // Total number of records
  totalPages: number;  // Total number of pages
}
```

## Props

### New Props for Controlled Pagination

| Prop | Type | Description |
|------|------|-------------|
| `currentPage` | `number` (optional) | Current page number (1-indexed). When provided, DataGrid operates in controlled mode. |
| `pageSize` | `number` (optional) | Number of records per page. When provided, page size is controlled externally. |
| `onPaginationChange` | `(pagination: PaginationState) => void` (optional) | Callback fired when pagination changes (page or size). |

### Existing Props

| Prop | Type | Description |
|------|------|-------------|
| `columns` | `DataGridColumn<T>[]` | Column definitions |
| `data` | `T[]` | Data array |
| `recordCount` | `number` (optional) | Total record count (for server-side pagination) |
| `getRowId` | `(row: T) => string` (optional) | Row ID extractor |
| `onRowClick` | `(row: T) => void` (optional) | Row click handler |

## Usage Examples

### 1. Uncontrolled Mode (Default)

Works exactly as before - DataGrid manages pagination internally:

```tsx
import { DataGrid, DataGridTable, DataGridPagination } from '@ttianqii/takaui';

function MyTable() {
  const data = [/* your data */];
  const columns = [/* your columns */];

  return (
    <DataGrid columns={columns} data={data}>
      <DataGridTable />
      <DataGridPagination pageSizeOptions={[5, 10, 20]} />
    </DataGrid>
  );
}
```

### 2. Controlled Mode (Server-Side Pagination)

Manage pagination state externally for server-side data:

```tsx
import { useState, useEffect } from 'react';
import { DataGrid, DataGridTable, DataGridPagination, type PaginationState } from '@ttianqii/takaui';

function ServerSideTable() {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });

  // Fetch data when pagination changes
  useEffect(() => {
    fetchData(pagination.page, pagination.limit);
  }, [pagination.page, pagination.limit]);

  const fetchData = async (page: number, limit: number) => {
    const response = await fetch(`/api/data?page=${page}&limit=${limit}`);
    const result = await response.json();
    
    setData(result.data);
    setPagination(prev => ({
      ...prev,
      total: result.total,
      totalPages: result.totalPages
    }));
  };

  const handlePaginationChange = (newPagination: PaginationState) => {
    setPagination(newPagination);
  };

  return (
    <DataGrid 
      columns={columns} 
      data={data}
      currentPage={pagination.page}
      pageSize={pagination.limit}
      recordCount={pagination.total}
      onPaginationChange={handlePaginationChange}
    >
      <DataGridTable />
      <DataGridPagination pageSizeOptions={[10, 20, 50]} />
    </DataGrid>
  );
}
```

### 3. Server-Side with Search and Sort

Complete example with search and filtering:

```tsx
import { useState, useEffect } from 'react';
import { DataGrid, DataGridTable, DataGridPagination, DataGridColumnHeader, type PaginationState } from '@ttianqii/takaui';

interface Course {
  id: string;
  name: string;
  code: string;
  department: string;
}

function CourseTable() {
  const [data, setData] = useState<Course[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('');

  // Fetch data
  useEffect(() => {
    fetchCourses();
  }, [pagination.page, pagination.limit, search, department]);

  const fetchCourses = async () => {
    const params = new URLSearchParams({
      page: String(pagination.page),
      limit: String(pagination.limit),
      ...(search && { search }),
      ...(department && { departmentId: department })
    });

    const response = await fetch(`/api/courses?${params}`);
    const result = await response.json();
    
    setData(result.data);
    setPagination(prev => ({
      ...prev,
      total: result.total,
      totalPages: result.totalPages
    }));
  };

  const handlePaginationChange = (newPagination: PaginationState) => {
    setPagination(newPagination);
  };

  const columns = [
    {
      id: 'code',
      header: 'Code',
      accessorKey: 'code',
    },
    {
      id: 'name',
      header: 'Course Name',
      accessorKey: 'name',
    },
    {
      id: 'department',
      header: 'Department',
      accessorKey: 'department',
    },
  ];

  return (
    <div>
      <input 
        type="text"
        placeholder="Search courses..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      
      <DataGrid 
        columns={columns} 
        data={data}
        currentPage={pagination.page}
        pageSize={pagination.limit}
        recordCount={pagination.total}
        onPaginationChange={handlePaginationChange}
      >
        <DataGridTable />
        <DataGridPagination pageSizeOptions={[10, 20, 50, 100]} />
      </DataGrid>
    </div>
  );
}
```

## Backend Example (Express + Prisma)

```typescript
// GET /api/courses
app.get('/api/courses', async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const search = req.query.search as string;
  const departmentId = req.query.departmentId as string;

  const skip = (page - 1) * limit;

  // Build where clause
  const where: any = {};
  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { code: { contains: search, mode: 'insensitive' } },
    ];
  }
  if (departmentId) {
    where.departmentId = departmentId;
  }

  // Get total count
  const total = await prisma.course.count({ where });

  // Get paginated data
  const data = await prisma.course.findMany({
    where,
    skip,
    take: limit,
    orderBy: { name: 'asc' },
  });

  res.json({
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
});
```

## How It Works

### Controlled vs Uncontrolled

**Uncontrolled Mode** (default):
- DataGrid manages its own state internally
- No need to pass `currentPage` or `pageSize` props
- Works with local data

**Controlled Mode**:
- Pass `currentPage` and/or `pageSize` props
- DataGrid uses external state
- Fires `onPaginationChange` callback
- Perfect for server-side pagination

### State Priority

```typescript
// Internal state (uncontrolled)
const [internalPage, setInternalPage] = useState(0);
const [internalPageSize, setInternalPageSize] = useState(5);

// Use external if provided, otherwise internal
const pageIndex = externalPage !== undefined ? externalPage - 1 : internalPage;
const pageSize = externalPageSize ?? internalPageSize;
```

### Pagination Callback

When pagination changes, `onPaginationChange` is called with:

```typescript
{
  page: 2,           // Current page (1-indexed)
  limit: 20,         // Page size
  total: 150,        // Total records
  totalPages: 8      // Total pages
}
```

## Migration Guide

### From Uncontrolled to Controlled

**Before (Uncontrolled):**
```tsx
<DataGrid columns={columns} data={data}>
  <DataGridTable />
  <DataGridPagination />
</DataGrid>
```

**After (Controlled):**
```tsx
const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, totalPages: 0 });

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

## TypeScript Support

Full type safety with generics:

```typescript
import { DataGrid, type DataGridColumn, type PaginationState } from '@ttianqii/takaui';

interface User {
  id: string;
  name: string;
  email: string;
}

const columns: DataGridColumn<User>[] = [
  { id: 'name', header: 'Name', accessorKey: 'name' },
  { id: 'email', header: 'Email', accessorKey: 'email' },
];

function UserTable() {
  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });

  return (
    <DataGrid<User>
      columns={columns}
      data={users}
      currentPage={pagination.page}
      pageSize={pagination.limit}
      recordCount={pagination.total}
      onPaginationChange={setPagination}
    >
      <DataGridTable />
      <DataGridPagination />
    </DataGrid>
  );
}
```

## Best Practices

1. **Use `recordCount` for server-side pagination**: Pass total record count from server
2. **Debounce search inputs**: Avoid excessive API calls
3. **Handle loading states**: Show loading indicator during fetch
4. **Error handling**: Handle API errors gracefully
5. **Cache data**: Consider caching to reduce API calls

## Comparison: DataTable vs DataGrid

| Feature | DataTable | DataGrid |
|---------|-----------|----------|
| Controlled Pagination | ✅ | ✅ |
| Built-in Search | ✅ | ❌ (manual) |
| Built-in Sort Callbacks | ✅ | ❌ (uses context) |
| Modular Components | ❌ | ✅ |
| Row Selection | ✅ | ✅ |
| Customization | Medium | High |

**When to use DataTable:**
- Need built-in search and sort callbacks
- Simple implementation
- All-in-one component

**When to use DataGrid:**
- Need maximum customization
- Composition pattern preferred
- Building custom table layouts

## Troubleshooting

### Page doesn't update
- Ensure you're updating state in `onPaginationChange`
- Check that `currentPage` prop is being passed correctly

### Total pages incorrect
- Make sure `recordCount` prop is set to total records
- Verify server returns correct `total` count

### Infinite re-renders
- Don't create new objects in render
- Use `useState` or `useMemo` for pagination state

## See Also

- [DataTable Pagination Guide](./DATATABLE_PAGINATION.md)
- [Server-Side Example](./SERVER_SIDE_EXAMPLE.md)
- [DataGrid Documentation](./docs/DATATABLE_MODULAR.md)
