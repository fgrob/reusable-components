import React from "react";
import { Badge } from "@/components/ui/badge";
import { MyColumnDef } from "./tableTypes";
import { RowData, ColumnFiltersState } from "@tanstack/react-table";

interface ActiveFiltersBadgeListProps<TData extends RowData> {
  columnFilters: ColumnFiltersState;
  columns: MyColumnDef<TData>[];
  removeFilter: (columnId: string) => void;
  formatDateRange: (range: [Date | null, Date | null]) => string;
}

export const ActiveFiltersBadgeList = <TData extends RowData>({
  columnFilters,
  columns,
  removeFilter,
  formatDateRange,
}: ActiveFiltersBadgeListProps<TData>) => {
  // Helper to safely render filter value.
  const renderFilterValue = (value: unknown): string => {
    if (
      Array.isArray(value) &&
      value.length === 2 &&
      ((value[0] === null || value[0] instanceof Date) &&
        (value[1] === null || value[1] instanceof Date))
    ) {
      return formatDateRange(value as [Date | null, Date | null]);
    }
    return String(value);
  };

  if (columnFilters.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1.5 px-2">
      {columnFilters.map((filter) => {
        const colDef = columns.find((c) => c.accessorKey === filter.id);
        return (
          <Badge
            key={`${filter.id}-${filter.value}`}
            variant="secondary"
            className="text-xs pl-2 pr-1 py-0.5 h-auto cursor-pointer bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 transition-colors duration-200"
            onClick={() => removeFilter(filter.id)}
          >
            <div className="flex items-center gap-1.5">
              <div className="flex items-center">
                <span className="font-medium text-blue-900">{colDef?.header}:</span>
                <span className="ml-1 text-blue-800">
                  {renderFilterValue(filter.value)}
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFilter(filter.id);
                }}
                className="text-blue-400 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                ×
              </button>
            </div>
          </Badge>
        );
      })}
    </div>
  );
};
