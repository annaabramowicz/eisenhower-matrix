"use client";

import MatrixGrid from "./components/MatrixGrid";
import { MatrixContextProvider } from "./context/matrixContext";

export default function Home() {
  return (
    <div className="flex justify-center h-screen">
      <MatrixContextProvider>
        <MatrixGrid />
      </MatrixContextProvider>
    </div>
  );
}
