# TakaUI DataGrid Server-Side Pagination Enhancement

## Problem Statement

The current TakaUI DataGrid component has issues with server-side pagination when handling loading states and empty states. Specifically:

1. **Empty State During Loading**: When switching pages, the DataGrid shows "No result found" even when `loading=true` and data is being fetched
2. **Loading State Conflicts**: The loading overlay doesn't prevent the empty state from appearing
3. **Server-Side Pagination UX**: Users see confusing empty states during normal pagination operations

## Current Behavior

```tsx
<DataGrid<Course>
  data={courses}           // Empty array during fetch
  loading={true}           // Loading is true
  manualPagination={true}  // Server-side pagination
  // ... other props
>
  <DataGridTable />
  <DataGridPagination />
</DataGrid>

// Shows: "No result found" instead of loading indicator
```

## Required Changes

### 1. Enhanced Empty State Logic

**File**: `TakaUI/src/components/DataGrid.tsx`

**Current Approach**:
- The DataGrid component doesn't currently handle loading states
- Empty state is shown in DataGridTable when data array is empty
- No distinction between loading and truly empty data

**Required Enhancement**:
Add `loading` prop to DataGridProps and pass it through context:

```tsx
export interface DataGridProps<T = any> {
  // ... existing props
  loading?: boolean;  // Add this
  emptyMessage?: string; // Custom empty message
}
```

Update DataGridContextValue to include loading state:

```tsx
interface DataGridContextValue<T = any> {
  // ... existing properties
  loading: boolean;
  emptyMessage: string;
}
```

### 2. DataGridTable Component Updates

**File**: `TakaUI/src/components/DataGridTable.tsx`

Add loading indicator and respect empty state logic:

```tsx
export function DataGridTable() {
  const { paginatedData, loading, emptyMessage } = useDataGrid();

  // Show loading state
  if (loading && paginatedData.length === 0) {
    return (
      <div className="data-grid-loading">
        <div className="loading-spinner" />
        <span className="loading-text">Loading data...</span>
      </div>
    );
  }

  // Show empty state only when not loading
  if (!loading && paginatedData.length === 0) {
    return (
      <div className="data-grid-empty">
        <div className="empty-icon">📊</div>
        <div className="empty-message">{emptyMessage}</div>
      </div>
    );
  }

  // Render table with data
  return (
    <table className="data-grid-table">
      {/* ... existing table implementation */}
    </table>
  );
}
```

### 3. DataGridPagination Component Updates

**File**: `TakaUI/src/components/DataGridPagination.tsx`

Add loading state support to disable pagination controls during data fetching:

```tsx
export function DataGridPagination() {
  const { 
    loading,
    canPreviousPage,
    canNextPage,
    previousPage,
    nextPage,
    // ... other context values
  } = useDataGrid();

  return (
    <div className="pagination-container">
      <button
        onClick={previousPage}
        disabled={!canPreviousPage || loading}
        className={loading ? "pagination-button loading" : "pagination-button"}
      >
        Previous
      </button>

      {/* Page numbers */}
      {/* ... existing page number implementation ... */}

      <button
        onClick={nextPage}
        disabled={!canNextPage || loading}
        className={loading ? "pagination-button loading" : "pagination-button"}
      >
        Next
      </button>
    </div>
  );
}
```

### 4. Server-Side Pagination Support

**File**: `TakaUI/src/components/DataGrid.tsx`

The current implementation already supports controlled pagination through `currentPage` and `pageSize` props. To improve server-side pagination, add:

1. **Manual pagination flag**: Disable client-side data slicing when using server-side pagination
2. **Loading state**: Pass loading state through context

