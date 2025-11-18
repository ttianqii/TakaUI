import { useMemo } from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '../components/DataTable'

// Step 1: Define your data type
type User = {
  id: string
  name: string
  email: string
  role: string
}

// Step 2: Create sample data
const users: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
]

export function MinimalExample() {
  // Step 3: Define columns
  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
      },
      {
        accessorKey: 'email',
        header: 'Email',
      },
      {
        accessorKey: 'role',
        header: 'Role',
      },
    ],
    []
  )

  // Step 4: Render the table
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Minimal DataTable Example</h1>
      <DataTable columns={columns} data={users} />
    </div>
  )
}

export default MinimalExample
