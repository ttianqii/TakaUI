import './index.css'
import { useMemo } from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal, Plus, User, Settings, LogOut, Mail, MessageSquare, UserPlus, CreditCard, Cloud, LifeBuoy, Github } from 'lucide-react'

import { Button } from './components/ui/button'
import { Checkbox } from './components/ui/checkbox'
import { Separator } from './components/ui/separator'
import { DataTable } from './components/DataTable'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuGroup,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from './components/ui/dropdown-menu'

// Sample data type for goods inventory
type GoodsItem = {
  id: string
  product: string
  category: string
  quantity: number
  unitPrice: number
  totalCost: number
  supplier: string
  status: 'in-stock' | 'low-stock' | 'out-of-stock'
}

// Sample data
const sampleData: GoodsItem[] = [
  {
    id: '1',
    product: 'Laptop Computer',
    category: 'Electronics',
    quantity: 45,
    unitPrice: 899.99,
    totalCost: 40499.55,
    supplier: 'Tech Supply Co.',
    status: 'in-stock',
  },
  {
    id: '2',
    product: 'Office Chair',
    category: 'Furniture',
    quantity: 120,
    unitPrice: 199.99,
    totalCost: 23998.80,
    supplier: 'Office Plus',
    status: 'in-stock',
  },
  {
    id: '3',
    product: 'Printer Paper (Box)',
    category: 'Supplies',
    quantity: 8,
    unitPrice: 24.99,
    totalCost: 199.92,
    supplier: 'Paper World',
    status: 'low-stock',
  },
  {
    id: '4',
    product: 'Wireless Mouse',
    category: 'Electronics',
    quantity: 0,
    unitPrice: 29.99,
    totalCost: 0,
    supplier: 'Tech Supply Co.',
    status: 'out-of-stock',
  },
  {
    id: '5',
    product: 'Standing Desk',
    category: 'Furniture',
    quantity: 15,
    unitPrice: 449.99,
    totalCost: 6749.85,
    supplier: 'Office Plus',
    status: 'in-stock',
  },
  {
    id: '6',
    product: 'USB-C Cable',
    category: 'Electronics',
    quantity: 200,
    unitPrice: 12.99,
    totalCost: 2598.00,
    supplier: 'Cable Express',
    status: 'in-stock',
  },
  {
    id: '7',
    product: 'Notebook (Pack of 5)',
    category: 'Supplies',
    quantity: 50,
    unitPrice: 15.99,
    totalCost: 799.50,
    supplier: 'Paper World',
    status: 'in-stock',
  },
  {
    id: '8',
    product: 'Monitor 27"',
    category: 'Electronics',
    quantity: 6,
    unitPrice: 299.99,
    totalCost: 1799.94,
    supplier: 'Tech Supply Co.',
    status: 'low-stock',
  },
]

// Simple data type for second table
type Employee = {
  id: string
  name: string
  department: string
  position: string
  email: string
}

// Simple data
const employeeData: Employee[] = [
  {
    id: '1',
    name: 'John Smith',
    department: 'Engineering',
    position: 'Senior Developer',
    email: 'john.smith@company.com',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    department: 'Marketing',
    position: 'Marketing Manager',
    email: 'sarah.j@company.com',
  },
  {
    id: '3',
    name: 'Michael Chen',
    department: 'Sales',
    position: 'Sales Representative',
    email: 'michael.c@company.com',
  },
  {
    id: '4',
    name: 'Emily Davis',
    department: 'HR',
    position: 'HR Specialist',
    email: 'emily.d@company.com',
  },
  {
    id: '5',
    name: 'David Wilson',
    department: 'Engineering',
    position: 'Junior Developer',
    email: 'david.w@company.com',
  },
]

// Dark theme data
type Task = {
  id: string
  task: string
  priority: string
  assignee: string
  status: string
  dueDate: string
}

const taskData: Task[] = [
  {
    id: '1',
    task: 'Update user dashboard',
    priority: 'High',
    assignee: 'John Smith',
    status: 'In Progress',
    dueDate: '2025-11-20',
  },
  {
    id: '2',
    task: 'Fix login bug',
    priority: 'Critical',
    assignee: 'Sarah Johnson',
    status: 'In Progress',
    dueDate: '2025-11-19',
  },
  {
    id: '3',
    task: 'Write documentation',
    priority: 'Medium',
    assignee: 'Michael Chen',
    status: 'Todo',
    dueDate: '2025-11-25',
  },
  {
    id: '4',
    task: 'Code review',
    priority: 'Low',
    assignee: 'Emily Davis',
    status: 'Completed',
    dueDate: '2025-11-18',
  },
  {
    id: '5',
    task: 'Deploy to production',
    priority: 'High',
    assignee: 'David Wilson',
    status: 'Todo',
    dueDate: '2025-11-22',
  },
]

