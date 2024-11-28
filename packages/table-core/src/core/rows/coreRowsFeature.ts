import { assignAPIs } from '../../utils'
import {
  row_getAllCells,
  row_getAllCellsByColumnId,
  row_getLeafRows,
  row_getParentRow,
  row_getParentRows,
  row_getUniqueValues,
  row_getValue,
  row_renderValue,
  table_getRow,
  table_getRowId,
} from './coreRowsFeature.utils'
import type { Table_Internal } from '../../types/Table'
import type { RowData } from '../../types/type-utils'
import type { TableFeature, TableFeatures } from '../../types/TableFeatures'
import type { Row } from '../../types/Row'

export const coreRowsFeature: TableFeature = {
  constructRowAPIs: <TFeatures extends TableFeatures, TData extends RowData>(
    row: Row<TFeatures, TData>,
  ): void => {
    assignAPIs(row, [
      {
        fn: () => row_getAllCellsByColumnId(row),
        memoDeps: () => [row.getAllCells()],
      },
      {
        fn: () => row_getAllCells(row),
        memoDeps: () => [row.table.getAllLeafColumns()],
      },
      {
        fn: () => row_getLeafRows(row),
      },
      {
        fn: () => row_getParentRow(row),
      },
      {
        fn: () => row_getParentRows(row),
      },
      {
        fn: (columnId) => row_getUniqueValues(row, columnId),
      },
      {
        fn: (columnId) => row_getValue(row, columnId),
      },
      {
        fn: (columnId) => row_renderValue(row, columnId),
      },
    ])
  },

  constructTableAPIs: <TFeatures extends TableFeatures, TData extends RowData>(
    table: Table_Internal<TFeatures, TData>,
  ): void => {
    assignAPIs(table, [
      {
        fn: (row, index, parent) => table_getRowId(row, table, index, parent),
      },
      {
        // in next version, we should just pass in the row model as the optional 3rd arg
        fn: (id: string, searchAll?: boolean) =>
          table_getRow(table, id, searchAll),
      },
    ])
  },
}
