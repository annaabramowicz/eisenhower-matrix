import { getQuartersFromDB } from "./actions/actions";
import MatrixGrid from "./components/MatrixGrid";
import { MatrixContextProvider } from "./context/matrixContext";

export default async function Home() {
  const quarters = await getQuartersFromDB();

  return (
    <div className="flex justify-center h-screen">
      <MatrixContextProvider>
        <MatrixGrid matrix={quarters} />
      </MatrixContextProvider>
    </div>
  );
}
