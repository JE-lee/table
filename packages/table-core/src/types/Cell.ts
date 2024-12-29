import type { coreFeatures } from '../core/coreFeatures'
import type { CellData, RowData } from './type-utils'
import type { ExtractFeatureTypes, TableFeatures } from './TableFeatures'

export interface Cell_Plugins<
  TFeatures extends TableFeatures,
  TData extends RowData,
  TValue extends CellData = CellData,
> {}

// export interface Cell_Core<
//   TFeatures extends TableFeatures,
//   TData extends RowData,
//   TValue extends CellData = CellData,
// > extends Cell_Cell<TFeatures, TData, TValue>,
//     Cell_Plugins {}

export type Cell_Core<
  TFeatures extends TableFeatures,
  TData extends RowData,
  TValue extends CellData = CellData,
> = ExtractFeatureTypes<typeof coreFeatures, 'Cell'>

// export type Cell<
//   TFeatures extends TableFeatures,
//   TData extends RowData,
//   TValue extends CellData = CellData,
// > = Cell_Cell<TFeatures, TData, TValue> &
//   UnionToIntersection<
//     'columnGroupingFeature' extends keyof TFeatures
//       ? Cell_ColumnGrouping
//       : never
//   >

export type Cell<
  TFeatures extends TableFeatures,
  TData extends RowData,
  TValue extends CellData = CellData,
> = Cell_Core<TFeatures, TData, TValue> &
  ExtractFeatureTypes<TFeatures, 'Cell'> &
  Cell_Plugins<TFeatures, TData, TValue>
