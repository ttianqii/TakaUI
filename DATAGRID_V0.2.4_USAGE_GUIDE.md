# TakaUI DataGrid v0.2.4 - Complete Usage Guide

**Version**: 0.2.4  
**Release Date**: January 29, 2026  
**New Features**: Server-Side Pagination with Loading States

---

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [Installation](#installation)
3. [Basic Usage](#basic-usage)
4. [Server-Side Pagination](#server-side-pagination)
5. [API Reference](#api-reference)
6. [Props Guide](#props-guide)
7. [Examples](#examples)
8. [Migration from v0.2.3](#migration-from-v023)
9. [Troubleshooting](#troubleshooting)

---

## 🚀 Quick Start

### Basic Client-Side Pagination

```tsx
import { DataGrid, DataGridTable, DataGridPagination } from '@ttianqii/takaui';

function MyTable() {
  const columns = [
    { id: 'name', accessorKey: 'name', header: 'Name' },
    { id: 'email', accessorKey: 'email', header: 'Email' },
  ];

  const data = [
    { id: '1', name: 'John Doe', email: 'john@example.com' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
  ];

  return (
    <DataGrid columns={columns} data={data}>
      <DataGridTable />
      <DataGridPagination mode="advanced" />
    </DataGrid>
  );
}
```

### Server-Side Pagination with Loading

```tsx
import { DataGrid, DataGridTable, DataGridPagination } from '@ttianqii/takaui';
import { useState, useEffect } from 'react';

function ServerTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetch(`/api/data?page=${page}&limit=${limit}`);
      const result = await response.json();
      setData(result.data);
      setTotal(result.total);
      setLoading(false);
    };
    fetchData();
  }, [page, limit]);

  const handlePaginationChange = (pagination) => {
    setPage(pagination.page);
    setLimit(pagination.limit);
  };

  return (
    <DataGrid
      columns={columns}
      data={data}
      loading={loading}              // ⭐ NEW: Shows loading spinner
      manualPagination={true}        // ⭐ NEW: Server-side mode
      currentPage={page}
      pageSize={limit}
      recordCount={total}
      onPaginationChange={handlePaginationChange}
    >
      <DataGridTable />
      <DataGridPagination mode="advanced" />
    </DataGrid>
  );
}
```

---

## 📦 Installation

### Install TakaUI

```bash
npm install @ttianqii/takaui@0.2.4
```

### Peer Dependencies

```bash
npm install react react-dom
```

---

## 🎯 Basic Usage

### Step 1: Define Your Columns

```tsx
import type { DataGridColumn } from '@ttianqii/takaui';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
}

const columns: DataGridColumn<User>[] = [
  {
    id: 'name',
    accessorKey: 'name',
    header: 'Full Name',
    size: 200,
  },
  {
    id: 'email',
    accessorKey: 'email',
    header: 'Email Address',
    size: 250,
  },
  {
    id: 'role',
    accessorKey: 'role',
    header: 'Role',
    size: 150,
  },
  {
    id: 'status',
    header: 'Status',
    cell: (row) => (
      <span className={row.status === 'active' ? 'text-green-600' : 'text-red-600'}>
        {row.status}
      </span>
    ),
    size: 100,
    align: 'center',
  },
];
```

### Step 2: Use DataGrid Components

```tsx
import { DataGrid, DataGridTable, DataGridPagination } from '@ttianqii/takaui';

function UsersTable() {
  const [users, setUsers] = useState<User[]>([]);

  return (
    <DataGrid<User>
      columns={columns}
      data={users}
      getRowId={(row) => row.id}
      onRowClick={(row) => console.log('Clicked:', row)}
    >
      <DataGridTable />
      <DataGridPagination mode="advanced" pageSizeOptions={[5, 10, 25, 50]} />
    </DataGrid>
  );
}
```

---

## 🌐 Server-Side Pagination

### Complete Implementation

```tsx
import { DataGrid, DataGridTable, DataGridPagination, PaginationState } from '@ttianqii/takaui';
import { useState, useEffect, useRef } from 'react';

interface Course {
  id: string;
  title: string;
  instructor: string;
}

function CoursesTable() {
  // State management
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalCourses, setTotalCourses] = useState(0);
  
  // Debounce timer for limit changes
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch data from server
  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/courses?page=${page}&limit=${limit}`);
        const result = await response.json();
        setCourses(result.courses);
        setTotalCourses(result.total);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [page, limit]);

  // Handle pagination changes with debouncing
  const handlePaginationChange = (pagination: PaginationState) => {
    // Clear existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    
    // Handle page change immediately
    if (pagination.page !== page) {
      setPage(pagination.page);
    }
    
    // Debounce limit change (300ms delay)
    if (pagination.limit !== limit) {
      debounceTimerRef.current = setTimeout(() => {
        setLimit(pagination.limit);
        setPage(1); // Reset to first page when changing limit
      }, 300);
    }
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  // Define columns
  const columns: DataGridColumn<Course>[] = [
    { id: 'title', accessorKey: 'title', header: 'Course Title', size: 300 },
    { id: 'instructor', accessorKey: 'instructor', header: 'Instructor', size: 200 },
  ];

  return (
    <DataGrid<Course>
      columns={columns}
      data={courses}
      loading={loading}
      manualPagination={true}
      currentPage={page}
      pageSize={limit}
      recordCount={totalCourses}
      onPaginationChange={handlePaginationChange}
      emptyMessage="No courses found. Try adjusting your filters."
    >
      <DataGridTable />
      <DataGridPagination mode="advanced" pageSizeOptions={[5, 10, 25, 50]} />
    </DataGrid>
  );
}
```

---

## 📚 API Reference

### DataGrid Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `columns` | `DataGridColumn<T>[]` | ✅ Yes | - | Array of column definitions |
| `data` | `T[]` | ✅ Yes | - | Array of data to display |
| `children` | `ReactNode` | ✅ Yes | - | Child components (DataGridTable, DataGridPagination) |
| `getRowId` | `(row: T) => string` | ❌ No | Auto-generated | Function to get unique row ID |
| `onRowClick` | `(row: T) => void` | ❌ No | - | Callback when row is clicked |
| `recordCount` | `number` | ❌ No | `data.length` | Total records (for server-side pagination) |
| `currentPage` | `number` | ❌ No | `1` | Current page (1-indexed, for controlled mode) |
| `pageSize` | `number` | ❌ No | `10` | Items per page (for controlled mode) |
| `onPaginationChange` | `(pagination: PaginationState) => void` | ❌ No | - | Callback when pagination changes |
| `loading` | `boolean` | ❌ No | `false` | ⭐ **NEW v0.2.4**: Show loading spinner |
| `emptyMessage` | `string` | ❌ No | `'No data found'` | ⭐ **NEW v0.2.4**: Custom empty state message |
| `manualPagination` | `boolean` | ❌ No | `false` | ⭐ **NEW v0.2.4**: Enable server-side pagination |

### DataGridColumn Interface

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `string` | ✅ Yes | Unique column identifier |
| `accessorKey` | `keyof T` | ❌ No | Key to access data in row object |
| `header` | `string \| ReactNode` | ✅ Yes | Column header content |
| `cell` | `(row: T, index: number) => ReactNode` | ❌ No | Custom cell renderer |
| `size` | `number` | ❌ No | Column width in pixels |
| `enableSorting` | `boolean` | ❌ No | Enable sorting for this column |
| `enableHiding` | `boolean` | ❌ No | Allow column to be hidden |
| `align` | `'left' \| 'center' \| 'right'` | ❌ No | Cell content alignment |

### PaginationState Interface

```typescript
interface PaginationState {
  page: number;        // Current page (1-indexed)
  limit: number;       // Items per page
  total: number;       // Total number of records
  totalPages: number;  // Total number of pages
}
```

### DataGridPagination Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `mode` | `'simple' \| 'advanced'` | `'simple'` | Pagination display mode |
| `pageSizeOptions` | `number[]` | `[5, 10, 15, 20]` | Available page size options |

---

## 🎨 Props Guide

### When to Use Each Prop

#### `loading={true}`
- ✅ Use when fetching data from server
- ✅ Shows animated loading spinner
- ✅ Hides "empty state" during loading
- ✅ Disables pagination buttons

```tsx
<DataGrid loading={isLoading} ... />
```

#### `manualPagination={true}`
- ✅ Use for server-side pagination
- ✅ Prevents client-side data slicing
- ✅ Expects data to already be paginated

```tsx
<DataGrid manualPagination={true} ... />
```

#### `emptyMessage="Custom message"`
- ✅ Use to customize empty state text
- ✅ Shown when no data and not loading
- ✅ Helpful for user guidance

```tsx
<DataGrid emptyMessage="No results match your filters. Try adjusting your search." ... />
```

#### `recordCount={total}`
- ✅ Required for server-side pagination
- ✅ Total records from server (not page size)
- ✅ Used to calculate total pages

```tsx
<DataGrid recordCount={totalRecords} ... />
```

#### `currentPage` & `pageSize`
- ✅ Use for controlled pagination
- ✅ Your component controls the state
- ✅ Must provide both or neither

```tsx
<DataGrid currentPage={page} pageSize={limit} ... />
```

#### `onPaginationChange`
- ✅ Required for controlled pagination
- ✅ Receives pagination state changes
- ✅ Update your component state here

```tsx
<DataGrid onPaginationChange={(pagination) => {
  setPage(pagination.page);
  setLimit(pagination.limit);
}} ... />
```

---

## 📖 Examples

### Example 1: Simple Client-Side Table

```tsx
function SimpleTable() {
  const data = [
    { id: 1, name: 'Alice', age: 28 },
    { id: 2, name: 'Bob', age: 34 },
    { id: 3, name: 'Charlie', age: 25 },
  ];

  const columns = [
    { id: 'name', accessorKey: 'name', header: 'Name' },
    { id: 'age', accessorKey: 'age', header: 'Age' },
  ];

  return (
    <DataGrid columns={columns} data={data}>
      <DataGridTable />
      <DataGridPagination mode="simple" />
    </DataGrid>
  );
}
```

### Example 2: Custom Cell Rendering

```tsx
const columns: DataGridColumn<User>[] = [
  {
    id: 'avatar',
    header: 'Avatar',
    cell: (row) => (
      <img
        src={row.avatarUrl}
        alt={row.name}
        className="w-8 h-8 rounded-full"
      />
    ),
    size: 80,
    align: 'center',
  },
  {
    id: 'name',
    header: 'User',
    cell: (row) => (
      <div>
        <div className="font-medium">{row.name}</div>
        <div className="text-sm text-gray-500">{row.email}</div>
      </div>
    ),
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: (row) => (
      <div className="flex gap-2">
        <button onClick={() => editUser(row.id)}>Edit</button>
        <button onClick={() => deleteUser(row.id)}>Delete</button>
      </div>
    ),
    align: 'right',
  },
];
```

### Example 3: With Search and Filters

```tsx
function FilterableTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        search,
        filter,
      });
      const response = await fetch(`/api/users?${params}`);
      const result = await response.json();
      setData(result.data);
      setTotal(result.total);
      setLoading(false);
    };
    fetchData();
  }, [page, limit, search, filter]);

  return (
    <div>
      <div className="mb-4 flex gap-4">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1); // Reset to page 1 on search
          }}
          className="border px-3 py-2 rounded"
        />
        <select
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setPage(1); // Reset to page 1 on filter
          }}
          className="border px-3 py-2 rounded"
        >
          <option value="all">All Users</option>
          <option value="active">Active Only</option>
          <option value="inactive">Inactive Only</option>
        </select>
      </div>

      <DataGrid
        columns={columns}
        data={data}
        loading={loading}
        manualPagination={true}
        currentPage={page}
        pageSize={limit}
        recordCount={total}
        onPaginationChange={(pagination) => {
          setPage(pagination.page);
          setLimit(pagination.limit);
        }}
        emptyMessage={
          search || filter !== 'all'
            ? 'No results match your filters. Try adjusting your search.'
            : 'No users found.'
        }
      >
        <DataGridTable />
        <DataGridPagination mode="advanced" pageSizeOptions={[10, 25, 50, 100]} />
      </DataGrid>
    </div>
  );
}
```

### Example 4: Row Selection

```tsx
function SelectableTable() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleRowClick = (row: User) => {
    setSelectedIds((prev) =>
      prev.includes(row.id)
        ? prev.filter((id) => id !== row.id)
        : [...prev, row.id]
    );
  };

  return (
    <div>
      <div className="mb-4">
        Selected: {selectedIds.length} items
        {selectedIds.length > 0 && (
          <button onClick={() => setSelectedIds([])}>Clear Selection</button>
        )}
      </div>

      <DataGrid
        columns={columns}
        data={data}
        onRowClick={handleRowClick}
      >
        <DataGridTable />
        <DataGridPagination />
      </DataGrid>
    </div>
  );
}
```

---

## 🔄 Migration from v0.2.3

### Breaking Changes
**None!** v0.2.4 is fully backward compatible.

### New Features to Adopt

#### Before (v0.2.3)
```tsx
function OldTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <div>
      {loading && <div>Loading...</div>}
      <DataGrid columns={columns} data={data}>
        <DataGridTable />
        <DataGridPagination />
      </DataGrid>
    </div>
  );
}
```

#### After (v0.2.4)
```tsx
function NewTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <DataGrid
      columns={columns}
      data={data}
      loading={loading}              // ⭐ Built-in loading support
      manualPagination={true}        // ⭐ Server-side pagination
      emptyMessage="No data available"
    >
      <DataGridTable />
      <DataGridPagination />
    </DataGrid>
  );
}
```

### Update Checklist

- [ ] Update `@ttianqii/takaui` to `0.2.4`
- [ ] Add `loading` prop to show loading states
- [ ] Add `manualPagination={true}` for server-side pagination
- [ ] Remove custom loading overlays (now built-in)
- [ ] Optionally customize `emptyMessage`
- [ ] Test pagination with loading states

---

## 🔧 Troubleshooting

### Problem: Empty state shows during loading

**Solution**: Make sure to pass `loading={true}` prop:
```tsx
<DataGrid loading={isLoading} data={data} ... />
```

### Problem: Data gets sliced on client-side with server pagination

**Solution**: Add `manualPagination={true}`:
```tsx
<DataGrid manualPagination={true} ... />
```

### Problem: Pagination buttons not disabled during loading

**Solution**: Ensure `loading` prop is passed correctly:
```tsx
<DataGrid loading={loading} ... />
```

### Problem: Wrong total page count

**Solution**: Pass `recordCount` with total records from server:
```tsx
<DataGrid recordCount={totalRecordsFromServer} ... />
```

### Problem: Multiple API calls when changing page size

**Solution**: Implement debouncing in `onPaginationChange`:
```tsx
const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

