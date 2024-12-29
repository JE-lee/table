import type { coreFeatures } from '../core/coreFeatures'
import type { stockFeatures } from '../features/stockFeatures'
import type { RowData } from './type-utils'
import type { ExtractFeatureTypes, TableFeatures } from './TableFeatures'

export interface TableOptions_Plugins<
  TFeatures extends TableFeatures,
  TData extends RowData,
> {}

// export interface TableOptions_Core<
//   TFeatures extends TableFeatures,
//   TData extends RowData,
// > extends TableOptions_Table<TFeatures, TData>,
//     TableOptions_Cell,
//     TableOptions_Columns<TFeatures, TData>,
//     TableOptions_Rows<TFeatures, TData>,
//     TableOptions_Headers,
//     TableOptions_Plugins {}

export type TableOptions_Core<
  TFeatures extends TableFeatures,
  TData extends RowData,
> = ExtractFeatureTypes<typeof coreFeatures, 'TableOptions'>

// export type TableOptions<
//   TFeatures extends TableFeatures,
//   TData extends RowData,
// > = TableOptions_Core<TFeatures, TData> &
//   UnionToIntersection<
//     | ('columnFilteringFeature' extends keyof TFeatures
//         ? TableOptions_ColumnFiltering<TFeatures, TData>
//         : never)
//     | ('columnGroupingFeature' extends keyof TFeatures
//         ? TableOptions_ColumnGrouping
//         : never)
//     | ('columnOrderingFeature' extends keyof TFeatures
//         ? TableOptions_ColumnOrdering
//         : never)
//     | ('columnPinningFeature' extends keyof TFeatures
//         ? TableOptions_ColumnPinning
//         : never)
//     | ('columnResizingFeature' extends keyof TFeatures
//         ? TableOptions_ColumnResizing
//         : never)
//     | ('columnSizingFeature' extends keyof TFeatures
//         ? TableOptions_ColumnSizing
//         : never)
//     | ('columnVisibilityFeature' extends keyof TFeatures
//         ? TableOptions_ColumnVisibility
//         : never)
//     | ('globalFilteringFeature' extends keyof TFeatures
//         ? TableOptions_GlobalFiltering<TFeatures, TData>
//         : never)
//     | ('rowExpandingFeature' extends keyof TFeatures
//         ? TableOptions_RowExpanding<TFeatures, TData>
//         : never)
//     | ('rowPaginationFeature' extends keyof TFeatures
//         ? TableOptions_RowPagination
//         : never)
//     | ('rowPinningFeature' extends keyof TFeatures
//         ? TableOptions_RowPinning<TFeatures, TData>
//         : never)
//     | ('rowSelectionFeature' extends keyof TFeatures
//         ? TableOptions_RowSelection<TFeatures, TData>
//         : never)
//     | ('rowSortingFeature' extends keyof TFeatures
//         ? TableOptions_RowSorting
//         : never)
//   >

export type TableOptions<
  TFeatures extends TableFeatures,
  TData extends RowData,
> = TableOptions_Core<TFeatures, TData> &
  ExtractFeatureTypes<TFeatures, 'TableOptions'> &
  TableOptions_Plugins<TFeatures, TData>

// export type TableOptions_All<
//   TFeatures extends TableFeatures,
//   TData extends RowData,
// > = TableOptions_Core<TFeatures, TData> &
//   Partial<
//     TableOptions_ColumnFiltering<TFeatures, TData> &
//       TableOptions_ColumnGrouping &
//       TableOptions_ColumnOrdering &
//       TableOptions_ColumnPinning &
//       TableOptions_ColumnResizing &
//       TableOptions_ColumnSizing &
//       TableOptions_ColumnVisibility &
//       TableOptions_GlobalFiltering<TFeatures, TData> &
//       TableOptions_RowExpanding<TFeatures, TData> &
//       TableOptions_RowPagination &
//       TableOptions_RowPinning<TFeatures, TData> &
//       TableOptions_RowSelection<TFeatures, TData> &
//       TableOptions_RowSorting
//   >

export type TableOptions_All<TData extends RowData = RowData> = TableOptions<
  typeof stockFeatures,
  TData
>
