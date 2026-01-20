# Server-Side DataTable Example

Complete example for using DataTable with server-side data fetching, including pagination, search, and sorting.

## Your API Endpoint

```
GET /courses?page=1&limit=10&search=...&departmentId=...&sort=title&order=asc
```

## Complete React Example

```tsx
import { DataTable, DataTableColumn, PaginationState } from '@ttianqii/takaui';
import { useState, useEffect } from 'react';

interface Course {
  id: string;
  title: string;
  department: string;
  instructor: string;
  createdAt: string;
}

function CoursesTable() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  
  // API parameters
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [sort, setSort] = useState('title');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [departmentId, setDepartmentId] = useState<string | undefined>(undefined);

  // Fetch data from API
  const fetchCourses = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        sort,
        order,
      });
      
      // Add optional parameters
      if (search) params.append('search', search);
      if (departmentId) params.append('departmentId', departmentId);

      const response = await fetch(`/courses?${params}`);
      const data = await response.json();
      
      setCourses(data.items || data);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch when parameters change
  useEffect(() => {
    fetchCourses();
  }, [page, limit, search, sort, order, departmentId]);

  const columns: DataTableColumn<Course>[] = [
    {
      key: 'title',
      header: 'Title',
      sortable: true,
    },
    {
      key: 'department',
      header: 'Department',
      sortable: true,
    },
    {
      key: 'instructor',
      header: 'Instructor',
      sortable: true,
    },
    {
      key: 'createdAt',
      header: 'Created',
      sortable: true,
      cell: (value) => new Date(value as string).toLocaleDateString(),
    },
  ];

  return (
    <div>
      {loading && <div className="text-center py-4">Loading...</div>}
      
      <DataTable
        data={courses}
        columns={columns}
        pageSize={limit}
        pageSizeOptions={[5, 10, 20, 50, 100]}
        searchPlaceholder="Search courses..."
        
        // Handle pagination changes
        onPaginationChange={(pagination: PaginationState) => {
          setPage(pagination.page);
          setLimit(pagination.limit);
        }}
        
        // Handle search changes
        onSearchChange={(searchQuery: string) => {
          setSearch(searchQuery || undefined);
          setPage(1); // Reset to first page on search
        }}
        
        // Handle sort changes
        onSortChange={(sortField: string, sortOrder: 'asc' | 'desc') => {
          setSort(sortField);
          setOrder(sortOrder);
        }}
      />
    </div>
  );
}

export default CoursesTable;
```

## API Call Result

With the above setup, your API will receive:

```
GET /courses params: {
  page: "1",
  limit: "10",
  search: undefined,
  departmentId: undefined,
  sort: "title",
  order: "asc",
}
```

## With Debouncing (Recommended for Search)

To avoid too many API calls while typing:

```tsx
import { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash'; // or implement your own

function CoursesTable() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Debounce search
  const debouncedSetSearch = useCallback(
    debounce((value: string) => {
      setDebouncedSearch(value);
      setPage(1);
    }, 500),
    []
  );

  useEffect(() => {
    return () => debouncedSetSearch.cancel();
  }, []);

  return (
    <DataTable
      data={courses}
      columns={columns}
      onSearchChange={(search) => {
        setSearchQuery(search);
        debouncedSetSearch(search);
      }}
      // ... other props
    />
  );
}
```

## With Department Filter

Add a filter dropdown:

```tsx
function CoursesTable() {
  const [departmentId, setDepartmentId] = useState<string | undefined>();

  return (
    <div>
      <select 
        value={departmentId || ''} 
        onChange={(e) => {
          setDepartmentId(e.target.value || undefined);
          setPage(1);
        }}
      >
        <option value="">All Departments</option>
        <option value="1">Computer Science</option>
        <option value="2">Mathematics</option>
        <option value="3">Physics</option>
      </select>

      <DataTable
        data={courses}
        columns={columns}
        onPaginationChange={(p) => {
          setPage(p.page);
          setLimit(p.limit);
        }}
        onSearchChange={(s) => {
          setSearch(s || undefined);
          setPage(1);
        }}
        onSortChange={(field, direction) => {
          setSort(field);
          setOrder(direction);
        }}
      />
    </div>
  );
}
```

## With URL Sync (React Router)

Keep state in URL for bookmarking and sharing:

```tsx
import { useSearchParams } from 'react-router-dom';

function CoursesTable() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 10;
  const search = searchParams.get('search') || undefined;
  const sort = searchParams.get('sort') || 'title';
  const order = (searchParams.get('order') as 'asc' | 'desc') || 'asc';

  const updateParams = (updates: Record<string, string>) => {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });
    setSearchParams(newParams);
  };

  return (
    <DataTable
      data={courses}
      columns={columns}
      pageSize={limit}
      onPaginationChange={(p) => {
        updateParams({
          page: p.page.toString(),
          limit: p.limit.toString(),
        });
      }}
      onSearchChange={(s) => {
        updateParams({
          search: s,
          page: '1', // Reset to page 1
        });
      }}
      onSortChange={(field, direction) => {
        updateParams({
          sort: field,
          order: direction,
        });
      }}
    />
  );
}
```

## Backend (Express + Prisma Example)

```typescript
app.get('/courses', async (req, res) => {
  const {
    page = '1',
    limit = '10',
    search,
    departmentId,
    sort = 'title',
    order = 'asc',
  } = req.query;

  const skip = (Number(page) - 1) * Number(limit);
  const take = Number(limit);

  const where = {
    ...(search && {
      OR: [
        { title: { contains: search as string, mode: 'insensitive' } },
        { instructor: { contains: search as string, mode: 'insensitive' } },
      ],
    }),
    ...(departmentId && { departmentId: departmentId as string }),
  };

  const orderBy = [
    { [sort as string]: order },
    { createdAt: 'desc' }, // Secondary sort
  ];

  const [courses, total] = await Promise.all([
    prisma.course.findMany({
      where,
      skip,
      take,
      orderBy,
    }),
    prisma.course.count({ where }),
  ]);

  res.json({
    items: courses,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / Number(limit)),
    },
  });
});
```

## API Props Summary

| Callback | Parameters | When Triggered | Use For |
|----------|-----------|----------------|---------|
| `onPaginationChange` | `{ page, limit, total, totalPages }` | Page or page size changes | Update `page` and `limit` |
| `onSearchChange` | `search: string` | User types in search | Update `search` param |
| `onSortChange` | `sort: string, order: 'asc' \| 'desc'` | User clicks sort header | Update `sort` and `order` |

## Tips

1. **Always reset to page 1** when search or filters change
2. **Debounce search** to reduce API calls (500ms recommended)
3. **Show loading state** while fetching
4. **Handle errors** gracefully
5. **Keep state in URL** for better UX (bookmarking, sharing)
6. **Add secondary sort** (e.g., createdAt) for consistency

## Complete Working Example

See [TablePage.tsx](./src/pages/TablePage.tsx) for a live demo with state tracking!
