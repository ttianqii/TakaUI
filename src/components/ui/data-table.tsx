import * as React from "react"
import type { Table } from "@tanstack/react-table"

interface TableProviderValue<TData> {
  tableInstance: Table<TData>
  totalRecords: number
}

const TableContext = React.createContext<TableProviderValue<any> | null>(null)

export function useTableContext<TData>() {
  const context = React.useContext(TableContext)
  if (!context) {
    throw new Error("useTableContext must be used within a TableRoot component")
  }
  return context as TableProviderValue<TData>
}

interface TableRootProps<TData> {
  table: Table<TData>
  totalRecords: number
  children: React.ReactNode
}

export function TableRoot<TData>({ table, totalRecords, children }: TableRootProps<TData>) {
  return (
    <TableContext.Provider value={{ tableInstance: table, totalRecords }}>
      {children}
    </TableContext.Provider>
  )
}
