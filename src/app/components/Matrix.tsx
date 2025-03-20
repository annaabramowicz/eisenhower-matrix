import { useMatrixContext } from "../context/matrixContext";
import { quarterTitleSchema } from "../types/zodSchemas";
import Quarter from "./Quarter";

const Matrix = () => {
  const { matrix } = useMatrixContext();

  return (
    <div className="grid grid-cols-2 grid-rows-2 h-full w-full m-auto gap-2">
      {matrix.map((quarter) => {
        const parsedQuarterTitle = quarterTitleSchema.safeParse(quarter.quarterTitle);
        if (!parsedQuarterTitle.success) {
          console.error("Invalid quarterTitle:", quarter.quarterTitle);
          return;
        }

        return (
          <Quarter key={quarter.quarterTitle} quarterTasks={quarter.tasks} quarterTitle={parsedQuarterTitle.data} />
        );
      })}
    </div>
  );
};

export default Matrix;
