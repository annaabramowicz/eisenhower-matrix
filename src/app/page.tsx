"use client";

import Matrix from "./components/Matrix";
import { MatrixContextProvider } from "./context/matrixContext";

export default function Home() {
  return (
    <div className="h-full flex">
      <MatrixContextProvider>
        <Matrix />
      </MatrixContextProvider>
    </div>
  );
}
