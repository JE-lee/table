import type { ExtractFeatureTypes, TableFeatures } from './TableFeatures'
import type { RowData } from './type-utils'
import type { ColumnDefBase_All } from './ColumnDef'
import type { coreFeatures } from '../core/coreFeatures'

export interface Column_Plugins<
  TFeatures extends TableFeatures,
  TData extends RowData,
  TValue = unknown,
> {}

// export interface Column_Core<
//   TFeatures extends TableFeatures,
//   TData extends RowData,
//   TValue = unknown,
// > extends Column_Column<TFeatures, TData, TValue>,
//     Column_Plugins {}

export type Column_Core<
  TFeatures extends TableFeatures,
  TData extends RowData,
  TValue = unknown,
> = ExtractFeatureTypes<typeof coreFeatures, 'Column'>

// export type Column<
//   TFeatures extends TableFeatures,
//   TData extends RowData,
//   TValue = unknown,
// > = Column_Core<TFeatures, TData, TValue> &
//   UnionToIntersection<
//     | ('columnFacetingFeature' extends keyof TFeatures
//         ? Column_ColumnFaceting<TFeatures, TData>
//         : never)
//     | ('columnFilteringFeature' extends keyof TFeatures
//         ? Column_ColumnFiltering<TFeatures, TData>
//         : never)
//     | ('columnGroupingFeature' extends keyof TFeatures
//         ? Column_ColumnGrouping<TFeatures, TData>
//         : never)
//     | ('columnOrderingFeature' extends keyof TFeatures
//         ? Column_ColumnOrdering
//         : never)
//     | ('columnPinningFeature' extends keyof TFeatures
//         ? Column_ColumnPinning
//         : never)
//     | ('columnResizingFeature' extends keyof TFeatures
//         ? Column_ColumnResizing
//         : never)
//     | ('columnSizingFeature' extends keyof TFeatures
//         ? Column_ColumnSizing
//         : never)
//     | ('columnVisibilityFeature' extends keyof TFeatures
//         ? Column_ColumnVisibility
//         : never)
//     | ('globalFilteringFeature' extends keyof TFeatures
//         ? Column_GlobalFiltering
//         : never)
//     | ('rowSortingFeature' extends keyof TFeatures
//         ? Column_RowSorting<TFeatures, TData>
//         : never)
//   >

export type Column<
  TFeatures extends TableFeatures,
  TData extends RowData,
  TValue = unknown,
> = Column_Core<TFeatures, TData, TValue> &
  ExtractFeatureTypes<TFeatures, 'Column'> &
  Column_Plugins<TFeatures, TData, TValue>

export type Column_Internal<
  TFeatures extends TableFeatures,
  TData extends RowData,
  TValue = unknown,
> = Omit<Column<TFeatures, TData, TValue>, 'columnDef'> & {
  columnDef: ColumnDefBase_All<TData, TValue>
}
