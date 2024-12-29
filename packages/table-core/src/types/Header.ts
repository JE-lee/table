import type { coreFeatures } from '../core/coreFeatures'
import type { CellData, RowData } from './type-utils'
import type { ExtractFeatureTypes, TableFeatures } from './TableFeatures'

export interface Header_Plugins<
  TFeatures extends TableFeatures,
  TData extends RowData,
  TValue extends CellData = CellData,
> {}

// export interface Header_Core<
//   TFeatures extends TableFeatures,
//   TData extends RowData,
//   TValue extends CellData = CellData,
// > extends Header_Header<TFeatures, TData, TValue>,
//     Header_Plugins {}

export type Header_Core<
  TFeatures extends TableFeatures,
  TData extends RowData,
  TValue extends CellData = CellData,
> = ExtractFeatureTypes<typeof coreFeatures, 'Header'>

// export type Header<
//   TFeatures extends TableFeatures,
//   TData extends RowData,
//   TValue extends CellData = CellData,
// > = Header_Core<TFeatures, TData, TValue> &
//   UnionToIntersection<
//     | ('columnSizingFeature' extends keyof TFeatures
//         ? Header_ColumnSizing
//         : never)
//     | ('columnResizingFeature' extends keyof TFeatures
//         ? Header_ColumnResizing
//         : never)
//   >

export type Header<
  TFeatures extends TableFeatures,
  TData extends RowData,
  TValue extends CellData = CellData,
> = Header_Core<TFeatures, TData, TValue> &
  ExtractFeatureTypes<TFeatures, 'Header'> &
  Header_Plugins<TFeatures, TData, TValue>
