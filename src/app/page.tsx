import { getQuartersAction } from "./actions/actions";
import MatrixGrid from "./components/MatrixGrid";
import { MatrixContextProvider } from "./context/matrixContext";

export default async function Home() {
  const quarters = await getQuartersAction();

  return (
    <div className="flex justify-center h-screen">
      <MatrixContextProvider>
        <MatrixGrid matrix={quarters} />
      </MatrixContextProvider>
    </div>
  );
}
