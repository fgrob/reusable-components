// TableContainer.tsx
"use client";

import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,  
  RowData,
  PaginationState,
  SortingState,
  ColumnFiltersState
} from "@tanstack/react-table";

import { FilterPanel } from "./FilterPanel";
import { GlobalSearchInput } from "./GlobalSearchInput";
import { TableRenderer } from "./TableRenderer";
import { Button } from "@/components/ui/button";
import { PaginationControls } from "./PaginationControls";

import { MyColumnDef, CustomFilterOption, GenericFilterValue } from "./tableTypes"; 
import { applyFilters, enhanceColumns } from "./filterUtils";
import { ActiveFiltersBadgeList } from "./ActiveFiltersBadgeList";
import { formatDateRange } from "./dateUtils";

// Updated type for initial state using ColumnFiltersState
interface TableInitialState {
  columnFilters?: ColumnFiltersState;
  pagination?: PaginationState;
  sorting?: SortingState;
}

interface TableContainerProps<TData extends RowData> {
  data: TData[];
  columns: MyColumnDef<TData>[];
  initialState?: TableInitialState;
  filterOptions?: {
    customFilters?: CustomFilterOption<TData>[];
  };
  sumColumnKey?: keyof TData;
}

export function TableContainer<TData extends RowData>({
  data,
  columns,
  initialState,
  filterOptions,
  sumColumnKey,

}: TableContainerProps<TData>) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    initialState?.columnFilters || []
  );
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const [selectedColumn, setSelectedColumn] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [customFilterValues, setCustomFilterValues] = useState<Record<string, GenericFilterValue>>({}); 

  // Añadir estados para paginación
  const [pageSize, setPageSize] = useState(50);
  const [pageIndex, setPageIndex] = useState(0);

  // Enhance columns para asignar filterFn según meta o customFilters.
  const enhancedColumns = enhanceColumns(columns, filterOptions);

  // Instanciamos la tabla con React Table
  const table = useReactTable<TData>({
    data,
    columns: enhancedColumns,
    state: {
      globalFilter,
      columnFilters,
      pagination: {  // Añadir esto
        pageSize,
        pageIndex,
      },
    },
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    // Asegurarnos que el orden de los modelos sea correcto
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(), // Mover antes del sorting
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      ...initialState,
      pagination: {
        pageSize: 10,
        pageIndex: 0,
      },
    },
    manualPagination: false, // Agregar esto para indicar que la paginación es automática
    onPaginationChange: (updater) => {
      const newState = 
        typeof updater === 'function' 
          ? updater(table.getState().pagination)
          : updater;
      
      setPageIndex(newState.pageIndex);
      setPageSize(newState.pageSize);
    },
  });

  // Remover un filtro cuando el usuario hace clic en un badge
  const removeFilter = (columnId: string) => {
    setPageIndex(0); // Resetear a primera página
    setColumnFilters((prev) => prev.filter((filter) => filter.id !== columnId));
    
    // Clear date range if it's a date column
    if (selectedColumn === columnId) {
      setSelectedColumn(null);
      setDateRange([null, null]);
    }

    // Clear custom filter value if it exists
    if (customFilterValues[columnId]) {
      setCustomFilterValues((prev) => {
        const newValues = { ...prev };
        delete newValues[columnId];
        return newValues;
      });
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Panel de filtros - fijo */}
      <div className="flex-none bg-white">
        <div className="flex flex-col gap-2 px-1 mb-1">
          <div className="flex gap-2 items-center">
            <div className="flex-1">
              <GlobalSearchInput
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
                headers={columns
                  .filter((col) => col.enableGlobalFilter)
                  .map((col) => col.header ?? "")}
              />
            </div>
            <Button onClick={() => setIsPanelOpen(true)}>Filtros</Button>
          </div>

          <ActiveFiltersBadgeList
            columnFilters={columnFilters}
            columns={columns}
            removeFilter={removeFilter}
            formatDateRange={formatDateRange}
          />
        </div>
      </div>

      {/* Contenedor de la tabla con scroll */}
      <div className="flex-1 overflow-auto border-y">
        <TableRenderer table={table} />
      </div>

      {/* Paginación - fija */}
      <div className="flex-none bg-white">
        <PaginationControls 
          table={table}
          pageSize={pageSize}
          setPageSize={setPageSize}
          sumColumnKey={sumColumnKey}
        />
      </div>

      {/* FilterPanel lateral */}
      <FilterPanel
        isPanelOpen={isPanelOpen}
        setIsPanelOpen={setIsPanelOpen}
        columns={columns}
        selectedColumn={selectedColumn}
        setSelectedColumn={setSelectedColumn}
        dateRange={dateRange}
        setDateRange={setDateRange}
        customFilterValues={customFilterValues}
        setCustomFilterValues={setCustomFilterValues}
        applyFilters={() => {
          setPageIndex(0); // Resetear a primera página
          applyFilters(
            columnFilters,
            selectedColumn,
            dateRange,
            customFilterValues,
            columns,
            setColumnFilters
          );
        }}
        customFilterOptions={filterOptions?.customFilters}
        removeFilter={removeFilter}
      />
    </div>
  );
}

export default TableContainer;
