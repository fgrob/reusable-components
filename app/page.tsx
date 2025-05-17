// app/page.tsx
"use client";

import Link from "next/link";

const COMPONENTS = [
  {
    name: "Tabla de Frontend",
    path: "/library/ClientTable/example",
    description:
      "Tabla interactiva donde la búsqueda y filtros se hacen en el frontend. Ideal para cantidades moderadas de datos.",
    readme: "/readme?path=library/ClientTable/README.md",
    framework: "Next.js",
  },
  // Agrega más componentes aquí
];

export default function Home() {
  return (
    <main className="min-h-screen p-6 bg-gray-50 text-gray-900">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Librería de Componentes</h1>
        <table className="w-full table-auto border border-gray-300 rounded overflow-hidden bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-3 border-b">Nombre</th>
              <th className="text-left p-3 border-b">Descripción</th>
              <th className="text-left p-3 border-b">Framework</th>
              <th className="text-left p-3 border-b">Documentación</th>
            </tr>
          </thead>
          <tbody>
            {COMPONENTS.map((comp) => (
              <tr key={comp.name} className="hover:bg-gray-50">
                <td className="p-3 border-b font-medium text-blue-600">
                  <Link href={comp.path} className="hover:underline">
                    {comp.name}
                  </Link>
                </td>
                <td className="p-3 border-b text-sm text-gray-700">
                  {comp.description}
                </td>
                <td className="p-3 border-b text-sm text-gray-700">
                  {comp.framework}
                </td>
                <td className="p-3 border-b text-sm">
                  <Link
                    href={comp.readme}
                    className="text-blue-500 hover:underline"
                  >
                    Ver README
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
