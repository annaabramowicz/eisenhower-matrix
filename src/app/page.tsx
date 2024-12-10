"use client";

import Matrix from "./components/Matrix";
import { MatrixContextProvider } from "./context/matrixContext";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen">
      <MatrixContextProvider>
        <div className="grid grid-cols-[3rem_1fr_1fr] grid-rows-[3rem_1fr_1fr] gap-2 w-4/5 h-4/5">
          <div className="flex items-center justify-center text-white font-bold rounded shadow">
            <button className="btn p-2">
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                {" "}
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
          </div>
          <div className="flex items-center justify-center alert rounded-md">
            URGENT
          </div>
          <div className="flex items-center justify-center alert rounded-md">
            NOT URGENT
          </div>
          <div className="flex items-center justify-center alert rounded-md [writing-mode:vertical-lr] [transform:rotate(180deg)]">
            IMPORTANT
          </div>
          <div className="row-span-2 col-span-2 flex items-center justify-center  text-white font-bold rounded shadow">
            <Matrix />
          </div>
          <div className="flex items-center justify-center alert rounded-md [writing-mode:vertical-lr] [transform:rotate(180deg)]">
            NOT IMPORTANT
          </div>
        </div>
      </MatrixContextProvider>
    </div>
  );
}