```tsx
export interface DataGridProps<T = any> {
  // ... existing props
  loading?: boolean;
  emptyMessage?: string;
  manualPagination?: boolean; // Add this flag
}

export function DataGrid<T>({
  columns,
  data,
  // ... existing props
  loading = false,
  emptyMessage = 'No data found',
  manualPagination = false, // Server-side pagination mode
}: DataGridProps<T>) {
  // ... existing state and logic

  // Pagination logic - skip slicing for server-side pagination
  const paginatedData = useMemo(() => {
    if (manualPagination) {
      // For server-side pagination, data is already paginated
      return data;
    }
    // For client-side pagination, slice the data
    const start = pageIndex * pageSize;
    const end = start + pageSize;
    return sortedData.slice(start, end);
  }, [manualPagination, data, sortedData, pageIndex, pageSize]);

  // Update context value to include loading state
  const value: DataGridContextValue<T> = {
    // ... existing values
    loading,
    emptyMessage,
    manualPagination,
  };

  // ... rest of component
}
```

### 5. Debounced Page Size Changes

**Implementation**: Handle debouncing at the parent component level in your application code.

The DataGrid component already notifies pagination changes through `onPaginationChange`. For server-side pagination, implement debouncing in your parent component:

```tsx
// In your CoursesTable or parent component
const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

const handlePaginationChange = (pagination: PaginationState) => {
  // Handle page changes immediately
  if (pagination.page !== page) {
    onPageChange(pagination.page);
  }

  // Debounce page size (limit) changes
  if (pagination.limit !== limit) {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    
    debounceTimerRef.current = setTimeout(() => {
      onLimitChange(pagination.limit);
    }, 300); // 300ms debounce
  }
};

// Cleanup on unmount
useEffect(() => {
  return () => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
  };
}, []);
```

### 6. CSS Styles for Loading and Empty States

**File**: `TakaUI/src/components/DataGrid.css` (or add to your existing styles)

Add CSS for loading and empty states:

```css
/* Loading State */
.data-grid-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  min-height: 200px;
  color: var(--text-secondary, #6b7280);
}

.loading-spinner {
  width: 2.5rem;
  height: 2.5rem;
  border: 3px solid rgba(59, 130, 246, 0.1);
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin-bottom: 0.75rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-text {
  font-size: 0.875rem;
  font-weight: 500;
}

/* Empty State */
.data-grid-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  min-height: 200px;
  color: var(--text-secondary, #6b7280);
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.4;
}

.empty-message {
  font-size: 0.875rem;
  text-align: center;
  color: var(--text-muted, #9ca3af);
}

/* Disabled/Loading Pagination Buttons */
.pagination-button.loading,
.page-button.loading {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Optional: Add a subtle loading indicator to pagination */
.pagination-container.loading {
  pointer-events: none;
  opacity: 0.7;
}
```

### 7. Usage Example with Server-Side Pagination

Update your CoursesTable or similar components to use the enhanced DataGrid:

