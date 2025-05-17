import React, { useState, useEffect } from "react";

interface GlobalSearchInputProps {
  globalFilter: string;
  setGlobalFilter: (filter: string) => void;
  headers: string[];
}

export const GlobalSearchInput: React.FC<GlobalSearchInputProps> = ({
  globalFilter,
  setGlobalFilter,
  headers,
}) => {
  const [placeholder, setPlaceholder] = useState("");

  useEffect(() => {
    const updatePlaceholder = () => {
      if (window.innerWidth < 480) {
        setPlaceholder("Buscar"); // Placeholder para pantallas pequeñas
      } else {
        setPlaceholder(`Buscar por ${headers.join(", ")}`); // Placeholder completo
      }
    };

    // Llamar al actualizar y agregar listener
    updatePlaceholder();
    window.addEventListener("resize", updatePlaceholder);

    // Limpieza al desmontar
    return () => window.removeEventListener("resize", updatePlaceholder);
  }, [headers]);

  return (
    <input
      type="text"
      value={globalFilter}
      onChange={(e) => setGlobalFilter(e.target.value)}
      placeholder={placeholder}
      aria-label="Buscar en la tabla"
      className="w-full border border-gray-300 rounded-md text-sm p-2"
    />
  );
};
