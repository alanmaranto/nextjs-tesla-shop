import { ICartProduct } from "interfaces";
import { CartState } from "./CartProvider";

type CartActionType =
  | {
      type: "[Cart] - LoadCart from cookies | storage";
      payload: ICartProduct[];
    }
  | {
      type: "[Cart] - Add product";
      payload: ICartProduct;
    };

export const cartReducer = (
  state: CartState,
  action: CartActionType
): CartState => {
  switch (action.type) {
    case "[Cart] - LoadCart from cookies | storage":
      return { ...state };

    default:
      return state;
  }
};
