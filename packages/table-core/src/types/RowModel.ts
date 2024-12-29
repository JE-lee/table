import type { stockFeatures } from '../features/stockFeatures'
import type { CreateRowModel_Core } from '../core/row-models/coreRowModelsFeature.types'
import type { RowData } from './type-utils'
import type { ExtractFeatureTypes, TableFeatures } from './TableFeatures'

// export type CreateRowModels<
//   TFeatures extends TableFeatures,
//   TData extends RowData,
// > = CreateRowModel_Core<TFeatures, TData> &
//   UnionToIntersection<
//     | ('columnFacetingFeature' extends keyof TFeatures
//         ? CreateRowModel_Faceted<TFeatures, TData>
//         : never)
//     | ('columnFilteringFeature' extends keyof TFeatures
//         ? CreateRowModel_Filtered<TFeatures, TData>
//         : never)
//     | ('rowExpandingFeature' extends keyof TFeatures
//         ? CreateRowModel_Expanded<TFeatures, TData>
//         : never)
//     | ('columnGroupingFeature' extends keyof TFeatures
//         ? CreateRowModel_Grouped<TFeatures, TData>
//         : never)
//     | ('rowPaginationFeature' extends keyof TFeatures
//         ? CreateRowModel_Paginated<TFeatures, TData>
//         : never)
//     | ('rowSortingFeature' extends keyof TFeatures
//         ? CreateRowModel_Sorted<TFeatures, TData>
//         : never)
//   >

export type CreateRowModels<
  TFeatures extends TableFeatures,
  TData extends RowData,
> = CreateRowModel_Core<TFeatures, TData> &
  ExtractFeatureTypes<TFeatures, 'CreateRowModels'>

// export type CreateRowModels_All<
//   TFeatures extends TableFeatures,
//   TData extends RowData,
// > = CreateRowModel_Core<TFeatures, TData> &
//   CreateRowModel_Expanded<TFeatures, TData> &
//   CreateRowModel_Faceted<TFeatures, TData> &
//   CreateRowModel_Filtered<TFeatures, TData> &
//   CreateRowModel_Grouped<TFeatures, TData> &
//   CreateRowModel_Paginated<TFeatures, TData> &
//   CreateRowModel_Sorted<TFeatures, TData>

export type CreateRowModels_All<TData extends RowData = RowData> =
  CreateRowModels<typeof stockFeatures, TData>

// export type CachedRowModels<
//   TFeatures extends TableFeatures,
//   TData extends RowData,
// > = {
//   CachedRowModel_Core: () => RowModel<TFeatures, TData>
// } & UnionToIntersection<
//   | ('columnFacetingFeature' extends keyof TFeatures
//       ? CachedRowModel_Faceted<TFeatures, TData>
//       : never)
//   | ('columnFilteringFeature' extends keyof TFeatures
//       ? CachedRowModel_Filtered<TFeatures, TData>
//       : never)
//   | ('rowExpandingFeature' extends keyof TFeatures
//       ? CachedRowModel_Expanded<TFeatures, TData>
//       : never)
//   | ('columnGroupingFeature' extends keyof TFeatures
//       ? CachedRowModel_Grouped<TFeatures, TData>
//       : never)
//   | ('rowPaginationFeature' extends keyof TFeatures
//       ? CachedRowModel_Paginated<TFeatures, TData>
//       : never)
//   | ('rowSortingFeature' extends keyof TFeatures
//       ? CachedRowModel_Sorted<TFeatures, TData>
//       : never)
// >

export type CachedRowModels<
  TFeatures extends TableFeatures,
  TData extends RowData,
> = ExtractFeatureTypes<TFeatures, 'CachedRowModel'>

// export type CachedRowModel_All<
//   TFeatures extends TableFeatures,
//   TData extends RowData,
// > = Partial<
//   CachedRowModel_Core<TFeatures, TData> &
//     CachedRowModel_Expanded<TFeatures, TData> &
//     CachedRowModel_Faceted<TFeatures, TData> &
//     CachedRowModel_Filtered<TFeatures, TData> &
//     CachedRowModel_Grouped<TFeatures, TData> &
//     CachedRowModel_Paginated<TFeatures, TData> &
//     CachedRowModel_Sorted<TFeatures, TData>
// >

export type CachedRowModel_All<TData extends RowData = RowData> =
  CachedRowModels<typeof stockFeatures, TData>
