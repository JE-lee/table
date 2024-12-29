import { assignAPIs } from '../../utils'
import {
  table_getState,
  table_reset,
  table_setOptions,
  table_setState,
} from './coreTablesFeature.utils'
import type { TableOptions_Table, Table_Table } from './coreTablesFeature.types'
import type { RowData } from '../../types/type-utils'
import type { TableFeature, TableFeatures } from '../../types/TableFeatures'

export const coreTablesFeature: TableFeature<{
  Table: Table_Table<TableFeatures, RowData>
  TableOptions: TableOptions_Table<TableFeatures, RowData>
}> = {
  constructTableAPIs: (table) => {
    assignAPIs(table, [
      {
        fn: () => table_getState(table),
      },
      {
        fn: () => table_reset(table),
      },
      {
        fn: (updater) => table_setOptions(table, updater),
      },
      {
        fn: (updater) => table_setState(table, updater),
      },
    ])
  },
}
