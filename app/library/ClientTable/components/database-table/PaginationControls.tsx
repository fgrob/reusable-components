import React, { useMemo } from "react";
import { Table } from "@tanstack/react-table";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface PaginationControlsProps<TData> {
  table: Table<TData>;
  pageSize: number;
  setPageSize: (size: number) => void;
  sumColumnKey?: keyof TData;
}

export function PaginationControls<TData>({
  table,
  pageSize,
  setPageSize,
  sumColumnKey,
}: PaginationControlsProps<TData>) {
  const total = useMemo(() => {
    if (!sumColumnKey) return null;
    return table.getFilteredRowModel().rows.reduce((sum, row) => {
      const value = row.original[sumColumnKey];
      return typeof value === "number" ? sum + value : sum;
    }, 0);
    // Agregamos dependency a la lista de filas filtradas para que cambie al quitar/añadir filtros
  }, [table.getFilteredRowModel().rows, sumColumnKey]);

  return (
    <div
      className="
        flex
        flex-nowrap
        items-center
        justify-between
        gap-2
        px-4
        py-2
        bg-white
        border-t
        overflow-x-auto
      "
    >
      {/* Sección izquierda: Botones de navegación y texto de página */}
      <div className="flex items-center gap-2">
        <button
          className="px-2 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </button>
        <button
          className="px-2 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Siguiente
        </button>
        <div className="hidden sm:flex items-center gap-1 text-sm">
          <span>Página</span>
          <strong>
            {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
          </strong>
        </div>
      </div>

      {/* Sección derecha: Total y Select para la paginación */}
      <div className="flex items-center gap-4 flex-shrink-0">
        {sumColumnKey && (
          <div className="text-base font-semibold text-gray-800 whitespace-nowrap">
            Total: {total !== null ? `$${total.toLocaleString()}` : "..."}
          </div>
        )}
        <Select
          value={pageSize.toString()}
          onValueChange={(value) => setPageSize(Number(value))}
        >
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Seleccionar cantidad" />
          </SelectTrigger>
          <SelectContent position="popper" side="top">
            {[10, 20, 30, 40, 50, 100].map((size) => (
              <SelectItem key={size} value={size.toString()}>
                Mostrar {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
