import { assignAPIs } from '../../utils'
import {
  table_getCenterHeaderGroups,
  table_getLeftHeaderGroups,
  table_getRightHeaderGroups,
} from '../../features/column-pinning/ColumnPinning.utils'
import {
  header_getContext,
  header_getLeafHeaders,
  table_getFlatHeaders,
  table_getFooterGroups,
  table_getHeaderGroups,
  table_getLeafHeaders,
} from './Headers.utils'
import type { CellData, RowData } from '../../types/type-utils'
import type { TableFeature, TableFeatures } from '../../types/TableFeatures'
import type { Table, Table_Internal } from '../../types/Table'
import type { Header } from '../../types/Header'

export const Headers: TableFeature = {
  constructHeader: <
    TFeatures extends TableFeatures,
    TData extends RowData,
    TValue extends CellData = CellData,
  >(
    header: Header<TFeatures, TData, TValue>,
    table: Table<TFeatures, TData>,
  ): void => {
    assignAPIs(header, table, [
      {
        fn: () => header_getLeafHeaders(header),
        memoDeps: () => [table.options.columns],
      },
      {
        fn: () => header_getContext(header, table),
        memoDeps: () => [table.options.columns],
      },
    ])
  },

  constructTable: <TFeatures extends TableFeatures, TData extends RowData>(
    table: Table_Internal<TFeatures, TData>,
  ): void => {
    assignAPIs(table, table, [
      {
        fn: () => table_getHeaderGroups(table),
        memoDeps: () => [
          table.options.columns,
          table.getState().columnOrder,
          table.getState().grouping,
          table.getState().columnPinning,
          table.options.groupedColumnMode,
        ],
      },
      {
        fn: () => table_getFooterGroups(table),
        memoDeps: () => [table.getHeaderGroups()],
      },
      {
        fn: () => table_getFlatHeaders(table),
        memoDeps: () => [table.getHeaderGroups()],
      },
      {
        fn: () => table_getLeafHeaders(table),
        memoDeps: () => [
          table_getLeftHeaderGroups(table),
          table_getCenterHeaderGroups(table),
          table_getRightHeaderGroups(table),
        ],
      },
    ])
  },
}
