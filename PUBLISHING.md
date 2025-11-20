# Publishing Checklist for v0.0.4

## Pre-Publish Checklist

- [x] Version bumped to 0.0.4 in `package.json`
- [x] All TypeScript errors fixed
- [x] All ESLint errors fixed (DataTable React Compiler warning is informational only)
- [x] README.md updated with complete documentation
- [x] Component documentation created in `/docs` folder
  - [x] CALENDAR.md
  - [x] DATEPICKER.md
  - [x] TIMEPICKER.md
  - [x] DATATABLE.md
  - [x] SCHEDULE.md
  - [x] WEEKNAVIGATOR.md
  - [x] DROPDOWN.md
- [x] CHANGELOG.md created
- [x] TimePicker React errors fixed
- [x] Schedule component type safety improved
- [x] Utility functions extracted to separate file

## Publishing Steps

### 1. Build the Package

```bash
npm run build
```

This will:
- Compile TypeScript
- Bundle with Vite
- Generate type definitions
- Output to `/dist` folder

### 2. Test the Build

```bash
npm run preview
```

Verify all components work correctly in the preview.

### 3. Login to npm (if not already logged in)

```bash
npm login
```

### 4. Publish to npm

```bash
npm publish
```

The `prepublishOnly` script will automatically run the build before publishing.

### 5. Verify Publication

Check the package at: https://www.npmjs.com/package/@ttianqii/takaui

### 6. Create Git Tag

```bash
git add .
git commit -m "Release v0.0.4 - Complete documentation and bug fixes"
git tag v0.0.4
git push origin main --tags
```

## Post-Publish

- [ ] Verify package installation works: `npm install @ttianqii/takaui@0.0.4`
- [ ] Test in a new project
- [ ] Update GitHub repository description
- [ ] Share release notes

## Package Contents

The published package includes:

```
dist/
  ├── takaui.js        # ES module
  ├── takaui.cjs       # CommonJS module
  ├── takaui.css       # Styles
  ├── index.d.ts       # Type definitions
  └── ...              # Component types and assets
```

## Version 0.0.4 Highlights

### New Features
- Complete component documentation
- TimePicker timezone support for backend integration
- Improved type safety across all components

### Bug Fixes
- Fixed React cascading render issues
- Resolved Fast Refresh warnings
- Fixed TypeScript any types
- UI rendering fixes

### Breaking Changes
- TimePicker timezone prop is now programmatic only (no dropdown UI)

## Support

For issues: https://github.com/ttianqii/takaui/issues
For npm: https://www.npmjs.com/package/@ttianqii/takaui
