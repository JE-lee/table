import type { stockFeatures } from '../features/stockFeatures'
import type { ExtractFeatureTypes, TableFeatures } from './TableFeatures'

export interface TableState_Plugins<TFeatures extends TableFeatures> {}

// export type TableState<TFeatures extends TableFeatures> = TableState_Plugins &
//   UnionToIntersection<
//     | ('columnFilteringFeature' extends keyof TFeatures
//         ? TableState_ColumnFiltering
//         : never)
//     | ('columnGroupingFeature' extends keyof TFeatures
//         ? TableState_ColumnGrouping
//         : never)
//     | ('columnOrderingFeature' extends keyof TFeatures
//         ? TableState_ColumnOrdering
//         : never)
//     | ('columnPinningFeature' extends keyof TFeatures
//         ? TableState_ColumnPinning
//         : never)
//     | ('columnResizingFeature' extends keyof TFeatures
//         ? TableState_ColumnResizing
//         : never)
//     | ('columnSizingFeature' extends keyof TFeatures
//         ? TableState_ColumnSizing
//         : never)
//     | ('columnVisibilityFeature' extends keyof TFeatures
//         ? TableState_ColumnVisibility
//         : never)
//     | ('globalFilteringFeature' extends keyof TFeatures
//         ? TableState_GlobalFiltering
//         : never)
//     | ('rowExpandingFeature' extends keyof TFeatures
//         ? TableState_RowExpanding
//         : never)
//     | ('rowPaginationFeature' extends keyof TFeatures
//         ? TableState_RowPagination
//         : never)
//     | ('rowPinningFeature' extends keyof TFeatures
//         ? TableState_RowPinning
//         : never)
//     | ('rowSelectionFeature' extends keyof TFeatures
//         ? TableState_RowSelection
//         : never)
//     | ('rowSortingFeature' extends keyof TFeatures
//         ? TableState_RowSorting
//         : never)
//   >

export type TableState<TFeatures extends TableFeatures> =
  TableState_Plugins<TFeatures> & ExtractFeatureTypes<TFeatures, 'TableState'>

// export type TableState_All = Partial<
//   TableState_ColumnFiltering &
//     TableState_ColumnGrouping &
//     TableState_ColumnOrdering &
//     TableState_ColumnPinning &
//     TableState_ColumnResizing &
//     TableState_ColumnSizing &
//     TableState_ColumnVisibility &
//     TableState_GlobalFiltering &
//     TableState_RowExpanding &
//     TableState_RowPagination &
//     TableState_RowPinning &
//     TableState_RowSelection &
//     TableState_RowSorting
// >

export type TableState_All = TableState<typeof stockFeatures>
