import { format } from "date-fns";
import { es } from "date-fns/locale";

// Formato local (ej: "15/01/2024")
export const formatDate = (dateString: Date) => {
  if (!dateString) return "";
  const date = dateString;
  return format(date, "dd/MM/yyyy", { locale: es });
};

// Formato rango (ej: "15/01/2024 - 20/01/2024")
export const formatDateRange = (range: [Date | null, Date | null]) => {
  const [start, end] = range;
  const formattedStart = start
    ? format(start, "dd/MM/yyyy", { locale: es })
    : "N/A";
  const formattedEnd = end ? format(end, "dd/MM/yyyy", { locale: es }) : "N/A";
  return `${formattedStart} - ${formattedEnd}`;
};