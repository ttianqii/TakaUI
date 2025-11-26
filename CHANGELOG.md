# Changelog

All notable changes to TakaUI will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
