# Changelog

All notable changes to TakaUI will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.3] - 2026-01-28

### Fixed
- **DataGrid Generic Type Constraint Removed** (Critical Flexibility Fix)
  - Removed overly restrictive `extends Record<string, unknown>` constraint from DataGrid
  - Changed default type parameter from `Record<string, unknown>` to `any` for maximum flexibility
  - Users no longer need to add `[key: string]: unknown` index signatures to their interfaces
  - Now works like @tanstack/react-table, ag-grid, and MUI DataGrid (no type constraints)
  - **Impact**: Clean interfaces work without modification - just use `DataGrid<YourType>`

## [0.2.2] - 2026-01-28

### Fixed
- **DataGrid TypeScript Generic Type Support** (Critical Bug Fix)
  - Fixed context provider type casting that prevented proper generic type inference
  - `DataGrid<T>` now correctly propagates types to all child components and callbacks
  - Resolves build errors when using custom types with DataGridColumn
  - Full TypeScript IntelliSense support for row data in cell renderers, `getRowId`, and `onRowClick`
  - **Impact**: No more `Type 'T[]' is not assignable to 'Record<string, unknown>[]'` errors

## [0.2.1] - 2026-01-20

### Fixed
- **DataTable & DataGrid**: Page size now defaults to first value in `pageSizeOptions` array
  - If `pageSizeOptions={[10, 20, 50]}`, default is now 10 (not hardcoded 5)
  - If `pageSizeOptions={[5, 10, 20]}`, default is 5
  - Flexible and intuitive behavior
- **DataGridPagination**: Removed duplicate useEffect code

### Changed
- **DataTable**: `pageSize` prop now optional, defaults to `pageSizeOptions[0] ?? 10`
- **DataGrid**: Initial page size syncs with `DataGridPagination` options

## [0.2.0] - 2026-01-21

### Added
- **DataGrid Controlled Pagination**: Full server-side pagination support
  - `currentPage` prop - Control current page externally (1-indexed)
  - `pageSize` prop - Control page size externally
  - `onPaginationChange` callback - Get notified of pagination changes
  - `PaginationState` interface - Exported for TypeScript support
  - **Backward Compatible**: Works in both controlled and uncontrolled modes
  - **New Documentation**: [DataGrid Controlled Pagination Guide](./DATAGRID_CONTROLLED_PAGINATION.md)
    - Complete examples for controlled and uncontrolled modes
    - Server-side pagination with Express + Prisma
    - Migration guide and best practices
    - TypeScript usage examples

### Changed
- DataGrid internal state management - Now supports external control
- DataGrid pagination logic - Unified controlled/uncontrolled pattern
- Component exports - Added `PaginationState` to public exports

## [0.1.9] - 2026-01-20

### Added
- **DataTable Search Callback**: `onSearchChange` prop for server-side search
- **DataTable Sort Callback**: `onSortChange` prop for server-side sorting
- **Complete Server-Side Support**: Full API integration with pagination, search, and sort
- **New Documentation**: SERVER_SIDE_EXAMPLE.md with Express + Prisma examples

### Fixed
- Corrected handleSort function implementation

## [0.1.8] - 2026-01-20

### Added
- **DataTable Advanced Pagination**: Dynamic page size selection
  - `pageSizeOptions` prop - Define available page sizes (default: [5, 10, 20, 50])
  - `onPaginationChange` callback - Get pagination state for API calls
  - `PaginationState` interface - TypeScript support for pagination state
  - Visual page size selector in UI (dropdown)
  - Auto-reset to page 1 when page size changes
- **Pagination State Callback**: Perfect for server-side pagination
  - Returns `{ page, limit, total, totalPages }`
  - Enables real-time API synchronization
  - Support for URL query parameter sync
- **New Documentation**: [Pagination Guide](./DATATABLE_PAGINATION.md)
  - Comprehensive examples and API reference
  - Server-side pagination patterns
  - Best practices and migration guide

