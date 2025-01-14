import MatrixGrid from "./components/MatrixGrid";
import { MatrixContextProvider } from "./context/matrixContext";

// const response = await fetch("http://localhost:3000/api", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({
//     id: "01",
//     title: "przykladowy tytul",
//   }),
// });

// const data = await response.json();

// console.log(data);

export default function Home() {
  return (
    <div className="flex justify-center h-screen">
      <MatrixContextProvider>
        <MatrixGrid />
      </MatrixContextProvider>
    </div>
  );
}
