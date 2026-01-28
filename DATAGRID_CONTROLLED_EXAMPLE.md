# DataGrid Controlled Pagination - Quick Example

## Simple Server-Side Pagination

```tsx
import { useState, useEffect } from 'react';
import { 
  DataGrid, 
  DataGridTable, 
  DataGridPagination,
  type PaginationState 
} from '@ttianqii/takaui';

interface Course {
  id: string;
  name: string;
  code: string;
  credits: number;
}

export function CourseDataGrid() {
  const [data, setData] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });

  // Fetch data when pagination changes
  useEffect(() => {
    fetchCourses();
  }, [pagination.page, pagination.limit]);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/courses?page=${pagination.page}&limit=${pagination.limit}`
      );
      const result = await response.json();
      
      setData(result.data);
      // Update total and totalPages from server response
      setPagination(prev => ({
        ...prev,
        total: result.total,
        totalPages: result.totalPages
      }));
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePaginationChange = (newPagination: PaginationState) => {
    setPagination(newPagination);
  };

  const columns = [
    {
      id: 'code',
      header: 'Course Code',
      accessorKey: 'code',
    },
    {
      id: 'name',
      header: 'Course Name',
      accessorKey: 'name',
    },
    {
      id: 'credits',
      header: 'Credits',
      accessorKey: 'credits',
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Courses</h2>
        {loading && <span>Loading...</span>}
      </div>

      <DataGrid<Course>
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

      {/* Debug info */}
      <div className="text-sm text-gray-500">
        Page {pagination.page} of {pagination.totalPages} | 
        Total: {pagination.total} courses
      </div>
    </div>
  );
}
```

## Backend API (Express + Prisma)

```typescript
import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.get('/api/courses', async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  
  const skip = (page - 1) * limit;
  
  try {
    // Get total count
    const total = await prisma.course.count();
    
    // Get paginated data
    const data = await prisma.course.findMany({
      skip,
      take: limit,
      orderBy: { name: 'asc' },
    });
    
    res.json({
      data,
      total,
      totalPages: Math.ceil(total / limit),
      page,
      limit
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

## With Search and Filters

```tsx
import { useState, useEffect } from 'react';
import { DataGrid, DataGridTable, DataGridPagination, type PaginationState } from '@ttianqii/takaui';

export function AdvancedCourseDataGrid() {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('');

  useEffect(() => {
    fetchCourses();
  }, [pagination.page, pagination.limit, search, department]);

  const fetchCourses = async () => {
    const params = new URLSearchParams({
      page: String(pagination.page),
      limit: String(pagination.limit),
      ...(search && { search }),
      ...(department && { department })
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
    // Reset to page 1 when changing page size
    if (newPagination.limit !== pagination.limit) {
      setPagination({ ...newPagination, page: 1 });
    } else {
      setPagination(newPagination);
    }
  };

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPagination(prev => ({ ...prev, page: 1 })); // Reset to page 1
          }}
          className="border rounded px-3 py-2"
        />
        <select
          value={department}
          onChange={(e) => {
            setDepartment(e.target.value);
            setPagination(prev => ({ ...prev, page: 1 }));
          }}
          className="border rounded px-3 py-2"
        >
          <option value="">All Departments</option>
          <option value="CS">Computer Science</option>
          <option value="MATH">Mathematics</option>
          <option value="PHY">Physics</option>
        </select>
      </div>

      {/* DataGrid */}
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
    </div>
  );
}
```

## Key Points

1. **Always set `recordCount`**: Pass total records from server
2. **Reset page on filter changes**: Go to page 1 when search/filter changes
3. **Handle loading states**: Show loading indicator during fetch
4. **Debounce search**: Avoid excessive API calls (use `useDebouncedValue` hook)
5. **Error handling**: Gracefully handle API errors

## Installation

```bash
npm install @ttianqii/takaui@0.2.0
```

## More Examples

See the full documentation: [DATAGRID_CONTROLLED_PAGINATION.md](./DATAGRID_CONTROLLED_PAGINATION.md)
