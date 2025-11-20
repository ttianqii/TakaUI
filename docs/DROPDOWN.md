# DropdownMenu Component

An accessible dropdown menu component built on Radix UI primitives.

## Import

```tsx
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from '@ttianqii/takaui'
```

## Basic Usage

```tsx
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@ttianqii/takaui'
import { Button } from '@ttianqii/takaui'

function BasicDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Open Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

## Components

### DropdownMenu (Root)

The root component that manages state.

### DropdownMenuTrigger

The button that toggles the menu.

```tsx
<DropdownMenuTrigger asChild>
  <Button>Click me</Button>
</DropdownMenuTrigger>
```

### DropdownMenuContent

The container for menu items.

**Props:**
- `align?: 'start' | 'center' | 'end'` - Alignment relative to trigger
- `sideOffset?: number` - Distance from trigger in pixels

### DropdownMenuItem

A clickable menu item.

**Props:**
- `onSelect?: () => void` - Callback when item is selected
- `disabled?: boolean` - Disable the item

### DropdownMenuLabel

A non-interactive label.

### DropdownMenuSeparator

A visual separator.

## Examples

### With Icons

```tsx
import { User, Settings, LogOut } from 'lucide-react'

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button>Account</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>
      <User className="mr-2 h-4 w-4" />
      Profile
    </DropdownMenuItem>
    <DropdownMenuItem>
      <Settings className="mr-2 h-4 w-4" />
      Settings
    </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>
      <LogOut className="mr-2 h-4 w-4" />
      Logout
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

### With Labels and Separators

```tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button>Options</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Billing</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Logout</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

### With Checkboxes

```tsx
import { DropdownMenuCheckboxItem } from '@ttianqii/takaui'

function CheckboxDropdown() {
  const [showPanel, setShowPanel] = useState(true)
  const [showToolbar, setShowToolbar] = useState(false)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>View</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Toggle Views</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={showPanel}
          onCheckedChange={setShowPanel}
        >
          Show Panel
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showToolbar}
          onCheckedChange={setShowToolbar}
        >
          Show Toolbar
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

### With Radio Items

```tsx
import { DropdownMenuRadioGroup, DropdownMenuRadioItem } from '@ttianqii/takaui'

function RadioDropdown() {
  const [position, setPosition] = useState('bottom')

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Position</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

### With Submenu

```tsx
import { DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent } from '@ttianqii/takaui'

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button>More Options</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Edit</DropdownMenuItem>
    <DropdownMenuItem>Duplicate</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>Share</DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        <DropdownMenuItem>Email</DropdownMenuItem>
        <DropdownMenuItem>Message</DropdownMenuItem>
        <DropdownMenuItem>Link</DropdownMenuItem>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

### Table Actions Menu

```tsx
import { MoreHorizontal, Edit, Copy, Trash } from 'lucide-react'

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost" size="sm">
      <MoreHorizontal className="h-4 w-4" />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuLabel>Actions</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem onClick={() => handleEdit()}>
      <Edit className="mr-2 h-4 w-4" />
      Edit
    </DropdownMenuItem>
    <DropdownMenuItem onClick={() => handleCopy()}>
      <Copy className="mr-2 h-4 w-4" />
      Duplicate
    </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem
      onClick={() => handleDelete()}
      className="text-red-600"
    >
      <Trash className="mr-2 h-4 w-4" />
      Delete
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

### User Account Menu

```tsx
import { User, Settings, CreditCard, LogOut } from 'lucide-react'

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
      <Avatar>
        <AvatarImage src="/avatar.png" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuLabel>
      <div className="flex flex-col space-y-1">
        <p className="text-sm font-medium">John Doe</p>
        <p className="text-xs text-muted-foreground">john@example.com</p>
      </div>
    </DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>
      <User className="mr-2 h-4 w-4" />
      Profile
    </DropdownMenuItem>
    <DropdownMenuItem>
      <CreditCard className="mr-2 h-4 w-4" />
      Billing
    </DropdownMenuItem>
    <DropdownMenuItem>
      <Settings className="mr-2 h-4 w-4" />
      Settings
    </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>
      <LogOut className="mr-2 h-4 w-4" />
      Log out
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

## Positioning

### Alignment

```tsx
<DropdownMenuContent align="start">
  {/* Aligned to start of trigger */}
</DropdownMenuContent>

<DropdownMenuContent align="center">
  {/* Centered with trigger */}
</DropdownMenuContent>

<DropdownMenuContent align="end">
  {/* Aligned to end of trigger */}
</DropdownMenuContent>
```

### Side Offset

```tsx
<DropdownMenuContent sideOffset={8}>
  {/* 8px away from trigger */}
</DropdownMenuContent>
```

## Customization

### Custom Styling

```tsx
<DropdownMenuContent className="w-56">
  <DropdownMenuItem className="cursor-pointer hover:bg-blue-50">
    Custom Item
  </DropdownMenuItem>
</DropdownMenuContent>
```

### Destructive Action

```tsx
<DropdownMenuItem
  className="text-red-600 focus:text-red-600 focus:bg-red-50"
  onClick={handleDelete}
>
  <Trash className="mr-2 h-4 w-4" />
  Delete
</DropdownMenuItem>
```

## Keyboard Navigation

- `Space/Enter` - Open/close menu
- `Arrow Down` - Move to next item
- `Arrow Up` - Move to previous item
- `Escape` - Close menu
- `Tab` - Close menu and move to next focusable element

## Accessibility

The DropdownMenu component is fully accessible:

- ✅ Keyboard navigation
- ✅ ARIA attributes
- ✅ Screen reader support
- ✅ Focus management
- ✅ Auto-positioning to stay in viewport

## TypeScript

```tsx
import type { DropdownMenuProps } from '@radix-ui/react-dropdown-menu'

const MyDropdown: React.FC<DropdownMenuProps> = (props) => {
  return (
    <DropdownMenu {...props}>
      {/* Content */}
    </DropdownMenu>
  )
}
```

## Related Components

- [Button](https://ui.shadcn.com/docs/components/button) - Trigger button
- [DataTable](./DATATABLE.md) - Often used in table action columns
