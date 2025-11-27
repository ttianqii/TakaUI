# CSS Compatibility Guide

## Problem Solved in v0.0.71

TakaUI v0.0.71+ has been updated to **not affect your existing website styles**. The library no longer includes global CSS resets that could break your other components.

## What Changed

### Before (v0.0.7 and earlier)
- Used `@tailwind base` which applied global CSS resets
- Could break existing styles on your website

### After (v0.0.71+)
- Removed global base styles
- All TakaUI components use scoped styles with `data-takaui` attributes
- **Your existing website styles remain untouched**

## Installation

```bash
npm install @ttianqii/takaui@latest
```

## Usage

Just import and use as normal - no special configuration needed:

```tsx
import { DatePicker } from '@ttianqii/takaui'
import '@ttianqii/takaui/styles.css'

function App() {
  const [date, setDate] = useState<Date | undefined>()
  
  return (
    <div>
      {/* Your existing components - they won't be affected */}
      <YourExistingComponent />
      
      {/* TakaUI components work perfectly alongside your code */}
      <DatePicker
        date={date}
        onDateChange={setDate}
      />
    </div>
  )
}
```

## Benefits

✅ **No CSS Conflicts** - TakaUI styles are scoped and won't affect your existing components  
✅ **No Global Resets** - Your website's default styles remain unchanged  
✅ **Safe to Use** - Can be added to any existing project without breaking things  
✅ **Smaller Bundle** - CSS file is now ~37KB instead of ~42KB  

## Migration from v0.0.7 to v0.0.71+

If you were using v0.0.7 and had CSS conflicts:

1. Update to the latest version:
```bash
npm install @ttianqii/takaui@latest
```

2. That's it! Your components will now work without conflicts.

## Technical Details

- All TakaUI components now include `data-takaui` attributes
- CSS rules are scoped to `[data-takaui]` selectors
- Only Tailwind's `@components` and `@utilities` are included (not `@base`)
- Minimal necessary resets are scoped to TakaUI elements only

## Still Having Issues?

If you still see CSS conflicts after updating to v0.0.71+, please:

1. Clear your node_modules and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

2. Make sure you're importing the correct CSS:
```tsx
import '@ttianqii/takaui/styles.css'  // ✅ Correct
```

3. Verify the version:
```bash
npm list @ttianqii/takaui
```

Should show `0.0.71` or higher.
