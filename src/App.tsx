import './index.css'
import { useState } from 'react'
import { ChevronsUpDown, MoreHorizontal, Plus, User, Settings, LogOut, Mail, MessageSquare, UserPlus, CreditCard, Cloud, LifeBuoy, Github, Heart } from 'lucide-react'
import { addDays, subDays } from 'date-fns'

import { Button } from './components/ui/button'
import { Separator } from './components/ui/separator'
import { DataTable } from './components/DataTable'
import { DatePicker, type Holiday } from './components/DatePicker'
import { TimePicker } from './components/TimePicker'
import { Schedule, type ScheduleEvent, type CustomField } from './components/Schedule'
import { Calendar as CalendarComponent, type CalendarEvent } from './components/Calendar'
import { MapPin, Users as UsersIcon, Building } from 'lucide-react'
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

// Thai National Holidays 2025
const thaiHolidays: Holiday[] = [
  { date: new Date(2025, 0, 1), name: 'New Year\'s Day', country: 'TH' },
  { date: new Date(2025, 1, 12), name: 'Makha Bucha Day', country: 'TH' },
  { date: new Date(2025, 3, 6), name: 'Chakri Memorial Day', country: 'TH' },
  { date: new Date(2025, 3, 13), name: 'Songkran Festival', country: 'TH' },
  { date: new Date(2025, 3, 14), name: 'Songkran Festival', country: 'TH' },
  { date: new Date(2025, 3, 15), name: 'Songkran Festival', country: 'TH' },
  { date: new Date(2025, 4, 1), name: 'Labour Day', country: 'TH' },
  { date: new Date(2025, 4, 5), name: 'Coronation Day', country: 'TH' },
  { date: new Date(2025, 4, 11), name: 'Visakha Bucha Day', country: 'TH' },
  { date: new Date(2025, 5, 3), name: 'Queen Suthida\'s Birthday', country: 'TH' },
  { date: new Date(2025, 6, 28), name: 'King Vajiralongkorn\'s Birthday', country: 'TH' },
  { date: new Date(2025, 6, 29), name: 'Asanha Bucha Day', country: 'TH' },
  { date: new Date(2025, 7, 12), name: 'Queen Sirikit\'s Birthday', country: 'TH' },
  { date: new Date(2025, 9, 13), name: 'King Bhumibol Memorial Day', country: 'TH' },
  { date: new Date(2025, 9, 23), name: 'Chulalongkorn Day', country: 'TH' },
  { date: new Date(2025, 11, 5), name: 'King Bhumibol\'s Birthday', country: 'TH' },
  { date: new Date(2025, 11, 10), name: 'Constitution Day', country: 'TH' },
  { date: new Date(2025, 11, 31), name: 'New Year\'s Eve', country: 'TH' },
]

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
  // DatePicker state
  const [date1, setDate1] = useState<Date>()
  const [date2, setDate2] = useState<Date>()
  const [date3, setDate3] = useState<Date>()
  const [date4, setDate4] = useState<Date>()
  const [date5, setDate5] = useState<Date>()
  const [date6, setDate6] = useState<Date>()
  const [date7, setDate7] = useState<Date>()
  const [date8, setDate8] = useState<Date>()
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>(() => {
    // Default to current month range
    const today = new Date()
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1)
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0)
    return { from: firstDay, to: lastDay }
  })
  const [dateRange2, setDateRange2] = useState<{ from?: Date; to?: Date }>()

  // TimePicker state
  const [time1, setTime1] = useState<Date>()
  const [time2, setTime2] = useState<Date>()
  const [time3, setTime3] = useState<Date>()
  const [time4, setTime4] = useState<Date>()
  const [timezone1, setTimezone1] = useState('UTC')
  const [timezone2, setTimezone2] = useState('Asia/Bangkok')

  // Schedule state - Classroom Example
  const [classScheduleEvents, setClassScheduleEvents] = useState<ScheduleEvent[]>([
    {
      id: "1",
      title: "Mathematics",
      day: "Monday",
      startTime: "09:00",
      endTime: "10:30",
      classroom: "Room 101",
      grade: "Grade 8",
      students: 25,
      color: "bg-blue-500",
    },
    {
      id: "2",
      title: "Physics Lab",
      day: "Monday",
      startTime: "11:00",
      endTime: "12:30",
      classroom: "Lab 2",
      grade: "Grade 10",
      students: 20,
      color: "bg-green-500",
    },
    {
      id: "3",
      title: "English",
      day: "Tuesday",
      startTime: "08:00",
      endTime: "09:30",
      classroom: "Room 205",
      grade: "Grade 9",
      students: 28,
      color: "bg-purple-500",
    },
  ])

  // Schedule state - Meeting Room Example
  const [meetingScheduleEvents, setMeetingScheduleEvents] = useState<ScheduleEvent[]>([
    {
      id: "1",
      title: "Team Standup",
      day: "Monday",
      startTime: "09:00",
      endTime: "09:30",
      location: "Conference A",
      organizer: "John Smith",
      attendees: 8,
      color: "bg-blue-500",
    },
    {
      id: "2",
      title: "Product Review",
      day: "Monday",
      startTime: "10:00",
      endTime: "11:30",
      location: "Board Room",
      organizer: "Sarah Lee",
      attendees: 12,
      color: "bg-purple-500",
    },
    {
      id: "3",
      title: "Client Call",
      day: "Wednesday",
      startTime: "14:00",
      endTime: "15:00",
      location: "Zoom",
      organizer: "Mike Chen",
      attendees: 5,
      color: "bg-orange-500",
    },
  ])

  // Custom fields for classroom schedule
  const classroomFields: CustomField[] = [
    {
      key: "classroom",
      label: "Classroom",
      type: "text",
      placeholder: "e.g., Room 101",
      icon: <MapPin className="h-3 w-3" />,
      showInCard: true,
      required: true,
    },
    {
      key: "grade",
      label: "Grade",
      type: "select",
      options: [
        { label: "Grade 8", value: "Grade 8" },
        { label: "Grade 9", value: "Grade 9" },
        { label: "Grade 10", value: "Grade 10" },
        { label: "Grade 11", value: "Grade 11" },
        { label: "Grade 12", value: "Grade 12" },
      ],
      showInCard: false,
    },
    {
      key: "students",
      label: "Students",
      type: "number",
      placeholder: "Number of students",
      icon: <UsersIcon className="h-3 w-3" />,
      showInCard: true,
    },
  ]

  // Custom fields for meeting schedule
  const meetingFields: CustomField[] = [
    {
      key: "location",
      label: "Location",
      type: "text",
      placeholder: "e.g., Conference Room A",
      icon: <Building className="h-3 w-3" />,
      showInCard: true,
      required: true,
    },
    {
      key: "organizer",
      label: "Organizer",
      type: "text",
      placeholder: "Organizer name",
      showInCard: false,
      required: true,
    },
    {
      key: "attendees",
      label: "Attendees",
      type: "number",
      placeholder: "Number of attendees",
      icon: <UsersIcon className="h-3 w-3" />,
      showInCard: true,
    },
  ]

  // Calendar state
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [calendarEvents] = useState<CalendarEvent[]>([
    {
      id: "1",
      date: new Date(),
      title: "Team Meeting",
      type: "meeting",
      time: "10:00 AM",
      location: "Conference Room A"
    },
    {
      id: "2",
      date: new Date(),
      title: "Project Deadline",
      type: "deadline",
      time: "5:00 PM"
    },
    {
      id: "3",
      date: addDays(new Date(), 1),
      title: "Client Presentation",
      type: "meeting",
      time: "2:00 PM",
      location: "Board Room"
    },
    {
      id: "4",
      date: addDays(new Date(), 2),
      title: "Workshop",
      type: "class",
      time: "9:00 AM - 12:00 PM",
      location: "Training Center"
    },
    {
      id: "5",
      date: addDays(new Date(), 5),
      title: "Doctor Appointment",
      type: "appointment",
      time: "3:30 PM",
      location: "Medical Center"
    }
  ])

  // Define columns with TanStack Table
  // Simple columns for DataTable demo
  const columns = [
    { key: 'product', header: 'Product Name', cell: (value: unknown) => <div className="font-medium ml-3">{String(value)}</div> },
    { key: 'category', header: 'Category', cell: (value: unknown) => <div className="text-gray-600 ml-3">{String(value)}</div> },
    { key: 'quantity', header: 'Quantity', align: 'center' as const, cell: (value: unknown) => <div className="text-center tabular-nums">{String(value)}</div> },
    { 
      key: 'unitPrice', 
      header: 'Unit Price', 
      align: 'right' as const,
      cell: (value: unknown) => {
        const price = value as number
        const formatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)
        return <div className="text-right tabular-nums font-medium pr-8">{formatted}</div>
      }
    },
    { key: 'supplier', header: 'Supplier', cell: (value: unknown) => <div className="text-sm text-gray-600">{String(value)}</div> },
    { 
      key: 'status', 
      header: 'Status', 
      align: 'center' as const,
      cell: (value: unknown) => {
        const status = value as string
        return (
          <div className="flex justify-center">
            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
              status === 'in-stock' ? 'bg-green-100 text-green-800' :
              status === 'low-stock' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {status === 'in-stock' ? 'In Stock' : status === 'low-stock' ? 'Low Stock' : 'Out of Stock'}
            </span>
          </div>
        )
      }
    },
  ]

  // Simple employee table columns
  const employeeColumns = [
    { key: 'name', header: 'Name', cell: (value: unknown) => <div className="font-medium">{String(value)}</div> },
    { key: 'department', header: 'Department' },
    { key: 'position', header: 'Position' },
    { key: 'email', header: 'Email', cell: (value: unknown) => <div className="text-gray-600">{String(value)}</div> },
  ]

  // Dark theme task table columns
  const taskColumns = [
    { key: 'task', header: 'Task', cell: (value: unknown) => <div className="font-medium text-white">{String(value)}</div> },
    { 
      key: 'priority', 
      header: 'Priority',
      align: 'center' as const,
      cell: (value: unknown) => {
        const priority = value as string
        return (
          <div className="flex justify-center">
            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
              priority === 'Critical' ? 'bg-red-500 text-white' :
              priority === 'High' ? 'bg-orange-500 text-white' :
              priority === 'Medium' ? 'bg-yellow-500 text-black' :
              'bg-blue-500 text-white'
            }`}>
              {priority}
            </span>
          </div>
        )
      }
    },
    { key: 'assignee', header: 'Assignee', cell: (value: unknown) => <div className="text-gray-300">{String(value)}</div> },
    { 
      key: 'status', 
      header: 'Status',
      align: 'center' as const,
      cell: (value: unknown) => {
        const status = value as string
        return (
          <div className="flex justify-center">
            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
              status === 'Completed' ? 'bg-green-600 text-white' :
              status === 'In Progress' ? 'bg-blue-600 text-white' :
              'bg-gray-600 text-white'
            }`}>
              {status}
            </span>
          </div>
        )
      }
    },
    { key: 'dueDate', header: 'Due Date', cell: (value: unknown) => <div className="text-gray-300">{String(value)}</div> },
  ]

  // Customer table columns with Add New button
  const customerColumns = [
    { key: 'name', header: 'Name', cell: (value: unknown) => <div className="font-medium">{String(value)}</div> },
    { key: 'email', header: 'Email', cell: (value: unknown) => <div className="text-gray-600">{String(value)}</div> },
    { key: 'phone', header: 'Phone' },
    { key: 'company', header: 'Company' },
  ]

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
                <ChevronsUpDown className="ml-2 h-4 w-4" />
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

        {/* DatePicker Component Showcase */}
        <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-1">DatePicker Component</h2>
            <p className="text-sm text-gray-600">Minimal, rounded date picker with extensive customization</p>
          </div>

          <Separator />

          {/* Basic Variants */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-700">Basic Variants</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-xs text-gray-600">Default (Outline)</label>
                <DatePicker
                  date={date1}
                  onDateChange={setDate1}
                  placeholder="Pick a date"
                  holidays={thaiHolidays}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-gray-600">Filled Variant</label>
                <DatePicker
                  date={date2}
                  onDateChange={setDate2}
                  variant="default"
                  placeholder="Pick a date"
                  holidays={thaiHolidays}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-gray-600">Ghost Variant</label>
                <DatePicker
                  date={date3}
                  onDateChange={setDate3}
                  variant="ghost"
                  placeholder="Pick a date"
                  holidays={thaiHolidays}
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Sizes */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-700">Size Variants</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-xs text-gray-600">Small</label>
                <DatePicker
                  date={date1}
                  onDateChange={setDate1}
                  size="sm"
                  placeholder="Small size"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-gray-600">Default</label>
                <DatePicker
                  date={date1}
                  onDateChange={setDate1}
                  size="default"
                  placeholder="Default size"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-gray-600">Large</label>
                <DatePicker
                  date={date1}
                  onDateChange={setDate1}
                  size="lg"
                  placeholder="Large size"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Customization Options */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-700">Customization Options</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs text-gray-600">Without Icon</label>
                <DatePicker
                  date={date4}
                  onDateChange={setDate4}
                  showIcon={false}
                  placeholder="No icon"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-gray-600">Custom Icon</label>
                <DatePicker
                  date={date5}
                  onDateChange={setDate5}
                  icon={<Heart className="mr-2 h-4 w-4 text-red-500" />}
                  placeholder="Custom icon"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-gray-600">Full Width</label>
                <DatePicker
                  date={date6}
                  onDateChange={setDate6}
                  fullWidth
                  placeholder="Full width picker"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-gray-600">Custom Format (dd/MM/yyyy)</label>
                <DatePicker
                  date={date7}
                  onDateChange={setDate7}
                  dateFormat="dd/MM/yyyy"
                  placeholder="DD/MM/YYYY"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Advanced Features */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-700">Advanced Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs text-gray-600">Date Range (Last 7 days to Next 7 days)</label>
                <DatePicker
                  date={date1}
                  onDateChange={setDate1}
                  minDate={subDays(new Date(), 7)}
                  maxDate={addDays(new Date(), 7)}
                  placeholder="Limited range"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-gray-600">Disabled Weekends</label>
                <DatePicker
                  date={date2}
                  onDateChange={setDate2}
                  isDateDisabled={(date) => {
                    const day = date.getDay()
                    return day === 0 || day === 6
                  }}
                  placeholder="Weekdays only"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-gray-600">With Month/Year Navigation</label>
                <DatePicker
                  date={date3}
                  onDateChange={setDate3}
                  placeholder="Select a date"
                  holidays={thaiHolidays}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-gray-600">Disabled State</label>
                <DatePicker
                  date={date8}
                  onDateChange={setDate8}
                  disabled
                  placeholder="Disabled picker"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Multiple Months */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-700">Multiple Months Display</h3>
            <div className="space-y-2">
              <label className="text-xs text-gray-600">Show 2 Months Side by Side</label>
              <DatePicker
                date={date4}
                onDateChange={setDate4}
                numberOfMonths={2}
                placeholder="View 2 months"
                align="center"
              />
            </div>
          </div>

          <Separator />

          {/* Date Range Picker */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-700">Date Range Picker - 2 Months (with Thai Holidays)</h3>
            <div className="space-y-2">
              <label className="text-xs text-gray-600">Select Date Range (2 Months View)</label>
              <DatePicker
                mode="range"
                dateRange={dateRange}
                onDateRangeChange={(range) => setDateRange(range || { from: undefined, to: undefined })}
                numberOfMonths={2}
                placeholder="Pick a date range"
                align="start"
                holidays={thaiHolidays}
              />
              {dateRange?.from && dateRange?.to && (
                <p className="text-xs text-gray-600 mt-2">
                  Selected: {dateRange.from.toLocaleDateString()} - {dateRange.to.toLocaleDateString()}
                </p>
              )}
            </div>
          </div>

          <Separator />

          {/* Date Range Picker - 1 Month */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-700">Date Range Picker - 1 Month (with Thai Holidays)</h3>
            <div className="space-y-2">
              <label className="text-xs text-gray-600">Select Date Range (1 Month View)</label>
              <DatePicker
                mode="range"
                dateRange={dateRange2}
                onDateRangeChange={(range) => setDateRange2(range || { from: undefined, to: undefined })}
                numberOfMonths={1}
                placeholder="Pick a date range"
                align="start"
                holidays={thaiHolidays}
              />
              {dateRange2?.from && dateRange2?.to && (
                <p className="text-xs text-gray-600 mt-2">
                  Selected: {dateRange2.from.toLocaleDateString()} - {dateRange2.to.toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        </div>

        <Separator className="my-4" />

        {/* Schedule Component Showcase - Classroom Example */}
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">Schedule Component - Classroom Example</h2>
            <p className="text-gray-600">Fully customizable schedule with custom fields for classroom management</p>
          </div>

          <Schedule
            title="Class Schedule"
            subtitle="Weekly teaching schedule - customized for classroom management"
            events={classScheduleEvents}
            customFields={classroomFields}
            showWeekNavigation={true}
            showHalfHourLines={true}
            showCurrentTimeIndicator={true}
            slotHeight={85}
            onEventAdd={(event) => {
              const newEvent = { ...event, id: Date.now().toString() } as ScheduleEvent
              setClassScheduleEvents([...classScheduleEvents, newEvent])
            }}
            onEventUpdate={(event) => {
              setClassScheduleEvents(classScheduleEvents.map(e => e.id === event.id ? event : e))
            }}
            onEventDelete={(eventId) => {
              setClassScheduleEvents(classScheduleEvents.filter(e => e.id !== eventId))
            }}
          />
        </div>

        <Separator className="my-4" />

        {/* Schedule Component Showcase - Meeting Room Example */}
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">Schedule Component - Meeting Room Example</h2>
            <p className="text-gray-600">Same component, different use case - customized for meeting management (Sunday-Saturday week)</p>
          </div>

          <Schedule
            title="Meeting Room Schedule"
            subtitle="Conference room bookings - customized for meeting management"
            events={meetingScheduleEvents}
            customFields={meetingFields}
            daysOfWeek={["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]}
            showWeekNavigation={true}
            showHalfHourLines={true}
            showCurrentTimeIndicator={true}
            slotHeight={85}
            onEventAdd={(event) => {
              const newEvent = { ...event, id: Date.now().toString() } as ScheduleEvent
              setMeetingScheduleEvents([...meetingScheduleEvents, newEvent])
            }}
            onEventUpdate={(event) => {
              setMeetingScheduleEvents(meetingScheduleEvents.map(e => e.id === event.id ? event : e))
            }}
            onEventDelete={(eventId) => {
              setMeetingScheduleEvents(meetingScheduleEvents.filter(e => e.id !== eventId))
            }}
          />
        </div>

        <Separator className="my-4" />

        {/* TimePicker Component Showcase */}
        <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-1">TimePicker Component</h2>
            <p className="text-sm text-gray-600">Time selector with timezone support and customization</p>
          </div>

          <Separator />

          {/* Basic Time Pickers */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-700">Basic Time Pickers</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-xs text-gray-600">24-Hour Format</label>
                <TimePicker
                  time={time1}
                  onTimeChange={setTime1}
                  format="24h"
                  placeholder="Select time"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-gray-600">12-Hour Format</label>
                <TimePicker
                  time={time2}
                  onTimeChange={setTime2}
                  format="12h"
                  placeholder="Select time"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-gray-600">With Seconds</label>
                <TimePicker
                  time={time3}
                  onTimeChange={setTime3}
                  format="24h"
                  showSeconds
                  placeholder="Select time"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Timezone Support */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-700">Timezone Support</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs text-gray-600">With Timezone Selector (UTC)</label>
                <TimePicker
                  time={time1}
                  onTimeChange={setTime1}
                  timezone={timezone1}
                  onTimezoneChange={setTimezone1}
                  showTimezone
                  format="24h"
                  placeholder="Select time with timezone"
                />
                {time1 && (
                  <p className="text-xs text-gray-600">
                    Selected: {time1.toLocaleTimeString()} ({timezone1})
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs text-gray-600">Bangkok Time (12h)</label>
                <TimePicker
                  time={time2}
                  onTimeChange={setTime2}
                  timezone={timezone2}
                  onTimezoneChange={setTimezone2}
                  showTimezone
                  format="12h"
                  placeholder="Select time"
                />
                {time2 && (
                  <p className="text-xs text-gray-600">
                    Selected: {time2.toLocaleTimeString('en-US', { 
                      hour: '2-digit', 
                      minute: '2-digit',
                      hour12: true 
                    })} ({timezone2})
                  </p>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Minute Steps */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-700">Minute Steps</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-xs text-gray-600">1 Minute Steps</label>
                <TimePicker
                  time={time1}
                  onTimeChange={setTime1}
                  minuteStep={1}
                  placeholder="Every minute"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-gray-600">5 Minute Steps</label>
                <TimePicker
                  time={time2}
                  onTimeChange={setTime2}
                  minuteStep={5}
                  placeholder="Every 5 minutes"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-gray-600">15 Minute Steps</label>
                <TimePicker
                  time={time3}
                  onTimeChange={setTime3}
                  minuteStep={15}
                  placeholder="Every 15 minutes"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-gray-600">30 Minute Steps</label>
                <TimePicker
                  time={time4}
                  onTimeChange={setTime4}
                  minuteStep={30}
                  placeholder="Every 30 minutes"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Variants and Sizes */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-700">Variants & Sizes</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-xs text-gray-600">Small Size</label>
                <TimePicker
                  time={time1}
                  onTimeChange={setTime1}
                  size="sm"
                  placeholder="Small"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-gray-600">Default Size</label>
                <TimePicker
                  time={time2}
                  onTimeChange={setTime2}
                  size="default"
                  placeholder="Default"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-gray-600">Large Size</label>
                <TimePicker
                  time={time3}
                  onTimeChange={setTime3}
                  size="lg"
                  placeholder="Large"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Real-World Example */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-700">Meeting Scheduler Example</h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-700">Meeting Time (Your Timezone)</label>
                  <TimePicker
                    time={time1}
                    onTimeChange={setTime1}
                    timezone={timezone1}
                    onTimezoneChange={setTimezone1}
                    showTimezone
                    format="12h"
                    minuteStep={15}
                    placeholder="Select meeting time"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-700">Meeting Time (Remote Team)</label>
                  <TimePicker
                    time={time2}
                    onTimeChange={setTime2}
                    timezone={timezone2}
                    onTimezoneChange={setTimezone2}
                    showTimezone
                    format="12h"
                    minuteStep={15}
                    placeholder="Select meeting time"
                  />
                </div>
              </div>

              {time1 && time2 && (
                <div className="bg-white rounded p-3 border border-gray-200">
                  <p className="text-sm font-medium text-gray-700 mb-2">Meeting Details:</p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Your time: {time1.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })} ({timezone1})</li>
                    <li>• Remote team time: {time2.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })} ({timezone2})</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        <Separator className="my-4" />

        {/* Calendar Component Showcase */}
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">Calendar Component</h2>
            <p className="text-gray-600">Interactive calendar with event management and Thai holidays</p>
          </div>

          <div className="max-w-md mx-auto">
            <CalendarComponent
              selected={selectedDate}
              onSelect={setSelectedDate}
              events={calendarEvents}
              holidays={thaiHolidays}
            />
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
        
        {/* DataTable Demo - Product Catalog */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Product Catalog</h2>
          <p className="text-sm text-gray-600 mb-4">
            This example shows a product catalog with various data types.
          </p>
          <DataTable
            columns={[
              {
                key: 'product',
                header: 'Product Name',
                cell: (value) => <div className="font-medium ml-3">{String(value)}</div>,
              },
              {
                key: 'category',
                header: 'Category',
                cell: (value) => <div className="text-gray-600 ml-3">{String(value)}</div>,
              },
              {
                key: 'quantity',
                header: 'Stock',
                align: 'center' as const,
                cell: (value) => <div className="text-center tabular-nums">{String(value)}</div>,
              },
              {
                key: 'unitPrice',
                header: 'Price',
                align: 'right' as const,
                cell: (value) => {
                  const price = value as number
                  const formatted = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  }).format(price)
                  return <div className="text-right tabular-nums font-medium pr-8">{formatted}</div>
                },
              },
            ]}
            data={sampleData}
            searchPlaceholder="Search products..."
            pageSize={5}
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

