import * as Qwik from '@builder.io/qwik'
import { constructTable, isFunction } from '@tanstack/table-core'
import type {
  RowData,
  Table,
  TableFeatures,
  TableOptions,
} from '@tanstack/table-core'

export * from '@tanstack/table-core'

type QwikComps = Qwik.Component | Qwik.FunctionComponent

const isQwikComponent = (comp: unknown): comp is QwikComps =>
  isFunction(comp) && comp.name === 'QwikComponent'

export function flexRender<TProps extends object>(
  Comp: any, // TODO: add renderable type
  props: TProps,
) {
  return !Comp ? null : isQwikComponent(Comp) ? (
    <Comp {...props} />
  ) : isFunction(Comp) ? (
    Comp(props)
  ) : (
    Comp
  )
}

export function useTable<
  TFeatures extends TableFeatures,
  TData extends RowData,
>(options: TableOptions<TFeatures, TData>) {
  // Compose in the generic options to the user options
  const resolvedOptions: TableOptions<TFeatures, TData> = {
    state: {},
    onStateChange: () => {},
    renderFallbackValue: null,
    ...options,
  }

  // Create a new table instance and store it in a Qwik store
  const table = Qwik.useStore<{
    instance: Qwik.NoSerialize<Table<TFeatures, TData>>
  }>({
    instance: Qwik.noSerialize(constructTable(resolvedOptions)),
  })

  // By default, manage table state here using the table's initial state
  const state = Qwik.useSignal(table.instance!.initialState)

  // Compose the default state above with any user state. This will allow the user
  // to only control a subset of the state if desired.
  table.instance!.setOptions((prev) => ({
    ...prev,
    ...options,
    state: {
      ...state.value,
      ...options.state,
    },
    // Similarly, we'll maintain both our internal state and any user-provided
    // state.
    onStateChange: (updater) => {
      state.value = isFunction(updater) ? updater(state.value) : updater
      options.onStateChange?.(updater)
    },
  }))

  return table.instance! as Table<TFeatures, TData>
}
