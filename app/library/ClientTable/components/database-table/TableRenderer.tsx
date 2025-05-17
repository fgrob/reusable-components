// TableRenderer.tsx
import React from "react";
import {
  flexRender,
  Table as ReactTable,
  RowData,
} from "@tanstack/react-table";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

interface TableRendererProps<TData extends RowData> {
  table: ReactTable<TData>;
}

export function TableRenderer<TData extends RowData>({
  table,
}: TableRendererProps<TData>) {
  return (
    <div className="w-full">
      <table className="w-full table-auto border-separate border-spacing-0 text-sm bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="sticky top-0 bg-gray-200 z-10">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="shadow-md">
              {headerGroup.headers.map((header) => {
                const isSorted = header.column.getIsSorted();
                const canSort = header.column.getCanSort();
                const meta = header.column.columnDef.meta as {
                  className?: string;
                  dateFilter?: boolean;
                  width?: string;     // Nuevo: ancho personalizable por columna
                  minWidth?: string;  // Nuevo: ancho mínimo personalizable
                } | undefined;

                return (
                  <th
                    key={header.id}
                    onClick={() => {
                      if (!canSort) return;
                      if (isSorted === "asc") {
                        header.column.toggleSorting(true);
                      } else if (isSorted === "desc") {
                        header.column.toggleSorting(false);
                      } else {
                        header.column.toggleSorting(false);
                      }
                    }}
                    className={`
                      ${canSort ? "cursor-pointer" : ""}
                      p-2 sm:p-3
                      bg-gray-200
                      text-xs sm:text-base font-bold
                      ${meta?.className || ""}
                    `}
                    style={{
                      width: meta?.width || 'auto',
                      minWidth: meta?.minWidth || '100px',
                    }}
                  >
                    <div className="flex items-center gap-1 justify-between">
                      <span className="flex-1 truncate">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </span>
                      {canSort && (
                        <span className="flex-none">
                          {isSorted ? (
                            isSorted === "asc" ? (
                              <FaSortUp size={14} className="text-blue-400" />
                            ) : (
                              <FaSortDown size={14} className="text-blue-400" />
                            )
                          ) : (
                            <FaSort size={14} className="text-gray-500" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-b last:border-0 hover:bg-gray-100">
              {row.getVisibleCells().map((cell) => {
                const meta = cell.column.columnDef.meta as {
                  className?: string;
                  dateFilter?: boolean;
                } | undefined;

                return (
                  <td
                    key={cell.id}
                    className={`
                      border-b border-r border-gray-300 
                      px-4 py-1 
                      text-sm text-gray-600
                      overflow-hidden text-ellipsis
                      ${meta?.className || ""}
                    `}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
