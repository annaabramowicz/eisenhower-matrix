"use client";

import { Dispatch, SetStateAction } from "react";

type Items = {
  title: string;
  items: string[];
}[];

export const useAddItem = (setItems: Dispatch<SetStateAction<Items>>) => {
  const addItem = (groupTitle: string, index: number, newItem: string) => {
    setItems((prevItem: Items) => {
      return prevItem.map((group) => {
        if (group.title === groupTitle) {
          const newItems = [...group.items];
          newItems.splice(index, 0, newItem);
          return { ...group, items: newItems };
        }
        return group;
      });
    });
  };
  return addItem;
};
