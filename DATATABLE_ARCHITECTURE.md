# DataTable Component Architecture

## Component Hierarchy

```
┌─────────────────────────────────────────────────────────┐
│ DataTable (Context Provider)                            │
│ • Provides table instance via React Context            │
│ • Shares recordCount across children                   │
│ • No visual rendering                                  │
│                                                         │
│  Props:                                                 │
│  - table: Table<TData>                                  │
│  - recordCount: number                                  │
│  - children: ReactNode                                  │
└─────────────────────────────────────────────────────────┘
                        │
                        │ wraps
                        ▼
┌─────────────────────────────────────────────────────────┐
│ Your Custom Layout Container                            │
│ • Any div, flex, or grid layout                        │
│ • Control spacing and arrangement                      │
│                                                         │
│  Example:                                               │
│  <div className="space-y-4">                            │
│    {/* table and pagination */}                         │
│  </div>                                                 │
└─────────────────────────────────────────────────────────┘
           │                            │
           │                            │
           ▼                            ▼
┌──────────────────────────┐   ┌─────────────────────────┐
│ DataTableContainer       │   │ DataTablePagination     │
│ • Styled wrapper         │   │ • Page size selector    │
│ • Border, shadow, bg     │   │ • Navigation buttons    │
│ • Rounded corners        │   │ • Page info display     │
│                          │   │                         │
│  Props:                  │   │  Props (all optional):  │
│  - children              │   │  - pageSizeOptions      │
│  - className? (optional) │   │  - showRowsPerPage      │
└──────────────────────────┘   │  - showPageInfo         │
           │                   │  - showNavigationButtons│
           │ wraps              └─────────────────────────┘
           ▼                              │
┌──────────────────────────┐              │
│ DataTableView            │              │ uses context
│ • Renders table HTML     │              │ (no table prop!)
│ • Maps headers & rows    │              │
│ • Empty state handling   │◄─────────────┘
│                          │
│  Props: None             │
│  Uses context internally │
└──────────────────────────┘
           │
           │ renders
           ▼
┌──────────────────────────────────────────────────┐
│ Table (base component from ui/table.tsx)         │
│                                                   │
│  ┌────────────────────────────────────────────┐  │
│  │ TableHeader                                │  │
│  │  ┌──────────────────────────────────────┐ │  │
│  │  │ TableHead (for each column)          │ │  │
│  │  │   • Contains DataTableColumnHeader   │ │  │
│  │  │   • Or plain text                    │ │  │
│  │  └──────────────────────────────────────┘ │  │
│  └────────────────────────────────────────────┘  │
│                                                   │
│  ┌────────────────────────────────────────────┐  │
│  │ TableBody                                  │  │
│  │  ┌──────────────────────────────────────┐ │  │
│  │  │ TableRow (for each row)              │ │  │
│  │  │   ┌────────────────────────────────┐ │ │  │
│  │  │   │ TableCell (for each cell)      │ │ │  │
│  │  │   │  • Custom cell rendering       │ │ │  │
│  │  │   └────────────────────────────────┘ │ │  │
│  │  └──────────────────────────────────────┘ │  │
│  └────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────┘
```

## DataTableColumnHeader Component

```
┌───────────────────────────────────────────────┐
│ DataTableColumnHeader                         │
│                                               │
│  Input Props:                                 │
│  • column: Column<TData, TValue>              │
│  • title: string                              │
│  • align?: "left" | "center" | "right"        │
│                                               │
│  ┌─────────────────────────────────────────┐  │
│  │ Logic Flow:                             │  │
│  │                                         │  │
│  │ 1. Check column.getCanSort()            │  │
│  │    ├─ false → Render plain text         │  │
│  │    └─ true  → Render sort button        │  │
│  │                                         │  │
│  │ 2. Check column.getIsSorted()           │  │
│  │    ├─ "asc"  → Show ChevronDown         │  │
│  │    ├─ "desc" → Show ChevronUp           │  │
│  │    └─ false  → Show ChevronsUpDown      │  │
│  │                                         │  │
│  │ 3. Apply alignment class                │  │
│  │    ├─ "left"   → (default)              │  │
│  │    ├─ "center" → text-center            │  │
│  │    └─ "right"  → text-right             │  │
│  └─────────────────────────────────────────┘  │
│                                               │
│  Output:                                      │
│  • Button with title and icon                │
│  • Or plain div with title                   │
└───────────────────────────────────────────────┘
```

