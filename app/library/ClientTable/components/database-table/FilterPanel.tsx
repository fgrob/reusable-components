import React from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { es } from "date-fns/locale/es";

import { RowData } from "@tanstack/react-table";
import { MyColumnDef, CustomFilterOption } from "./tableTypes";

import { Badge } from "@/components/ui/badge";

registerLocale("es", es);

interface FilterPanelProps<TData extends RowData> {
  isPanelOpen: boolean;
  setIsPanelOpen: (isOpen: boolean) => void;

  columns: MyColumnDef<TData>[];

  selectedColumn: string | null;
  setSelectedColumn: (col: string | null) => void;

  dateRange: [Date | null, Date | null];
  setDateRange: (range: [Date | null, Date | null]) => void;

  customFilterValues: Record<string, string | number | boolean | [Date | null, Date | null]>;
  setCustomFilterValues: (vals: Record<string, string | number | boolean | [Date | null, Date | null]>) => void;

  applyFilters: () => void;

  customFilterOptions?: CustomFilterOption<TData>[];
  removeFilter: (columnId: string) => void;
}

export function FilterPanel<TData extends RowData>({
  isPanelOpen,
  setIsPanelOpen,
  columns,
  selectedColumn,
  setSelectedColumn,
  dateRange,
  setDateRange,
  customFilterValues,
  setCustomFilterValues,
  applyFilters,
  customFilterOptions = [],
}: FilterPanelProps<TData>) {
  // Si `MyColumnDef` ya asegura `accessorKey` y `header`, no es necesario mapear
  const dateColumns = columns.filter((col) => col.meta?.dateFilter);
  const customFilterColumns = columns.filter((col) =>
    customFilterOptions.some((opt) => opt.columnId === col.accessorKey)
  );

  const selectedColumnData = selectedColumn
    ? columns.find((col) => col.accessorKey === selectedColumn)
    : null;

  const selectedColumnMeta = selectedColumnData?.meta;

  // Manejador para filtros custom
  const handleCustomFilterChange = (
    columnId: string,
    value: string | number | [Date | null, Date | null]
  ) => {
    setCustomFilterValues({
      ...customFilterValues,
      [columnId]: value === "all" ? "" : value,
    });
  };

  return (
    <Sheet open={isPanelOpen} onOpenChange={setIsPanelOpen}>
      <SheetContent side="right" className="p-4">
        <SheetHeader>
          <SheetTitle className="text-lg font-medium text-gray-700 mb-2 text-center">
            Filtros
          </SheetTitle>
        </SheetHeader>

        {/* SELECT para elegir la columna de fecha */}
        {dateColumns.length > 0 && (
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">
              Fecha a Filtrar
            </label>
            <Select
              onValueChange={(value) => setSelectedColumn(value)}
              value={selectedColumn || ""}
            >
              <SelectTrigger className="w-full">
                <span>
                  {selectedColumnData?.header ||
                    "Seleccione la columna de fecha"}
                </span>
              </SelectTrigger>
              <SelectContent>
                {dateColumns.map((col) => (
                  <SelectItem key={col.accessorKey} value={col.accessorKey}>
                    {col.header}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Si hay columna de fecha seleccionada, mostramos datepickers */}
        {selectedColumn && selectedColumnMeta?.dateFilter && (
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-bold">Rango de Fechas</label>
              {(dateRange[0] || dateRange[1]) && (
                <Badge
                  variant="secondary"
                  className="text-xs pl-2 pr-1 py-0.5 h-auto cursor-pointer bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 transition-colors duration-200"
                  onClick={() => setDateRange([null, null])}
                >
                  <div className="flex items-center gap-1.5">
                    <span>Limpiar fechas</span>
                    <button className="text-red-400 hover:text-red-600 font-medium transition-colors duration-200">
                      ×
                    </button>
                  </div>
                </Badge>
              )}
            </div>
            <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
              <DatePicker
                selected={dateRange[0]}
                onChange={(date) => setDateRange([date, dateRange[1]])}
                selectsStart
                startDate={dateRange[0]}
                endDate={dateRange[1]}
                className="w-full border border-gray-300 rounded-md p-2"
                placeholderText="Desde"
                dateFormat="dd/MM/yyyy"
                locale="es"
              />
              <DatePicker
                selected={dateRange[1]}
                onChange={(date) => setDateRange([dateRange[0], date])}
                selectsEnd
                startDate={dateRange[0]}
                endDate={dateRange[1]}
                className="w-full border border-gray-300 rounded-md p-2"
                placeholderText="Hasta"
                dateFormat="dd/MM/yyyy"
                locale="es"
              />
            </div>
          </div>
        )}

        {/* Un Select por cada columna que tenga un filtro custom */}
        {customFilterColumns.map((col) => {
          const customFilter = customFilterOptions.find(
            (opt) => opt.columnId === col.accessorKey
          );
          const currentValue =
            customFilterValues[col.accessorKey] === ""
              ? "all"
              : customFilterValues[col.accessorKey] ?? "all";

          return (
            <div className="mb-4" key={col.accessorKey}>
              <label className="block text-sm font-bold mb-2">
                {col.header}
              </label>
              <Select
                value={currentValue === "all" ? "" : String(currentValue)}  
                onValueChange={(val) =>
                  handleCustomFilterChange(col.accessorKey, val)
                }
              >
                <SelectTrigger className="w-full">
                  <span>
                    {currentValue === "all" ? "Cualquiera" : String(currentValue)}
                  </span>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Cualquiera</SelectItem>
                  {customFilter?.filterValues?.map((option) => (
                    <SelectItem key={String(option)} value={String(option)}>
                      {String(option)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          );
        })}

        <SheetFooter className="flex justify-end space-x-2">
          <Button variant="secondary" onClick={() => setIsPanelOpen(false)}>
            Cancelar
          </Button>
          <Button
            onClick={() => {
              applyFilters();
              setIsPanelOpen(false); // Añadir esta línea
            }}
            disabled={
              !selectedColumn && Object.keys(customFilterValues).length === 0
            }
          >
            Aplicar
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default FilterPanel;
