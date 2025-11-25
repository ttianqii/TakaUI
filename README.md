# TakaUI

A modern, customizable React UI component library built with TypeScript, Tailwind CSS, and Radix UI primitives.

## 📦 Installation

```bash
# npm
npm install @ttianqii/takaui

# yarn
yarn add @ttianqii/takaui

# pnpm
pnpm add @ttianqii/takaui

# bun
bun add @ttianqii/takaui
```

### Peer Dependencies

TakaUI requires React 18+ or React 19+:

```bash
# npm
npm install react react-dom

# yarn
yarn add react react-dom

# pnpm
pnpm add react react-dom

# bun
bun add react react-dom
```

### Tailwind CSS Setup

TakaUI uses Tailwind CSS for styling. Add the TakaUI paths to your `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@ttianqii/takaui/dist/**/*.{js,mjs,cjs}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### Import Styles

Import the TakaUI styles in your main entry file (e.g., `main.tsx` or `App.tsx`):

```tsx
import '@ttianqii/takaui/styles.css'
```

## 🚀 Quick Start

```tsx
import { Calendar, TimePicker, DataTable } from '@ttianqii/takaui'
import '@ttianqii/takaui/styles.css'
import { useState } from 'react'

function App() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  
  return (
    <div>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
      />
    </div>
  )
}
```

## 📚 Components

TakaUI includes the following components:

### Form & Input Components

- **[Calendar](./docs/CALENDAR.md)** - Flexible date picker with multiple selection modes
- **[DatePicker](./docs/DATEPICKER.md)** - Date picker with popover and custom formatting
- **[TimePicker](./docs/TIMEPICKER.md)** - Time picker with 12h/24h formats and timezone support
- **[DropdownMenu](./docs/DROPDOWN.md)** - Accessible dropdown menu component

### Data Display Components

- **[DataTable](./docs/DATATABLE.md)** - Powerful table with sorting, filtering, and pagination
  - **NEW:** [Modular Structure](./docs/DATATABLE_MODULAR.md) - Composable DataTable components
  - [Installation Guide](./DATATABLE_INSTALL.md) - How to install and use
  - [Quick Reference](./DATATABLE_QUICKREF.md) - Cheat sheet for common patterns
  - [Architecture](./DATATABLE_ARCHITECTURE.md) - Component design and data flow
- **[Schedule](./docs/SCHEDULE.md)** - Weekly schedule component with custom fields
- **[WeekNavigator](./docs/WEEKNAVIGATOR.md)** - Week navigation with date range display

### Base UI Components

All components are built on top of shadcn/ui primitives:

- Button
- Input
- Label
- Select
- Popover
- Dialog/Modal
- Checkbox
- Card

## 📖 Documentation

Detailed documentation for each component:

- [Calendar Documentation](./docs/CALENDAR.md)
- [DatePicker Documentation](./docs/DATEPICKER.md)
- [TimePicker Documentation](./docs/TIMEPICKER.md)
- [DataTable Documentation](./docs/DATATABLE.md)
- [Schedule Documentation](./docs/SCHEDULE.md)
- [WeekNavigator Documentation](./docs/WEEKNAVIGATOR.md)
- [DropdownMenu Documentation](./docs/DROPDOWN.md)

## 🎨 Customization

### Styling with Tailwind

All components accept a `className` prop for custom styling:

```tsx
<Calendar 
  className="rounded-lg shadow-lg border-2 border-blue-500"
  mode="single"
  selected={date}
  onSelect={setDate}
/>
```

### Theming

TakaUI components use CSS variables for theming. You can customize colors in your global CSS:

```css
:root {
  --primary: 220 90% 56%;
  --primary-foreground: 0 0% 100%;
  --destructive: 0 84% 60%;
  /* Add more custom variables */
}
```

## 🔧 TypeScript Support

TakaUI is built with TypeScript and includes full type definitions. All props are fully typed for excellent IDE support.

```tsx
import type { CalendarProps, DatePickerProps } from '@ttianqii/takaui'
```

## 📦 Tree Shaking

TakaUI supports tree shaking. Import only the components you need:

```tsx
// Good - Only imports Calendar
import { Calendar } from '@ttianqii/takaui'

// Also works - Named imports
import { Calendar, TimePicker, DataTable } from '@ttianqii/takaui'
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT

## 🔗 Links

- [GitHub Repository](https://github.com/ttianqii/takaui)
- [npm Package](https://www.npmjs.com/package/@ttianqii/takaui)

## 📞 Support

For issues and questions:

- Open an issue on [GitHub](https://github.com/ttianqii/takaui/issues)
- Check the [documentation](./docs/)

## 🎯 Roadmap

- [ ] Additional form components (Switch, Radio, Slider)
- [ ] Chart components
- [ ] Toast notifications
- [ ] Command palette
- [ ] Theme switcher
- [ ] More data display components

---

Made with ❤️ by [@ttianqii](https://github.com/ttianqii)
