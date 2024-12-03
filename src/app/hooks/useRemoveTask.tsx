import { useMatrixContext } from "../context/matrixContext";

export const useRemoveTask = () => {
  const { setMatrix } = useMatrixContext();

  const removeTask = (
    quarterActiveTask: string,
    positionActiveTask: number
  ) => {
    setMatrix((prevMatrix) => {
      return prevMatrix.map((group) => {
        if (group.title === quarterActiveTask) {
          return {
            ...group,
            tasks: group.tasks.filter(
              (_, index) => index !== positionActiveTask
            ),
          };
        }
        return group;
      });
    });
  };

  return { removeTask };
};
