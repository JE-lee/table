import { assignAPIs } from '../../utils'
import {
  cell_getContext,
  cell_getValue,
  cell_renderValue,
} from './coreCellsFeature.utils'
import type { Cell_Cell, TableOptions_Cell } from './coreCellsFeature.types'
import type { RowData } from '../../types/type-utils'
import type { TableFeature, TableFeatures } from '../../types/TableFeatures'

export const coreCellsFeature: TableFeature<{
  Cell: Cell_Cell<TableFeatures, RowData>
  TableOptions: TableOptions_Cell
}> = {
  constructCellAPIs: (cell) => {
    assignAPIs(cell, [
      {
        fn: () => cell_getValue(cell),
      },
      {
        fn: () => cell_renderValue(cell),
      },
      {
        fn: () => cell_getContext(cell),
        memoDeps: () => [cell],
      },
    ])
  },
}
