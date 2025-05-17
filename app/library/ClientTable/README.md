# 📊 Librería de Componentes - Tabla Frontend

Este proyecto es una librería de componentes de uso interno, que incluye una **tabla interactiva para datos cargados en frontend**. Está pensada para ser reutilizada fácilmente en cualquier proyecto basado en Next.js + Tailwind + ShadCN. Dado que los filtros y la busqueda se hacen en frontend, no está pensada para
tablas grandes.

---

## 🚀 Requisitos y dependencias

### 📦 Dependencias necesarias:

```bash
npm install @tanstack/react-table@8.20.6 react-datepicker@7.6.0 date-fns@4.1.0 react-icons@5.4.0
```

### 🧩 ShadCN UI:

```bash
npx shadcn-ui@latest init
npx shadcn-ui@latest add badge button card select sheet
```

### 🎨 Tailwind CSS:

```bash
npm install -D tailwindcss@3.4.1 postcss autoprefixer
npx tailwindcss init -p
```

### 💫 Animaciones:

```bash
npm install tailwindcss-animate
```

---

## ⚙️ Configuración de Tailwind

### tailwind.config.js

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./library/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
};
```

### app/globals.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Asegúrate también de tener definidas las variables CSS (`--border`, `--background`, etc.) en tu `:root {}` dentro del mismo archivo.

---

## 🧠 ¿Cómo usar la tabla?

### 📄 Archivo principal: `Table.tsx`

Es el archivo que arma la tabla de ejemplo usando `TableContainer`. Aquí puedes definir:

---

### 🔧 Columnas (`columns`)

Cada columna se define con:

```ts
{
  accessorKey: "amount",
  header: "Monto",
  cell: ({ row }) => `$${row.original.amount.toLocaleString()}`,
  meta: {
    className: "text-right text-red-500 font-semibold",
    width: "120px",
    minWidth: "100px",
    dateFilter: false // si aplica filtro de rango de fechas
  },
  enableGlobalFilter: true, // incluir en búsqueda general
  enableSorting: true
}
```

#### ✅ Opciones dentro de `meta`:

* `className`: clases Tailwind aplicadas a esa columna
* `width`, `minWidth`: control del layout
* `dateFilter: true`: activa el filtro por rango de fechas usando DatePicker

#### ✅ `accessorFn`

Usar cuando el dato es anidado o requiere manipulación:

```ts
accessorFn: (row) => row.invoiceType.name,
cell: ({ row }) => row.invoiceType.name,
```

---

### 🎛️ Filtros (`customFilterOptions`)

```ts
const filters: CustomFilterOption<Row>[] = [
  {
    columnId: "status",
    filterValues: ["PAGADO", "PENDIENTE"],
    filterFn: (row, columnId, value) => row.getValue(columnId) === value
  },
  {
    columnId: "entity",
    filterValues: Array.from(new Set(data.map(i => i.entity))),
    filterFn: (row, columnId, value) => row.getValue(columnId) === value
  }
]
```

#### ✅ Opciones:

* `columnId`: nombre de columna que filtra
* `filterValues`: lista de opciones a mostrar en dropdown
* `filterFn`: lógica para saber si un valor calza con el filtro

---

### 📌 Props para `TableContainer`

```tsx
<TableContainer
  data={mockData}
  columns={columns}
  initialState={{
    sorting: [{ id: "receptionDate", desc: true }],
  }}
  filterOptions={{ customFilters: filters }}
  sumColumnKey="amount"
/>
```

* `data`: los datos a mostrar
* `columns`: definición de columnas
* `initialState`: orden inicial o filtros activos por defecto
* `filterOptions`: los filtros personalizados
* `sumColumnKey`: columna que se sumará al final

---

## ✅ ¿Cómo modificar la tabla?

1. Ve a `library/ClientTable/example/Table.tsx`
2. Cambia los campos en `columns` para ajustar qué y cómo se muestra
3. Modifica o agrega nuevos filtros en `customFilterOptions`
4. Cambia el dataset desde `data.ts`
5. Agrega más columnas, filtros, badges o condiciones de color como en un dashboard real

---

## 🧪 Extras útiles

* Puedes mostrar un `<Badge>` de estado usando ShadCN:

```tsx
<Badge variant={row.status === "PAGADO" ? "default" : "destructive"}>
  {row.status}
</Badge>
```

* También puedes combinar filtros globales y por columna
* Las columnas sin `enableGlobalFilter: true` no serán afectadas por el buscador superior

---

¿Quieres probar con datos reales o simular otros estados (como `ANULADO`, `RECHAZADO`)? Solo añade más filas al archivo `data.ts`.