### Changed
- DataTable pagination layout - Now responsive (flex-col on mobile, flex-row on desktop)
- Pagination controls - Enhanced layout with page size selector on left

### Fixed
- Infinite loop in DataTable pagination useEffect
- Maximum update depth exceeded error when using onPaginationChange
- Dependency array optimization (removed onPaginationChange from deps)

### Documentation
- Added DATATABLE_PAGINATION.md with complete pagination guide
- Updated README with "What's New in v0.1.8" section
- Added TablePage example demonstrating pagination callback
- Enhanced code examples with TypeScript types

## [0.0.6] - 2025-11-26

### Added
- **DatePicker Range Selection**: New `mode="range"` prop for selecting date ranges
  - Support for 1 or 2 month views via `numberOfMonths` prop
  - Visual range selection with hover states
  - Smart rounded corners for range backgrounds (Sunday left, Saturday right)
- **DataGrid Component System**: New modular table components
  - `DataGrid` - Root component with context provider
  - `DataGridTable` - Table rendering component
  - `DataGridPagination` - Pagination controls
  - `DataGridColumnHeader` - Column header with sorting
  - `DataGridRowSelect` - Row selection checkbox
  - Enables flexible table composition and layouts
- **Schedule Component**: Date type support in custom metadata fields
  - Can now use `Date` objects in flexible event metadata
  - Automatic date-to-string conversion for display

### Changed
- **DatePicker Hover States**: Improved visual feedback for range selection
  - Selected dates: `hover:bg-gray-500` (was `hover:bg-gray-700`)
  - In-range dates: `hover:bg-gray-200` for better visibility
- **Code Preview Formatting**: Enhanced syntax highlighting in documentation examples
  - Better spacing with `lineHeight: 1.6`
  - Consistent Tailwind class indentation
- Updated README with v0.0.6 features and badges
- Enhanced DatePicker documentation with range examples

### Fixed
- DataGrid text alignment issue (content no longer auto-centered incorrectly)
- TypeScript compilation errors in example files
- Build configuration to exclude example files from library bundle
- Schedule component type definitions for flexible metadata

### Documentation
- Added comprehensive DatePicker range selection examples
- Updated README with "What's New in 0.0.6" section
- Enhanced component feature lists with visual indicators
- Added npm badges to README

## [0.0.5] - 2025-11-25

### Changed
- Internal version update
- Build system improvements

## [0.0.4] - 2025-11-20

### Added
- Comprehensive documentation for all components in `/docs` folder
- Individual component documentation files:
  - CALENDAR.md
  - DATEPICKER.md
  - TIMEPICKER.md
  - DATATABLE.md
  - SCHEDULE.md
  - WEEKNAVIGATOR.md
  - DROPDOWN.md
- TimePicker timezone utility functions extracted to `timeUtils.ts`
- Type safety improvements across all components

### Changed
- **BREAKING**: TimePicker timezone prop is now for programmatic use only (no UI selector)
- Removed timezone selector dropdown from TimePicker component
- Timezone is now set via code for backend integration
- Updated README.md with complete library overview
- Improved type definitions for Schedule component custom fields
- Better TypeScript support with stricter type checking

### Fixed
- Fixed React cascading render issues in TimePicker
- Resolved Fast Refresh warnings for utility exports
- Fixed `any` type usage in Schedule component
- Removed literal `\n` character appearing in TimePicker UI
- All ESLint and TypeScript errors resolved

### Documentation
- Complete API documentation for all components
- Usage examples for each component
- TypeScript integration guides
- Customization examples
- Accessibility information
- Related component links

## [0.0.3] - Previous Release

### Initial Features
- Calendar component with single/multiple/range selection
- DatePicker with popover
- TimePicker with 12h/24h formats
- DataTable with sorting, filtering, pagination
- Schedule component with custom fields
- WeekNavigator component
- DropdownMenu component
- Base UI components (Button, Input, Label, etc.)

---

For more details, see the [GitHub repository](https://github.com/ttianqii/takaui).