// Customer data type
type Customer = {
  id: string
  name: string
  email: string
  phone: string
  company: string
}

const customerData: Customer[] = [
  {
    id: '1',
    name: 'Alice Brown',
    email: 'alice.b@techcorp.com',
    phone: '+1 234-567-8901',
    company: 'TechCorp Inc.',
  },
  {
    id: '2',
    name: 'Bob Green',
    email: 'bob.g@startup.io',
    phone: '+1 234-567-8902',
    company: 'StartUp.io',
  },
  {
    id: '3',
    name: 'Carol White',
    email: 'carol.w@enterprise.com',
    phone: '+1 234-567-8903',
    company: 'Enterprise Solutions',
  },
]

function App() {
  // Define columns with TanStack Table
  const columns = useMemo<ColumnDef<GoodsItem>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() ? 'indeterminate' : false)
            }
            onCheckedChange={(value: boolean) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: 'product',
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              className="h-auto p-0 font-medium hover:bg-transparent hover:text-gray-900"
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
              Product Name
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ row }) => {
          return <div className="font-medium ml-3">{row.getValue('product')}</div>
        },
      },
      {
        accessorKey: 'category',
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              className="h-auto p-0 font-medium hover:bg-transparent hover:text-gray-900"
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
              Category
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ row }) => {
          return <div className="text-gray-600 ml-3">{row.getValue('category')}</div>
        },
      },
      {
        accessorKey: 'quantity',
        header: ({ column }) => {
          return (
            <div className="text-center">
              <Button
                variant="ghost"
                className="h-auto p-0 font-medium hover:bg-transparent hover:text-gray-900"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
              >
                Quantity
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )
        },
        cell: ({ row }) => {
          return <div className="text-center tabular-nums">{row.getValue('quantity')}</div>
        },
      },
      {
        accessorKey: 'unitPrice',
        header: ({ column }) => {
          return (
            <div className="text-right ">
              <Button
                variant="ghost"
                className="h-auto p-0  font-medium hover:bg-transparent hover:text-gray-900"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
              >
                Unit Price
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )
        },
        cell: ({ row }) => {
          const price = row.getValue('unitPrice') as number
          const formatted = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(price)
          return <div className="text-right tabular-nums font-medium pr-8">{formatted}</div>
        },
      },
      {
        accessorKey: 'totalCost',
        header: ({ column }) => {
          return (
            <div className="text-right">
              <Button
                variant="ghost"
                className="h-auto p-0 font-medium hover:bg-transparent hover:text-gray-900"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
              >
                Total Cost
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )
        },
        cell: ({ row }) => {
          const total = row.getValue('totalCost') as number
          const formatted = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(total)
          return <div className="text-right tabular-nums font-bold pr-8">{formatted}</div>
        },
      },
      {
        accessorKey: 'supplier',
        header: 'Supplier',
        cell: ({ row }) => {
          return <div className="text-sm text-gray-600">{row.getValue('supplier')}</div>
        },
      },
      {
        accessorKey: 'status',
        header: () => <div className="text-center">Status</div>,
        cell: ({ row }) => {
          const status = row.getValue('status') as string
          return (
            <div className="flex justify-center">
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  status === 'in-stock'
                    ? 'bg-green-100 text-green-800'
                    : status === 'low-stock'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {status === 'in-stock' ? 'In Stock' : status === 'low-stock' ? 'Low Stock' : 'Out of Stock'}
              </span>
            </div>
          )
        },
      },
      {
        id: 'actions',
        header: () => <div className="text-center">Actions</div>,
        cell: ({ row }) => {
          const item = row.original

          return (
            <div className="flex justify-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className=" h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => console.log('Edit:', item.id)}
                  className="cursor-pointer"
                >
                  Edit Item
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => console.log('Reorder:', item.id)}
                  className="cursor-pointer"
                >
                  Reorder Stock
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => console.log('Delete:', item.id)}
                  className="cursor-pointer text-red-600 focus:text-red-600"
                >
                  Delete Item
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            </div>
          )
        },
      },
    ],
    []
  )

  // Simple employee table columns
  const employeeColumns = useMemo<ColumnDef<Employee>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => <div className="font-medium">{row.getValue('name')}</div>,
      },
      {
        accessorKey: 'department',
        header: 'Department',
      },
      {
        accessorKey: 'position',
        header: 'Position',
      },
      {
        accessorKey: 'email',
        header: 'Email',
        cell: ({ row }) => <div className="text-gray-600">{row.getValue('email')}</div>,
      },
    ],
    []
  )

  // Dark theme task table columns
  const taskColumns = useMemo<ColumnDef<Task>[]>(
    () => [
      {
        accessorKey: 'task',
        header: 'Task',
        cell: ({ row }) => <div className="font-medium text-white">{row.getValue('task')}</div>,
      },
      {
        accessorKey: 'priority',
        header: () => <div className="text-center">Priority</div>,
        cell: ({ row }) => {
          const priority = row.getValue('priority') as string
          return (
            <div className="flex justify-center">
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  priority === 'Critical'
                    ? 'bg-red-500 text-white'
                    : priority === 'High'
                    ? 'bg-orange-500 text-white'
                    : priority === 'Medium'
                    ? 'bg-yellow-500 text-black'
                    : 'bg-blue-500 text-white'
                }`}
              >
                {priority}
              </span>
            </div>
          )
        },
      },
      {
        accessorKey: 'assignee',
        header: 'Assignee',
        cell: ({ row }) => <div className="text-gray-300">{row.getValue('assignee')}</div>,
      },
      {
        accessorKey: 'status',
        header: () => <div className="text-center">Status</div>,
        cell: ({ row }) => {
          const status = row.getValue('status') as string
          return (
            <div className="flex justify-center">
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  status === 'Completed'
                    ? 'bg-green-600 text-white'
                    : status === 'In Progress'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-600 text-white'
                }`}
              >
                {status}
              </span>
            </div>
          )
        },
      },
      {
        accessorKey: 'dueDate',
        header: 'Due Date',
        cell: ({ row }) => <div className="text-gray-300">{row.getValue('dueDate')}</div>,
      },
    ],
    []
  )

  // Customer table columns with Add New button
  const customerColumns = useMemo<ColumnDef<Customer>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => <div className="font-medium">{row.getValue('name')}</div>,
      },
      {
        accessorKey: 'email',
        header: 'Email',
        cell: ({ row }) => <div className="text-gray-600">{row.getValue('email')}</div>,
      },
      {
        accessorKey: 'phone',
        header: 'Phone',
      },
      {
        accessorKey: 'company',
        header: 'Company',
      },
    ],
    []
  )

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header with Separator */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-bold text-gray-900">
            TakaUI Component Library
          </h1>
          <p className="text-gray-600">
            Beautiful, accessible React components
          </p>
          <div className="flex justify-center pt-2">
            <Separator className="w-48" />
          </div>
        </div>

        {/* Separator Demo Section */}
        <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-1">Separator Component</h2>
            <p className="text-sm text-gray-600">A visual divider between content</p>
          </div>
          
          <Separator />
          
          <div className="space-y-6">
            {/* Horizontal */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-700">Horizontal (Default)</h3>
              <div className="p-4 bg-gray-50 rounded space-y-2">
                <p className="text-sm text-gray-600">Content above</p>
                <Separator />
                <p className="text-sm text-gray-600">Content below</p>
              </div>
            </div>

            {/* Thick */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-700">Thick Separator</h3>
              <Separator className="h-[3px] bg-gray-300" />
            </div>

            {/* Colors */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-700">Colored Variants</h3>
              <div className="space-y-2">
                <Separator className="bg-blue-500" />
                <Separator className="bg-green-500" />
                <Separator className="bg-red-500" />
                <Separator className="bg-purple-500" />
              </div>
            </div>

            {/* Vertical */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-700">Vertical Separator</h3>
              <div className="flex items-center gap-4 h-16 bg-gray-50 rounded px-6">
                <span className="text-sm font-medium">Item 1</span>
                <Separator orientation="vertical" />
                <span className="text-sm font-medium">Item 2</span>
                <Separator orientation="vertical" />
                <span className="text-sm font-medium">Item 3</span>
              </div>
            </div>

            {/* Navigation Example */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-700">Navigation Menu Example</h3>
              <div className="flex items-center gap-1 bg-gray-50 rounded p-2">
                <Button variant="ghost" size="sm">Home</Button>
                <Separator orientation="vertical" className="h-5" />
                <Button variant="ghost" size="sm">Products</Button>
                <Separator orientation="vertical" className="h-5" />
                <Button variant="ghost" size="sm">About</Button>
                <Separator orientation="vertical" className="h-5" />
                <Button variant="ghost" size="sm">Contact</Button>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-4" />

        {/* Button Component Showcase */}
        <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-1">Button Component</h2>
            <p className="text-sm text-gray-600">Multiple variants and sizes</p>
          </div>
          
          <Separator />

          {/* Variants */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-700">Variants</h3>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="default">Default</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
          </div>

          <Separator />

          {/* Sizes */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-700">Sizes</h3>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>

          <Separator />

          {/* Icon Buttons */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-700">Icon Buttons</h3>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="outline" size="icon">
                <Plus className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon-sm">
                <Plus className="h-3 w-3" />
              </Button>
              <Button variant="outline" size="icon-lg">
                <Plus className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <Separator />

          {/* With Icons */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-700">Buttons with Icons</h3>
            <div className="flex flex-wrap items-center gap-3">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Item
              </Button>
              <Button variant="outline">
                <MoreHorizontal className="mr-2 h-4 w-4" />
                More Options
              </Button>
              <Button variant="destructive">
                Delete
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          <Separator />

          {/* Disabled State */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-700">Disabled State</h3>
            <div className="flex flex-wrap items-center gap-3">
              <Button disabled>Default Disabled</Button>
              <Button variant="outline" disabled>Outline Disabled</Button>
              <Button variant="destructive" disabled>Destructive Disabled</Button>
            </div>
          </div>
        </div>

        <Separator className="my-4" />

        {/* Dropdown Component Showcase */}
        <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-1">Dropdown Menu Component</h2>
            <p className="text-sm text-gray-600">Contextual menus with multiple features</p>
          </div>
          
          <Separator />

          {/* Basic Dropdown */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-700">Basic Dropdown</h3>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Open Menu</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Separator />

          {/* With Shortcuts */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-700">With Keyboard Shortcuts</h3>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Actions</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                    <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Billing
                    <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Separator />

          {/* With Checkboxes */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-700">With Checkboxes</h3>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">View Options</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Toggle Features</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  Show Toolbar
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked>
                  Show Status Bar
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>
                  Show Sidebar
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Separator />

          {/* Radio Group */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-700">Radio Selection</h3>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Select Position</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value="bottom">
                  <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Separator />

          {/* Submenu */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-700">With Submenu</h3>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">More Options</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Mail className="mr-2 h-4 w-4" />
                    Email
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Message
                  </DropdownMenuItem>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Invite users
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem>
                        <Mail className="mr-2 h-4 w-4" />
                        Email
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Message
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Plus className="mr-2 h-4 w-4" />
                        More...
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LifeBuoy className="mr-2 h-4 w-4" />
                  Support
                </DropdownMenuItem>
                <DropdownMenuItem disabled>
                  <Cloud className="mr-2 h-4 w-4" />
                  API (Coming soon)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <Separator className="my-4" />

        {/* DataTable Demo 1 - Full Featured */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Inventory Management</h2>
          <DataTable
            columns={columns}
            data={sampleData}
            searchPlaceholder="Search products, categories, suppliers..."
          />
        </div>

        <Separator />
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Employee Table (Simple)</h2>
          <DataTable
            columns={employeeColumns}
            data={employeeData}
            showSearch={false}
            showPagination={false}
          />
        </div>

        <Separator />
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Employee Table (Clean - No Separators)</h2>
          <DataTable
            columns={employeeColumns}
            data={employeeData}
            showSearch={false}
            showPagination={false}
            variant="clean"
          />
        </div>

        {/* DataTable Demo 3 - Dark Theme */}
        <div className="bg-gray-900 rounded-lg shadow-md p-6 border border-gray-700">
          <h2 className="text-xl font-semibold mb-4 text-white">Task Manager (Dark Theme)</h2>
          <div className="[&_table]:bg-gray-800 [&_thead]:bg-gray-700 [&_th]:text-gray-300 [&_td]:text-gray-200 [&_tr:hover]:bg-gray-700 [&_tr]:border-gray-600 [&_input]:bg-gray-700 [&_input]:border-gray-600 [&_input]:text-white [&_input::placeholder]:text-gray-400 [&_button]:text-gray-300 [&_button:hover]:bg-gray-700">
            <DataTable
              columns={taskColumns}
              data={taskData}
              searchPlaceholder="Search tasks..."
              showPagination={false}
            />
          </div>
        </div>

        {/* DataTable Demo 4 - With Add New Button */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Customer Directory (With Add Button)</h2>
          <DataTable
            columns={customerColumns}
            data={customerData}
            searchPlaceholder="Search customers..."
            showPagination={false}
            renderToolbar={() => (
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white h-9"
                onClick={() => alert('Add New Customer clicked! You can open a modal or navigate to a form here.')}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Customer
              </Button>
            )}
          />
        </div>
      </div>
    </div>
  )
}

export default App

