import type { coreFeatures } from '../core/coreFeatures'
import type { RowData } from './type-utils'
import type { ExtractFeatureTypes, TableFeatures } from './TableFeatures'
import type { stockFeatures } from '../features/stockFeatures'

export interface RowModelFns_Plugins<
  TFeatures extends TableFeatures,
  TData extends RowData,
> {}

// export interface RowModelFns_Core extends RowModelFns_Plugins {}

export type RowModelFns_Core<
  TFeatures extends TableFeatures,
  TData extends RowData,
> = ExtractFeatureTypes<typeof coreFeatures, 'RowModelFns'>

// export type RowModelFns<
//   TFeatures extends TableFeatures,
//   TData extends RowData,
// > = RowModelFns_Plugins &
//   Partial<
//     UnionToIntersection<
//       | ('columnFilteringFeature' extends keyof TFeatures
//           ? RowModelFns_ColumnFiltering<TFeatures, TData>
//           : never)
//       | ('columnGroupingFeature' extends keyof TFeatures
//           ? RowModelFns_ColumnGrouping<TFeatures, TData>
//           : never)
//       | ('rowSortingFeature' extends keyof TFeatures
//           ? RowModelFns_RowSorting<TFeatures, TData>
//           : never)
//     >
//   >

export type RowModelFns<
  TFeatures extends TableFeatures,
  TData extends RowData,
> = RowModelFns_Core<TFeatures, TData> &
  ExtractFeatureTypes<TFeatures, 'RowModelFns'> &
  RowModelFns_Plugins<TFeatures, TData>

// export type RowModelFns_All<
//   TFeatures extends TableFeatures,
//   TData extends RowData,
// > = Partial<
//   RowModelFns_ColumnFiltering<TFeatures, TData> &
//     RowModelFns_ColumnGrouping<TFeatures, TData> &
//     RowModelFns_RowSorting<TFeatures, TData>
// >

export type RowModelFns_All<TData extends RowData = RowData> = RowModelFns<
  typeof stockFeatures,
  TData
>
