# TakaUI v0.0.6 Release Notes

**Release Date:** November 26, 2025

## 🎉 What's New

### DatePicker Range Selection
The DatePicker component now supports range selection mode, allowing users to select a date range instead of just a single date.

**Features:**
- 📅 Range mode with `mode="range"` prop
- 🔢 Display 1 or 2 months side-by-side with `numberOfMonths`
- 🎨 Beautiful hover states with visual feedback
- 🎯 Smart rounded corners that connect range backgrounds
- 📱 Responsive and accessible

**Example:**
```tsx
import { DatePicker } from '@ttianqii/takaui'

function App() {
  const [dateRange, setDateRange] = useState<{ from: Date; to?: Date }>()
  
  return (
    <DatePicker
      mode="range"
      dateRange={dateRange}
      onDateRangeChange={setDateRange}
      numberOfMonths={2}
    />
  )
}
```

### DataGrid Component System
New modular table components for building complex table layouts with full control over composition.

**Components:**
- `DataGrid` - Root component with context
- `DataGridTable` - Renders the table
- `DataGridPagination` - Pagination UI
- `DataGridColumnHeader` - Sortable column headers
- `DataGridRowSelect` - Row selection checkboxes

**Benefits:**
- ✅ Modular and composable
- ✅ Full control over layout
- ✅ Easy to customize
- ✅ Built-in state management

### Schedule Component Enhancements
The Schedule component now supports `Date` type in custom metadata fields, making it easier to work with date-based event properties.

**Before:**
```tsx
// Had to convert dates to strings
const event = {
  id: '1',
  title: 'Meeting',
  deadline: '2025-11-26' // String
}
```

**After:**
```tsx
// Now supports Date objects directly
const event = {
  id: '1',
  title: 'Meeting',
  deadline: new Date(2025, 10, 26) // Date object
}
```

## 🎨 Improvements

### Enhanced Hover States
- Selected dates in range mode now use `gray-500` on hover (improved from `gray-700`)
- In-range dates use `gray-200` hover for better visibility
- No more white-on-white hover issues

### Better Code Previews
- Improved syntax highlighting in documentation
- Consistent indentation with Tailwind utility classes
- Better line spacing for readability

### Bug Fixes
- ✅ Fixed DataGrid text alignment (no longer auto-centers incorrectly)
- ✅ Fixed TypeScript compilation errors in example files
- ✅ Build configuration properly excludes example files
- ✅ Schedule component type definitions improved

## 📚 Documentation Updates

### New Documentation
- Comprehensive DatePicker range selection examples
- DataGrid component usage guide
- Updated README with v0.0.6 features

### Enhanced Documentation
- Added npm version and download badges
- "What's New" section in README
- Updated component feature lists with visual indicators
- Better examples throughout

## 🔧 Technical Details

### Package Information
- **Version:** 0.0.6
- **Bundle Size:** 176.6 kB (unpacked: 719.2 kB)
- **CSS:** 41.80 kB (gzipped: 7.30 kB)
- **ESM:** 415.24 kB (gzipped: 94.14 kB)
- **CJS:** 253.01 kB (gzipped: 71.78 kB)

### Breaking Changes
None! This release is fully backward compatible with v0.0.4 and v0.0.5.

## 📦 Installation

```bash
npm install @ttianqii/takaui@latest
```

Or update your package.json:
```json
{
  "dependencies": {
    "@ttianqii/takaui": "^0.0.6"
  }
}
```

## 🔗 Links

- [npm Package](https://www.npmjs.com/package/@ttianqii/takaui)
- [GitHub Repository](https://github.com/ttianqii/takaui)
- [Full Changelog](./CHANGELOG.md)
- [Documentation](./docs/)

## 🙏 Thank You

Thank you for using TakaUI! We're continuously working to improve the library and add new features.

If you encounter any issues or have suggestions, please [open an issue](https://github.com/ttianqii/takaui/issues) on GitHub.

---

**Next Up:** More components, enhanced accessibility, and improved theming options!