const handlePaginationChange = (pagination) => {
  if (debounceTimerRef.current) {
    clearTimeout(debounceTimerRef.current);
  }
  
  if (pagination.page !== page) {
    setPage(pagination.page); // Immediate
  }
  
  if (pagination.limit !== limit) {
    debounceTimerRef.current = setTimeout(() => {
      setLimit(pagination.limit); // Debounced
    }, 300);
  }
};
```

---

## 🎯 Best Practices

### 1. Always Set Loading State
```tsx
// ✅ Good
<DataGrid loading={isLoading} ... />

// ❌ Bad - users see "No data found" during fetch
<DataGrid loading={false} ... />
```

### 2. Use manualPagination for Server-Side
```tsx
// ✅ Good - no client-side slicing
<DataGrid manualPagination={true} ... />

// ❌ Bad - data gets sliced twice
<DataGrid manualPagination={false} ... />
```

### 3. Provide Helpful Empty Messages
```tsx
// ✅ Good - actionable message
<DataGrid emptyMessage="No results. Try different filters." ... />

// ❌ Bad - generic message
<DataGrid emptyMessage="No data" ... />
```

### 4. Debounce Limit Changes
```tsx
// ✅ Good - prevents excessive API calls
const handlePaginationChange = (pagination) => {
  if (pagination.limit !== limit) {
    debounceChange(() => setLimit(pagination.limit), 300);
  }
};

