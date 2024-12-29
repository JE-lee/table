import type { coreFeatures } from '../core/coreFeatures'
import type { ExtractFeatureTypes, TableFeatures } from './TableFeatures'
import type { RowData } from './type-utils'

export interface HeaderGroup_Plugins<
  TFeatures extends TableFeatures,
  TData extends RowData,
> {}

// export interface HeaderGroup_Core<
//   TFeatures extends TableFeatures,
//   TData extends RowData,
// > extends HeaderGroup_Header<TFeatures, TData>,
//     HeaderGroup_Plugins {}

export type HeaderGroup_Core<
  TFeatures extends TableFeatures,
  TData extends RowData,
> = ExtractFeatureTypes<typeof coreFeatures, 'HeaderGroup'>

// export interface HeaderGroup<
//   TFeatures extends TableFeatures,
//   TData extends RowData,
// > extends HeaderGroup_Core<TFeatures, TData> {}

export type HeaderGroup<
  TFeatures extends TableFeatures,
  TData extends RowData,
> = HeaderGroup_Core<TFeatures, TData> &
  ExtractFeatureTypes<TFeatures, 'HeaderGroup'> &
  HeaderGroup_Plugins<TFeatures, TData>
