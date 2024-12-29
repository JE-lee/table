import type { coreFeatures } from '../core/coreFeatures'
import type { TableOptions_All } from './TableOptions'
import type { ExtractFeatureTypes, TableFeatures } from './TableFeatures'
import type { RowData } from './type-utils'
import type { TableState_All } from './TableState'
import type { RowModelFns_All } from './RowModelFns'
import type { CachedRowModel_All, CreateRowModels_All } from './RowModel'

export interface Table_Plugins<
  TFeatures extends TableFeatures,
  TData extends RowData,
> {}

/**
 * The core table object that only includes the core table functionality such as column, header, row, and table APIS.
 * No features are included.
 */
// export type Table_Core<
//   TFeatures extends TableFeatures,
//   TData extends RowData,
// > = Table_Table<TFeatures, TData> &
//   Table_Columns<TFeatures, TData> &
//   Table_Rows<TFeatures, TData> &
//   Table_RowModels<TFeatures, TData> &
//   Table_Headers<TFeatures, TData> &
//   Table_Plugins<TFeatures, TData>

export type Table_Core<
  TFeatures extends TableFeatures,
  TData extends RowData,
> = ExtractFeatureTypes<typeof coreFeatures, 'Table'>

/**
 * The table object that includes both the core table functionality and the features that are enabled via the `_features` table option.
 */
// export type Table<
//   TFeatures extends TableFeatures,
//   TData extends RowData,
// > = Table_Core<TFeatures, TData> &
//   UnionToIntersection<
//     | ('columnFilteringFeature' extends keyof TFeatures
//         ? Table_ColumnFiltering
//         : never)
//     | ('columnGroupingFeature' extends keyof TFeatures
//         ? Table_ColumnGrouping<TFeatures, TData>
//         : never)
//     | ('columnOrderingFeature' extends keyof TFeatures
//         ? Table_ColumnOrdering<TFeatures, TData>
//         : never)
//     | ('columnPinningFeature' extends keyof TFeatures
//         ? Table_ColumnPinning<TFeatures, TData>
//         : never)
//     | ('columnResizingFeature' extends keyof TFeatures
//         ? Table_ColumnResizing
//         : never)
//     | ('columnSizingFeature' extends keyof TFeatures
//         ? Table_ColumnSizing
//         : never)
//     | ('columnVisibilityFeature' extends keyof TFeatures
//         ? Table_ColumnVisibility<TFeatures, TData>
//         : never)
//     | ('globalFacetingFeature' extends keyof TFeatures
//         ? Table_GlobalFaceting<TFeatures, TData>
//         : never)
//     | ('globalFilteringFeature' extends keyof TFeatures
//         ? Table_GlobalFiltering<TFeatures, TData>
//         : never)
//     | ('rowExpandingFeature' extends keyof TFeatures
//         ? Table_RowExpanding<TFeatures, TData>
//         : never)
//     | ('rowPaginationFeature' extends keyof TFeatures
//         ? Table_RowPagination<TFeatures, TData>
//         : never)
//     | ('rowPinningFeature' extends keyof TFeatures
//         ? Table_RowPinning<TFeatures, TData>
//         : never)
//     | ('rowSelectionFeature' extends keyof TFeatures
//         ? Table_RowSelection<TFeatures, TData>
//         : never)
//     | ('rowSortingFeature' extends keyof TFeatures
//         ? Table_RowSorting<TFeatures, TData>
//         : never)
//   >

export type Table<
  TFeatures extends TableFeatures,
  TData extends RowData,
> = Table_Core<TFeatures, TData> &
  ExtractFeatureTypes<TFeatures, 'Table'> &
  Table_Plugins<TFeatures, TData>

export type Table_Internal<
  TFeatures extends TableFeatures,
  TData extends RowData,
> = Table<TFeatures, TData> & {
  _rowModels: CachedRowModel_All<TData>
  _rowModelFns: RowModelFns_All<TData>
  options: TableOptions_All<TData> & {
    _rowModels?: CreateRowModels_All<TData>
    state?: TableState_All
    initialState?: TableState_All
  }
  initialState: TableState_All
}
