"use client";

import { Dispatch, SetStateAction } from "react";

type Items = {
  title: string;
  items: string[];
}[];

export const useRemoveItem = (setItems: Dispatch<SetStateAction<Items>>) => {
  const removeItem = (groupActiveItem: string, positionActiveItem: number) => {
    setItems((prevItem: Items) => {
      return prevItem.map((group) => {
        if (group.title === groupActiveItem) {
          return {
            ...group,
            items: group.items.filter(
              (_, index) => index !== positionActiveItem
            ),
          };
        }
        return group;
      });
    });
  };
  return removeItem;
};
