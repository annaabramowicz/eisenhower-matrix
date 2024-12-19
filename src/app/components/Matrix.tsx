import { useMatrixContext } from "../context/matrixContext";
import { quarterTitleSchema } from "../types/zodSchemas";
import Quarter from "./Quarter";

const Matrix = () => {
  const { matrix } = useMatrixContext();

  return (
    <div className="grid grid-cols-2 grid-rows-2 h-full w-full m-auto gap-2">
      {Object.entries(matrix).map(([quarterTitle, quarterData]) => {
        const parsedQuarterTitle = quarterTitleSchema.safeParse(quarterTitle);
        if (!parsedQuarterTitle.success) {
          console.error("Invalid quarterTitle:", quarterTitle);
          return;
        }

        return <Quarter key={quarterTitle} quarterTasks={quarterData} quarterTitle={parsedQuarterTitle.data} />;
      })}
    </div>
  );
};

export default Matrix;
