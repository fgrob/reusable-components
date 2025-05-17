// filterUtils.ts
import { FilterFn, RowData, Row, ColumnFiltersState } from "@tanstack/react-table";
import { MyColumnDef, MyColumnMeta, CustomFilterOption, GenericFilterValue } from "./tableTypes";

// Filtro de rango de fechas
export const dateRangeFilter: FilterFn<RowData> = (row, columnId, filterValue) => {
  const [start, end] = filterValue as [Date | null, Date | null];
  const cellValue = new Date(row.getValue(columnId));

  // Validaciones
  if (start && !(start instanceof Date)) {
    return false;
  }
  if (end && !(end instanceof Date)) {
    return false;
  }

  // Comparaciones
  if (start && cellValue < new Date(start.setHours(0, 0, 0, 0))) {
    return false;
  }
  if (end && cellValue > new Date(end.setHours(23, 59, 59, 999))) {
    return false;
  }

  return true;
};

// Filtro de igualdad para valores simples
export const customEqualityFilter: FilterFn<RowData> = (row, columnId, filterValue) => {
  const cellValue = row.getValue(columnId);
  // Por si el valor es un objeto con .name
  if (typeof cellValue === "object" && cellValue !== null) {
    return (cellValue as { name: unknown }).name === filterValue;
  }
  return cellValue === filterValue;
};

// Asigna el filtro adecuado a una columna
export function getFilterFn<TData extends RowData>(
  column: MyColumnDef<TData>,
  filterOptions?: CustomFilterOption<TData>[]
): FilterFn<TData> | undefined {
  const columnMeta = column.meta as MyColumnMeta | undefined;
  
  if (columnMeta?.dateFilter) {
    return dateRangeFilter as FilterFn<TData>;
  }

  const customFilter = filterOptions?.find(
    (f) => f.columnId === column.accessorKey
  );
  if (customFilter) {
    const fn = customFilter.filterFn || customEqualityFilter;
    // Explicitly cast row to satisfy expected type.
    const customFilterWrapper: FilterFn<TData> = (row, columnId, filterValue, addMeta) => {
      return fn(
        row as unknown as Row<unknown> & Row<TData>,
        columnId as Extract<keyof TData, string>,
        filterValue,
        addMeta
      );
    };
    return customFilterWrapper;
  }

  return typeof column.filterFn === 'function' ? column.filterFn : undefined;
}

// Asigna el filtro adecuado a cada columna
export function enhanceColumns<TData extends RowData>(
  columns: MyColumnDef<TData>[],
  filterOptions?: {
    customFilters?: CustomFilterOption<TData>[];
  }
): MyColumnDef<TData>[] {
  return columns.map((col) => ({
    ...col,
    filterFn: getFilterFn(col, filterOptions?.customFilters),
  }));
}

// Lógica para aplicar filtros
export const applyFilters = <TData extends RowData>(
  currentFilters: ColumnFiltersState,
  selectedColumn: string | null,
  dateRange: [Date | null, Date | null],
  customFilterValues: { [key: string]: GenericFilterValue },
  columns: MyColumnDef<TData>[], 
  setColumnFilters: (filters: ColumnFiltersState) => void
) => {
  // Start with current filters, excluding date and custom filters that will be updated
  const newFilters: ColumnFiltersState = currentFilters.filter(
    (f) => {
      const isDateFilter = columns.find((col) => col.accessorKey === f.id && col.meta?.dateFilter);
      const isCustomFilter = Object.keys(customFilterValues).includes(f.id);
      return !isDateFilter && !isCustomFilter;
    }
  );

  // Add date filter if dates are selected
  if (selectedColumn && (dateRange[0] || dateRange[1])) {
    newFilters.push({
      id: selectedColumn,
      value: dateRange,
    });
  }

  // Add custom filters (only if value is not empty and not "all")
  Object.entries(customFilterValues).forEach(([key, value]) => {
    if (value !== "" && value !== "all") {
      newFilters.push({
        id: key,
        value: value,
      });
    }
  });

  setColumnFilters(newFilters);
};
