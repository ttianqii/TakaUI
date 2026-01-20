# Release Notes - TakaUI v0.1.8

**Released:** January 20, 2026

## 🎉 What's New

### Advanced DataTable Pagination

We're excited to announce a major enhancement to the DataTable component with advanced pagination features!

#### ✨ New Features

**1. Dynamic Page Size Selection**
- Users can now select how many rows to display per page
- Customizable options via `pageSizeOptions` prop
- Default options: 5, 10, 20, 50 rows per page
- Visual dropdown selector integrated into pagination UI

**2. Pagination State Callback**
- New `onPaginationChange` prop for real-time pagination updates
- Perfect for server-side pagination and API integration
- Returns comprehensive state: `{ page, limit, total, totalPages }`
- Enables synchronization with URL parameters, analytics, etc.

**3. Enhanced TypeScript Support**
- New `PaginationState` interface exported
- Full type safety for pagination callbacks
- Better IntelliSense support

#### 🎯 Use Cases

This update is perfect for:
- **Server-side pagination** - Fetch data from APIs based on page/limit
- **Large datasets** - Let users control how much data they see
- **URL synchronization** - Keep pagination state in query parameters
- **Analytics tracking** - Monitor how users interact with your tables
- **Performance optimization** - Load only what's needed

## 📦 Installation

```bash
npm install @ttianqii/takaui@latest
# or
yarn add @ttianqii/takaui@latest
# or
pnpm add @ttianqii/takaui@latest
```

## 🚀 Quick Start

### Basic Usage

```tsx
import { DataTable } from '@ttianqii/takaui';

<DataTable
  data={products}
  columns={columns}
  pageSize={10}
  pageSizeOptions={[5, 10, 20, 50, 100]}
/>
```

### With API Integration

```tsx
import { DataTable, PaginationState } from '@ttianqii/takaui';

function ProductTable() {
  const [products, setProducts] = useState([]);

  const handlePaginationChange = (pagination: PaginationState) => {
    // pagination = { page: 1, limit: 10, total: 100, totalPages: 10 }
    
    fetch(`/api/products?page=${pagination.page}&limit=${pagination.limit}`)
      .then(res => res.json())
      .then(data => setProducts(data));
  };

  return (
    <DataTable
      data={products}
      columns={columns}
      pageSize={10}
      pageSizeOptions={[5, 10, 20, 50]}
      onPaginationChange={handlePaginationChange}
    />
  );
}
```

## 📚 Documentation

- **[Complete Pagination Guide](./DATATABLE_PAGINATION.md)** - In-depth guide with examples
- **[Components Reference](./COMPONENTS.md)** - Updated with new props
- **[README](./README.md)** - Quick overview and examples

## 🔧 API Changes

### New Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `pageSizeOptions` | `number[]` | `[5, 10, 20, 50]` | Available page size options |
| `onPaginationChange` | `(state: PaginationState) => void` | `undefined` | Callback when pagination changes |

### New Exports

```tsx
import { PaginationState } from '@ttianqii/takaui';

interface PaginationState {
  page: number;        // Current page (1-indexed)
  limit: number;       // Rows per page
  total: number;       // Total rows (after filtering)
  totalPages: number;  // Total number of pages
}
```

## 🐛 Bug Fixes

- Fixed infinite loop in pagination useEffect
- Fixed "Maximum update depth exceeded" error
- Optimized dependency arrays for better performance

## 💡 Migration Guide

### From v0.1.7 to v0.1.8

No breaking changes! All existing code will continue to work.

**Optional Enhancements:**

```tsx
// Before (v0.1.7) - Still works!
<DataTable
  data={data}
  columns={columns}
  pageSize={10}
/>

// After (v0.1.8) - Enhanced with new features
<DataTable
  data={data}
  columns={columns}
  pageSize={10}
  pageSizeOptions={[5, 10, 20, 50]}
  onPaginationChange={(pagination) => {
    // Do something with pagination state
  }}
/>
```

## 🎨 UI Improvements

- Responsive pagination layout (stacks on mobile)
- Page size selector positioned on the left
- Improved spacing and alignment
- Better visual hierarchy

## ⚡ Performance

- Optimized useEffect dependencies
- Prevented unnecessary re-renders
- Better callback handling

## 🙏 Acknowledgments

Thank you to our users for the feedback that made this release possible!

## 📝 Full Changelog

See [CHANGELOG.md](./CHANGELOG.md) for complete version history.

## 🔗 Links

- **npm:** https://www.npmjs.com/package/@ttianqii/takaui
- **GitHub:** https://github.com/ttianqii/takaui
- **Documentation:** [DATATABLE_PAGINATION.md](./DATATABLE_PAGINATION.md)

---

**Questions or issues?** Please open an issue on [GitHub](https://github.com/ttianqii/takaui/issues).
