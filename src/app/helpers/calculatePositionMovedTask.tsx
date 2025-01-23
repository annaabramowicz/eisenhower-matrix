import { Matrix, QuarterTitle } from "../types/matrixTypes";

export const calculatePosition = (
  currentQuarter: QuarterTitle,
  targetQuarter: QuarterTitle,
  currentPosition: number | null,
  targetPosition: number | undefined,
  isTargetQuarterEmpty: boolean,
  matrix: Matrix
): number => {
  if (currentPosition === null) throw new Error("Current position cannot be null");

  if (currentQuarter === targetQuarter) {
    if (targetPosition === undefined) return isTargetQuarterEmpty ? 0 : matrix[targetQuarter].tasks.length - 1;
    if (targetPosition === 0) return 0;
    if (targetPosition < currentPosition) return targetPosition;
    if (targetPosition > currentPosition) return targetPosition - 1;
    if (targetPosition === currentPosition && targetPosition === matrix[targetQuarter].tasks.length - 1) {
      return targetPosition;
    }
  } else {
    if (isTargetQuarterEmpty) return 0;
    if (targetPosition === 0) return 0;
    if (targetPosition === undefined) return matrix[targetQuarter].tasks.length;
    return targetPosition;
  }

  throw new Error("Unable to calculate position based on the provided parameters");
};
