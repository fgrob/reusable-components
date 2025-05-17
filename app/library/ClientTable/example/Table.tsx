// library/ClientTable/example/Table.tsx

"use client";

import React from "react";
import { TableContainer } from "../components/database-table/TableContainer";
import { mockData } from "./data";
import { formatDate } from "../components/database-table/dateUtils";
import { MyColumnDef, CustomFilterOption } from "../components/database-table/tableTypes";

// Tipo base (puedes refinar esto si defines una interfaz global después)
type Row = typeof mockData[number];

const Table: React.FC = () => {
  const columns: MyColumnDef<Row>[] = [
    {
      accessorKey: "receptionDate",
      header: "Recepción",
      cell: ({ row }) => formatDate(row.original.receptionDate),
      meta: {
        dateFilter: true,
        className: "whitespace-nowrap",
        width: "120px",
        minWidth: "100px",
      },
      enableGlobalFilter: false,
    },
    {
      accessorKey: "invoiceType",
      header: "Tipo",
      accessorFn: (row) => row.invoiceType.name,
      cell: ({ row }) => row.original.invoiceType.name,
      meta: {
        className: "whitespace-nowrap",
        width: "100px",
        minWidth: "90px",
      },
      enableGlobalFilter: true,
    },
    {
      accessorKey: "entity",
      header: "Entidad",
      cell: ({ row }) => row.original.entity,
      meta: {
        className: "whitespace-nowrap font-bold",
        width: "180px",
        minWidth: "150px",
      },
      enableGlobalFilter: true,
    },
    {
      accessorKey: "amount",
      header: "Monto",
      cell: ({ row }) => `$${row.original.amount.toLocaleString()}`,
      meta: {
        className: "whitespace-nowrap text-red-500",
        width: "150px",
        minWidth: "130px",
      },
      enableGlobalFilter: true,
    },
    {
      accessorKey: "status",
      header: "Estado",
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <span
            className={`px-2 py-1 rounded ${
              status === "PENDIENTE"
                ? "bg-red-500 text-white"
                : "bg-green-500 text-white"
            }`}
          >
            {status}
          </span>
        );
      },
      meta: {
        className: "whitespace-nowrap",
        width: "120px",
        minWidth: "100px",
      },
      enableGlobalFilter: false,
    },
  ];

  const filters: CustomFilterOption<Row>[] = [
    {
      columnId: "status",
      filterValues: ["PENDIENTE", "PAGADO"],
      filterFn: (row, columnId, value) => row.getValue(columnId) === value,
    },
    {
      columnId: "entity",
      filterValues: Array.from(new Set(mockData.map((i) => i.entity))),
      filterFn: (row, columnId, value) => row.getValue(columnId) === value,
    },
    {
      columnId: "invoiceType",
      filterValues: Array.from(new Set(mockData.map((i) => i.invoiceType.name))),
      filterFn: (row, columnId, value) => row.getValue(columnId) === value,
    },
  ];

  return (
    <TableContainer
      data={mockData}
      columns={columns}
      initialState={{
        sorting: [{ id: "receptionDate", desc: true }],
      }}
      filterOptions={{ customFilters: filters }}
      sumColumnKey="amount"
    />
  );
};

export default Table;
