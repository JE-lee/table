import type { RowData, Updater } from '../../types/type-utils'
import type { TableFeatures } from '../../types/TableFeatures'
import type { Table_Internal } from '../../types/Table'
import type { Row } from '../../types/Row'
import type { ExpandedState, ExpandedStateList } from './RowExpanding.types'

export function getDefaultExpandedState(): ExpandedState {
  return structuredClone({})
}

/**
 *
 * @param table
 * @param registered
 * @param queued
 * @returns
 */
export function table_autoResetExpanded<
  TFeatures extends TableFeatures,
  TData extends RowData,
>(table: Table_Internal<TFeatures, TData>) {
  if (
    table.options.autoResetAll ??
    table.options.autoResetExpanded ??
    !table.options.manualExpanding
  ) {
    queueMicrotask(() => table_resetExpanded(table))
  }
}

/**
 *
 * @param table
 * @param updater
 */
export function table_setExpanded<
  TFeatures extends TableFeatures,
  TData extends RowData,
>(table: Table_Internal<TFeatures, TData>, updater: Updater<ExpandedState>) {
  table.options.onExpandedChange?.(updater)
}

/**
 *
 * @param table
 * @param expanded
 */
export function table_toggleAllRowsExpanded<
  TFeatures extends TableFeatures,
  TData extends RowData,
>(table: Table_Internal<TFeatures, TData>, expanded?: boolean) {
  if (expanded ?? !table_getIsAllRowsExpanded(table)) {
    table_setExpanded(table, true)
  } else {
    table_setExpanded(table, {})
  }
}

/**
 *
 * @param table
 * @param defaultState
 */
export function table_resetExpanded<
  TFeatures extends TableFeatures,
  TData extends RowData,
>(table: Table_Internal<TFeatures, TData>, defaultState?: boolean) {
  table_setExpanded(
    table,
    defaultState ? {} : (table.options.initialState?.expanded ?? {}),
  )
}

/**
 *
 * @param table
 * @returns
 */
export function table_getCanSomeRowsExpand<
  TFeatures extends TableFeatures,
  TData extends RowData,
>(table: Table_Internal<TFeatures, TData>) {
  return table
    .getPrePaginatedRowModel()
    .flatRows.some((row) => row_getCanExpand(row, table))
}

/**
 *
 * @param table
 * @returns
 */
export function table_getToggleAllRowsExpandedHandler<
  TFeatures extends TableFeatures,
  TData extends RowData,
>(table: Table_Internal<TFeatures, TData>) {
  return (e: unknown) => {
    ;(e as any).persist?.()
    table_toggleAllRowsExpanded(table)
  }
}

/**
 *
 * @param table
 * @returns
 */
export function table_getIsSomeRowsExpanded<
  TFeatures extends TableFeatures,
  TData extends RowData,
>(table: Table_Internal<TFeatures, TData>) {
  const expanded = table.getState().expanded ?? {}
  return expanded === true || Object.values(expanded).some(Boolean)
}

/**
 *
 * @param table
 * @returns
 */
export function table_getIsAllRowsExpanded<
  TFeatures extends TableFeatures,
  TData extends RowData,
>(table: Table_Internal<TFeatures, TData>) {
  const expanded = table.getState().expanded ?? {}

  // If expanded is true, save some cycles and return true
  if (expanded === true) {
    return true
  }

  if (!Object.keys(expanded).length) {
    return false
  }

  // If any row is not expanded, return false
  if (
    table.getRowModel().flatRows.some((row) => !row_getIsExpanded(row, table))
  ) {
    return false
  }

  // They must all be expanded :shrug:
  return true
}

/**
 *
 * @param table
 * @returns
 */
export function table_getExpandedDepth<
  TFeatures extends TableFeatures,
  TData extends RowData,
>(table: Table_Internal<TFeatures, TData>) {
  let maxDepth = 0

  const rowIds =
    table.getState().expanded === true
      ? Object.keys(table.getRowModel().rowsById)
      : Object.keys(table.getState().expanded ?? {})

  rowIds.forEach((id) => {
    const splitId = id.split('.')
    maxDepth = Math.max(maxDepth, splitId.length)
  })

  return maxDepth
}

/**
 *
 * @param row
 * @param table
 * @param expanded
 */
export function row_toggleExpanded<
  TFeatures extends TableFeatures,
  TData extends RowData,
>(
  row: Row<TFeatures, TData>,
  table: Table_Internal<TFeatures, TData>,
  expanded?: boolean,
) {
  table_setExpanded(table, (old) => {
    const exists = old === true ? true : !!old[row.id]

    let oldExpanded: ExpandedStateList = {}

    if (old === true) {
      Object.keys(table.getRowModel().rowsById).forEach((rowId) => {
        oldExpanded[rowId] = true
      })
    } else {
      oldExpanded = old
    }

    expanded = expanded ?? !exists

    if (!exists && expanded) {
      return {
        ...oldExpanded,
        [row.id]: true,
      }
    }

    if (exists && !expanded) {
      const { [row.id]: _, ...rest } = oldExpanded
      return rest
    }

    return old
  })
}

/**
 *
 * @param row
 * @param table
 * @returns
 */
export function row_getIsExpanded<
  TFeatures extends TableFeatures,
  TData extends RowData,
>(row: Row<TFeatures, TData>, table: Table_Internal<TFeatures, TData>) {
  const expanded = table.getState().expanded ?? {}

  return !!(
    table.options.getIsRowExpanded?.(row) ??
    (expanded === true || expanded[row.id])
  )
}

/**
 *
 * @param row
 * @param table
 * @returns
 */
export function row_getCanExpand<
  TFeatures extends TableFeatures,
  TData extends RowData,
>(row: Row<TFeatures, TData>, table: Table_Internal<TFeatures, TData>) {
  return (
    table.options.getRowCanExpand?.(row) ??
    ((table.options.enableExpanding ?? true) && !!row.subRows.length)
  )
}

/**
 *
 * @param row
 * @param table
 * @returns
 */
export function row_getIsAllParentsExpanded<
  TFeatures extends TableFeatures,
  TData extends RowData,
>(row: Row<TFeatures, TData>, table: Table_Internal<TFeatures, TData>) {
  let isFullyExpanded = true
  let currentRow = row

  while (isFullyExpanded && currentRow.parentId) {
    currentRow = table.getRow(currentRow.parentId, true)
    isFullyExpanded = row_getIsExpanded(row, table)
  }

  return isFullyExpanded
}

/**
 *
 * @param row
 * @param table
 * @returns
 */
export function row_getToggleExpandedHandler<
  TFeatures extends TableFeatures,
  TData extends RowData,
>(row: Row<TFeatures, TData>, table: Table_Internal<TFeatures, TData>) {
  const canExpand = row_getCanExpand(row, table)

  return () => {
    if (!canExpand) return
    row_toggleExpanded(row, table)
  }
}
