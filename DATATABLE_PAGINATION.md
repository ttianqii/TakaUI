# DataTable Pagination Guide

> **New in v0.0.8** - Advanced pagination with customizable page sizes and state callbacks

## Overview

The DataTable component now supports dynamic page size selection and provides pagination state callbacks, making it perfect for server-side pagination and API integration.

## Features

✨ **Page Size Selector** - Let users choose rows per page (5, 10, 20, 50, etc.)  
📡 **Pagination Callback** - Get real-time pagination state for API calls  
🎯 **Customizable Options** - Define your own page size options  
⚡ **Auto-Reset** - Automatically resets to page 1 when page size changes  

## Basic Usage

### Simple Pagination

```tsx
import { DataTable } from '@ttianqii/takaui';

<DataTable
  data={data}
  columns={columns}
  showPagination={true}
  pageSize={10}
  pageSizeOptions={[5, 10, 20, 50]}
/>
```

## Advanced Usage

### With Pagination Callback (Server-Side Pagination)

Perfect for fetching data from your API based on the current pagination state:

```tsx
import { DataTable, PaginationState } from '@ttianqii/takaui';
import { useState, useEffect } from 'react';

function MyTable() {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState<PaginationState | null>(null);

  const handlePaginationChange = (paginationState: PaginationState) => {
    console.log('Pagination changed:', paginationState);
    // Output: { page: 1, limit: 10, total: 50, totalPages: 5 }
    
    setPagination(paginationState);
    
    // Fetch data from your API
    fetch(`/api/products?page=${paginationState.page}&limit=${paginationState.limit}`)
      .then(res => res.json())
      .then(data => setData(data));
  };

  return (
    <DataTable
      data={data}
      columns={columns}
      pageSize={10}
      pageSizeOptions={[5, 10, 20, 50, 100]}
      onPaginationChange={handlePaginationChange}
    />
  );
}
```

## Props Reference

### DataTable Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `pageSize` | `number` | `10` | Initial number of rows per page |
| `pageSizeOptions` | `number[]` | `[5, 10, 20, 50]` | Available page size options in dropdown |
| `showPagination` | `boolean` | `true` | Show/hide pagination controls |
| `onPaginationChange` | `(pagination: PaginationState) => void` | `undefined` | Callback fired when pagination changes |

### PaginationState Interface

The `onPaginationChange` callback receives a `PaginationState` object:

```typescript
interface PaginationState {
  page: number;        // Current page number (1-indexed)
  limit: number;       // Rows per page (selected page size)
  total: number;       // Total number of rows (after filtering)
  totalPages: number;  // Total number of pages
}
```

## Examples

### Example 1: Custom Page Sizes

```tsx
<DataTable
  data={products}
  columns={columns}
  pageSize={25}
  pageSizeOptions={[10, 25, 50, 100, 200]}
/>
```

### Example 2: API Integration with Loading State

```tsx
function ProductTable() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async (page: number, limit: number) => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/products?page=${page}&limit=${limit}`
      );
      const data = await response.json();
      setProducts(data.items);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DataTable
      data={products}
      columns={columns}
      pageSize={10}
      pageSizeOptions={[5, 10, 20, 50]}
      onPaginationChange={(pagination) => {
        fetchProducts(pagination.page, pagination.limit);
      }}
    />
  );
}
```

### Example 3: Sync with URL Query Parameters

```tsx
import { useSearchParams } from 'react-router-dom';

function ProductTable() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState([]);

  const handlePaginationChange = (pagination: PaginationState) => {
    // Update URL with pagination state
    setSearchParams({
      page: pagination.page.toString(),
      limit: pagination.limit.toString(),
    });

    // Fetch data
    fetchData(pagination.page, pagination.limit);
  };

  return (
    <DataTable
      data={data}
      columns={columns}
      pageSize={Number(searchParams.get('limit')) || 10}
      onPaginationChange={handlePaginationChange}
    />
  );
}
```

### Example 4: With Search and Filtering

The pagination state reflects the filtered data count:

```tsx
<DataTable
  data={products}
  columns={columns}
  showSearch={true}
  searchPlaceholder="Search products..."
  pageSize={10}
  onPaginationChange={(pagination) => {
    console.log(`Showing ${pagination.total} results`);
    // pagination.total reflects filtered results
  }}
/>
```

## Important Notes

⚠️ **Callback Function Reference**: Don't include `onPaginationChange` in dependency arrays to avoid infinite loops. The component handles this internally.

✅ **Good**:
```tsx
const handlePagination = useCallback((pagination: PaginationState) => {
  fetchData(pagination.page, pagination.limit);
}, []);
```

❌ **Avoid**:
```tsx
// Don't pass inline functions if you need stable references
<DataTable
  onPaginationChange={(p) => {
    // This creates a new function on every render
    fetchData(p.page, p.limit);
  }}
/>
```

## Migration from Previous Versions

If you're upgrading from an earlier version:

### Before (v0.0.7 and earlier)
```tsx
<DataTable
  data={data}
  columns={columns}
  pageSize={10} // Fixed, couldn't be changed by user
/>
```

### After (v0.0.8+)
```tsx
<DataTable
  data={data}
  columns={columns}
  pageSize={10} // Initial size
  pageSizeOptions={[5, 10, 20, 50]} // User can now select
  onPaginationChange={(pagination) => {
    // Get notified of changes
  }}
/>
```

## Best Practices

1. **Use `useCallback`** for the `onPaginationChange` handler to prevent unnecessary re-renders
2. **Debounce API calls** if pagination changes frequently
3. **Show loading states** when fetching new data
4. **Handle errors** gracefully when API calls fail
5. **Persist pagination state** in URL or localStorage for better UX

## Related Components

- [DataGrid](./DATATABLE_ARCHITECTURE.md) - For more advanced grid features
- [DataTable Guide](./DATATABLE_USAGE.md) - General DataTable documentation

## Changelog

### v0.0.8
- ✨ Added `pageSizeOptions` prop
- ✨ Added `onPaginationChange` callback
- ✨ Added page size selector to UI
- ✨ Added `PaginationState` TypeScript interface
- 🐛 Fixed infinite loop in pagination effect
- 📝 Added comprehensive pagination documentation