```tsx
import { DataGrid, DataGridTable, DataGridPagination } from '@ttianqii/takaui';

function CoursesTable() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalCourses, setTotalCourses] = useState(0);
  
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch data whenever page or limit changes
  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/courses?page=${page}&limit=${limit}`);
        setCourses(response.data.courses);
        setTotalCourses(response.data.total);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [page, limit]);

  const handlePaginationChange = (pagination: PaginationState) => {
    // Handle page change immediately
    if (pagination.page !== page) {
      setPage(pagination.page);
    }

    // Debounce limit changes to avoid excessive API calls
    if (pagination.limit !== limit) {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      
      debounceTimerRef.current = setTimeout(() => {
        setLimit(pagination.limit);
        setPage(1); // Reset to first page when changing limit
      }, 300);
    }
  };

  // Cleanup debounce timer
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  return (
    <DataGrid
      columns={courseColumns}
      data={courses}
      loading={loading}
      manualPagination={true}
      currentPage={page}
      pageSize={limit}
      recordCount={totalCourses}
      onPaginationChange={handlePaginationChange}
      emptyMessage="No courses found"
    >
      <DataGridTable />
      <DataGridPagination />
    </DataGrid>
  );
}
```

## Implementation Checklist

### DataGrid Component (`TakaUI/src/components/DataGrid.tsx`)
- [ ] Add `loading?: boolean` prop to DataGridProps
- [ ] Add `emptyMessage?: string` prop to DataGridProps
- [ ] Add `manualPagination?: boolean` prop to DataGridProps
- [ ] Update DataGridContextValue interface to include these new props
- [ ] Modify paginatedData logic to skip slicing when manualPagination is true
- [ ] Pass loading, emptyMessage, and manualPagination through context

### DataGridTable Component (`TakaUI/src/components/DataGridTable.tsx`)
- [ ] Access loading and emptyMessage from context via useDataGrid()
- [ ] Add loading state check: if loading and no data, show loading indicator
- [ ] Add empty state check: if not loading and no data, show empty message
- [ ] Add CSS classes for loading-spinner and empty states

### DataGridPagination Component (`TakaUI/src/components/DataGridPagination.tsx`)
- [ ] Access loading from context via useDataGrid()
- [ ] Disable pagination buttons when loading is true
- [ ] Add loading class to buttons when loading

### Styling
- [ ] Add CSS for .data-grid-loading, .loading-spinner, .loading-text
- [ ] Add CSS for .data-grid-empty, .empty-icon, .empty-message
- [ ] Add CSS for .pagination-button.loading and disabled states

### Application Usage (e.g., CoursesTable.tsx in web/)
- [ ] Add loading state to parent component
- [ ] Pass loading prop to DataGrid
- [ ] Add manualPagination={true} for server-side pagination
- [ ] Implement debounced limit changes in handlePaginationChange
- [ ] Clean up debounce timers on unmount

## Benefits

1. **No More Empty States During Loading**: Users won't see "No result found" when switching pages - they'll see a loading indicator instead
2. **Better UX**: Clear visual feedback during data fetching with loading spinners
3. **Server-Side Pagination Support**: Full support for server-side pagination with `manualPagination` flag
4. **Debounced Limit Changes**: Prevents excessive API calls when user adjusts page size
5. **Customizable Messages**: Custom empty state messages via `emptyMessage` prop
6. **Backward Compatible**: Existing implementations continue to work without changes (all new props are optional)
7. **Disabled State Management**: Pagination controls are automatically disabled during loading

## Project Structure Reference

```
TakaUI/
  src/
    components/
      DataGrid.tsx              ← Main DataGrid component (add loading, manualPagination props)
      DataGridTable.tsx         ← Table renderer (add loading/empty state logic)
      DataGridPagination.tsx    ← Pagination controls (disable during loading)
      DataGrid.css              ← Styles (add loading/empty state styles)

web/
  src/
    components/
      CoursesTable.tsx          ← Example usage (implement debounced pagination)
      UsersTable.tsx
      DepartmentsTable.tsx
      ... other tables
```

## Testing Checklist

Add tests to verify:
- [ ] Loading state displays correctly when data is empty and loading=true
- [ ] Empty state displays correctly when data is empty and loading=false
- [ ] Table renders data when loading=false and data exists
- [ ] Pagination buttons are disabled during loading
- [ ] Server-side pagination doesn't slice data (manualPagination=true)
- [ ] Client-side pagination still works correctly (manualPagination=false or undefined)
- [ ] Page changes trigger immediate callbacks
- [ ] Limit changes are debounced (300ms delay)
- [ ] Custom empty messages display correctly
- [ ] Debounce timers are cleaned up on unmount

## Quick Start

To implement this enhancement:

1. **Update TakaUI DataGrid Component**: Add the new props and context values
2. **Update DataGridTable**: Add loading/empty state rendering logic
3. **Update DataGridPagination**: Add loading state to disable controls
4. **Add Styles**: Include CSS for loading spinner and empty states
5. **Update Your Tables**: Pass `loading` and `manualPagination` props to DataGrid

Example minimal change to your existing CoursesTable:

```tsx
<DataGrid
  columns={columns}
  data={courses}
  loading={loading}              // ← Add this
  manualPagination={true}        // ← Add this
  currentPage={page}
  pageSize={limit}
  recordCount={totalCourses}
  onPaginationChange={handlePaginationChange}
>
  <DataGridTable />
  <DataGridPagination />
</DataGrid>
```