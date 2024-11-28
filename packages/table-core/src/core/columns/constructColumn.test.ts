import { describe, expect, it } from 'vitest'
import { coreColumnsFeature } from './coreColumnsFeature'
import { constructColumn } from './constructColumn'
import type { Table } from '../../types/Table'
import type { ColumnDef } from '../../types/ColumnDef'

describe('constructColumn', () => {
  it('should create a column with all core column APIs and properties', () => {
    const table = { _features: { coreColumnsFeature }, options: {} } as Table<
      any,
      any
    >
    const columnDef = {
      id: 'test-column',
      accessorKey: 'test-accessor-key',
    } as ColumnDef<any, any>
    const depth = 0
    const parent = undefined

    const column = constructColumn(table, columnDef, depth, parent)

    expect(column).toBeDefined()
    expect(column).toHaveProperty('accessorFn')
    expect(column).toHaveProperty('columnDef')
    expect(column).toHaveProperty('columns')
    expect(column).toHaveProperty('depth')
    expect(column).toHaveProperty('id')
    expect(column).toHaveProperty('parent')
    expect(column).toHaveProperty('getFlatColumns')
    expect(column).toHaveProperty('getLeafColumns')

    expect(column.id).toBe(columnDef.id)
    expect(column.depth).toBe(depth)
    expect(column.parent).toBe(parent)
  })
})
