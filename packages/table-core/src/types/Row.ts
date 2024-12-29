import type { coreFeatures } from '../core/coreFeatures'
import type { ExtractFeatureTypes, TableFeatures } from './TableFeatures'
import type { RowData } from './type-utils'

export interface Row_Plugins<
  TFeatures extends TableFeatures,
  TData extends RowData,
> {}

// export interface Row_Core<
//   TFeatures extends TableFeatures,
//   TData extends RowData,
// > extends Row_Row<TFeatures, TData>,
//     Row_Plugins {}

export type Row_Core<
  TFeatures extends TableFeatures,
  TData extends RowData,
> = ExtractFeatureTypes<typeof coreFeatures, 'Row'>

// export type Row<
//   TFeatures extends TableFeatures,
//   TData extends RowData,
// > = Row_Core<TFeatures, TData> &
//   Row_Plugins &
//   UnionToIntersection<
//     | ('columnFilteringFeature' extends keyof TFeatures
//         ? Row_ColumnFiltering<TFeatures, TData>
//         : never)
//     | ('columnGroupingFeature' extends keyof TFeatures
//         ? Row_ColumnGrouping
//         : never)
//     | ('columnPinningFeature' extends keyof TFeatures
//         ? Row_ColumnPinning<TFeatures, TData>
//         : never)
//     | ('columnVisibilityFeature' extends keyof TFeatures
//         ? Row_ColumnVisibility<TFeatures, TData>
//         : never)
//     | ('rowExpandingFeature' extends keyof TFeatures ? Row_RowExpanding : never)
//     | ('rowPinningFeature' extends keyof TFeatures ? Row_RowPinning : never)
//     | ('rowSelectionFeature' extends keyof TFeatures ? Row_RowSelection : never)
//   >

export type Row<
  TFeatures extends TableFeatures,
  TData extends RowData,
> = Row_Core<TFeatures, TData> &
  ExtractFeatureTypes<TFeatures, 'Row'> &
  Row_Plugins<TFeatures, TData>
