// tableTypes.ts
import { Row, RowData, AccessorKeyColumnDef } from "@tanstack/react-table";

export interface MyColumnMeta {
  className?: string;
  dateFilter?: boolean;
  width?: string; // Nuevo: ancho personalizable
  minWidth?: string; // Nuevo: ancho mínimo personalizable
}

export type MyColumnDef<TData extends RowData> = Omit<
  AccessorKeyColumnDef<TData>,
  "accessorKey" | "header"
> & {
  accessorKey: string;
  accessorFn?: (row: TData) => unknown;
  header?: string;
  meta?: MyColumnMeta;
};

// Tipos para filtros genéricos
export type GenericFilterValue = string | number | boolean | [Date | null, Date | null];
export type GenericColumnId<TData> = keyof TData;

export type CustomFilterOption<TData> = {
  columnId: Extract<keyof TData, string>;
  filterValues: GenericFilterValue[];
  filterFn?: (
    row: Row<TData>,
    columnId: Extract<keyof TData, string>,
    filterValue: GenericFilterValue,
    addMeta?: unknown
  ) => boolean;
};
