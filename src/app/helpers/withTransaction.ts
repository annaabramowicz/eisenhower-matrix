import mongoose from "mongoose";

export const withTransaction = async <Result>(
  query: (session: mongoose.ClientSession) => Promise<Result>
): Promise<Result> => {
  const transaction = await mongoose.startSession();
  transaction.startTransaction();

  try {
    const result = await query(transaction);
    await transaction.commitTransaction();
    return result;
  } catch (error) {
    await transaction.abortTransaction();
    throw error;
  } finally {
    transaction.endSession();
  }
};