## Data Flow

```
User Code
   │
   ├─ Creates table with useReactTable()
   │  └─ Defines columns with ColumnDef[]
   │     └─ Each column has header render function
   │        └─ Returns DataTableColumnHeader component
   │
   ├─ Wraps in DataTable provider
   │  └─ Passes table instance to context
   │
   └─ DataTableView consumes context
      └─ Renders table structure
         └─ Headers render DataTableColumnHeader
            ├─ User clicks sort button
            ├─ column.toggleSorting() called
            ├─ TanStack updates table state
            └─ DataTableView re-renders with new order
```

## Context Pattern

```typescript
// Context definition
const DataTableContext = React.createContext<{
  table: Table<any>
  recordCount: number
} | null>(null)

// Provider (in DataTable component)
<DataTableContext.Provider value={{ table, recordCount }}>
  {children}
</DataTableContext.Provider>

// Consumer (in DataTableView, DataTablePagination)
const { table, recordCount } = useDataTable()
```

## File Dependencies

```
data-table.tsx
  └─ Depends on: @tanstack/react-table (types only)

data-table-container.tsx
  └─ Depends on: @/lib/utils (cn function)

data-table-view.tsx
  ├─ Depends on: data-table.tsx (useDataTable hook)
  ├─ Depends on: @tanstack/react-table (flexRender)
  └─ Depends on: ui/table.tsx (Table, TableHeader, etc.)

data-table-pagination.tsx
  ├─ Depends on: data-table.tsx (useDataTable hook)
  ├─ Depends on: ui/button.tsx
  ├─ Depends on: ui/select.tsx
  └─ Depends on: lucide-react (icons)

data-table-column-header.tsx
  ├─ Depends on: @tanstack/react-table (Column type)
  ├─ Depends on: ui/button.tsx
  ├─ Depends on: lucide-react (icons)
  └─ Depends on: @/lib/utils (cn function)
```

## Styling Layers

```
Layer 1: Tailwind Utilities
  ├─ Colors: gray-50, gray-200, gray-600
  ├─ Spacing: px-2, py-1, space-y-4
  ├─ Typography: text-sm, font-normal
  └─ Borders: border, rounded-lg

Layer 2: Component Defaults
  ├─ DataTableContainer: border + shadow + rounded
  ├─ TableHeader: bg-gray-50
  ├─ TableHead: py-2, px-3
  └─ Button: variant="ghost", minimal padding

Layer 3: User Overrides
  └─ className prop on DataTableContainer
  └─ Custom cell rendering in column definitions
```

## Composition Examples

### Minimal
```tsx
<DataTable table={table} recordCount={data.length}>
  <DataTableContainer>
    <DataTableView />
  </DataTableContainer>
  <DataTablePagination />
</DataTable>
```

### With ScrollArea
```tsx
<DataTable table={table} recordCount={data.length}>
  <DataTableContainer>
    <ScrollArea>
      <DataTableView />
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  </DataTableContainer>
  <DataTablePagination />
</DataTable>
```

### Custom Layout
```tsx
<DataTable table={table} recordCount={data.length}>
  <div className="grid grid-cols-3 gap-4">
    <div className="col-span-2">
      <DataTableContainer>
        <DataTableView />
      </DataTableContainer>
    </div>
    <div>
      <CustomSidebar />
    </div>
    <div className="col-span-3">
      <DataTablePagination />
    </div>
  </div>
</DataTable>
```