// ❌ Bad - API call on every keystroke
setLimit(pagination.limit);
```

### 5. Reset Page on Filter Changes
```tsx
// ✅ Good - user sees results
const handleFilterChange = (filter) => {
  setFilter(filter);
  setPage(1); // Reset to first page
};

// ❌ Bad - user might see empty page 5
setFilter(filter); // without resetting page
```

---

## 📞 Support & Resources

- **Documentation**: [GitHub Repository](https://github.com/ttianqii/takaui)
- **Issues**: [GitHub Issues](https://github.com/ttianqii/takaui/issues)
- **NPM**: [@ttianqii/takaui](https://www.npmjs.com/package/@ttianqii/takaui)

---

## 📝 Summary

### What's New in v0.2.4

✅ **Loading State Support**: Built-in loading spinner  
✅ **Server-Side Pagination**: `manualPagination` prop  
✅ **Custom Empty Messages**: Customize "no data" message  
✅ **Disabled Controls**: Buttons disable during loading  
✅ **Better UX**: No more confusing empty states  
✅ **Inline Styles**: No external CSS required  
✅ **Backward Compatible**: Existing code works without changes  

### Quick Reference

```tsx
// Minimal server-side pagination setup
<DataGrid
  columns={columns}
  data={data}
  loading={loading}           // Show spinner when fetching
  manualPagination={true}     // Server-side mode
  currentPage={page}          // Controlled page
  pageSize={limit}            // Controlled size
  recordCount={total}         // Total from server
  onPaginationChange={onChange}
>
  <DataGridTable />
  <DataGridPagination mode="advanced" />
</DataGrid>
```

---

**Version**: 0.2.4  
**Last Updated**: January 29, 2026  
**Author**: TakaUI Team (@ttianqii)
