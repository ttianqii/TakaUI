# DataTable Component

A fully independent, feature-rich data table component with **zero external dependencies** (except icons).

## Features

✅ **No TanStack Required** - Completely independent implementation  
✅ **Sorting** - Click column headers to sort  
✅ **Pagination** - Built-in pagination with customizable page sizes  
✅ **Search/Filter** - Global search across all columns  
✅ **Custom Cells** - Render custom content in cells  
✅ **Loading States** - Skeleton loading animation  
✅ **Responsive** - Works on all screen sizes  
✅ **TypeScript** - Full type safety  

## Installation

```bash
npm install takaui
```

## Basic Usage

```tsx
import { DataTable } from 'takaui';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const columns = [
  { 
    key: 'name', 
    header: 'Name',
    sortable: true 
  },
  { 
    key: 'email', 
    header: 'Email' 
  },
  { 
    key: 'role', 
    header: 'Role',
    cell: (value) => (
      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">
        {value}
      </span>
    )
  },
];

const users: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
];

function App() {
  return (
    <DataTable 
      data={users} 
      columns={columns}
      showSearch
      searchPlaceholder="Search users..."
      onRowClick={(user) => console.log('Clicked:', user)}
    />
  );
}
```

## API Reference

### DataTable Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `T[]` | **required** | Array of data objects |
| `columns` | `DataTableColumn<T>[]` | **required** | Column definitions |
| `showSearch` | `boolean` | `true` | Show search input |
| `searchPlaceholder` | `string` | `"Search..."` | Search input placeholder |
| `showPagination` | `boolean` | `true` | Enable pagination |
| `pageSize` | `number` | `10` | Initial page size |
| `pageSizeOptions` | `number[]` | `[5, 10, 20, 50]` | Page size options |
| `onRowClick` | `(row: T, index: number) => void` | - | Row click handler |
| `striped` | `boolean` | `false` | Zebra striping |
| `hoverable` | `boolean` | `true` | Hover effect on rows |
| `bordered` | `boolean` | `true` | Show borders |
| `compact` | `boolean` | `false` | Compact padding |
| `loading` | `boolean` | `false` | Show loading skeleton |
| `loadingRows` | `number` | `5` | Number of skeleton rows |
| `emptyMessage` | `string` | `"No results found."` | Empty state message |
| `variant` | `'default' \| 'clean'` | `'default'` | Visual variant |
| `renderToolbar` | `() => ReactNode` | - | Custom toolbar |

### Column Definition

```tsx
interface DataTableColumn<T> {
  key: string;                    // Data key
  header: string | ReactNode;     // Column header
  accessor?: (row: T) => unknown; // Custom accessor
  cell?: (value, row, index) => ReactNode; // Custom cell renderer
  sortable?: boolean;             // Enable sorting (default: true)
  width?: string;                 // Column width
  align?: 'left' | 'center' | 'right'; // Text alignment
}
```

## Examples

### With Custom Cell Rendering

```tsx
const columns = [
  {
    key: 'avatar',
    header: 'User',
    cell: (value, row) => (
      <div className="flex items-center gap-2">
        <img src={row.avatar} className="w-8 h-8 rounded-full" />
        <span>{row.name}</span>
      </div>
    ),
  },
  {
    key: 'status',
    header: 'Status',
    cell: (value) => {
      const colors = {
        active: 'bg-green-100 text-green-800',
        inactive: 'bg-gray-100 text-gray-800',
      };
      return (
        <span className={`px-2 py-1 rounded ${colors[value]}`}>
          {value}
        </span>
      );
    },
  },
];
```

### With Loading State

```tsx
const [loading, setLoading] = useState(true);
const [data, setData] = useState([]);

useEffect(() => {
  fetchData().then(result => {
    setData(result);
    setLoading(false);
  });
}, []);

<DataTable 
  data={data} 
  columns={columns}
  loading={loading}
  loadingRows={10}
/>
```

### With Custom Toolbar

```tsx
<DataTable
  data={users}
  columns={columns}
  renderToolbar={() => (
    <div className="flex gap-2">
      <button className="px-4 py-2 bg-blue-600 text-white rounded">
        Add User
      </button>
      <button className="px-4 py-2 border rounded">
        Export
      </button>
    </div>
  )}
/>
```

### Compact & Striped

```tsx
<DataTable
  data={users}
  columns={columns}
  compact
  striped
  bordered={false}
/>
```

## SimpleTable (Minimal Version)

For even simpler use cases, use `SimpleTable`:

```tsx
import { SimpleTable } from 'takaui';

<SimpleTable
  data={users}
  columns={columns}
  searchable
  pagination
/>
```

Same API as `DataTable` but with a cleaner name!
