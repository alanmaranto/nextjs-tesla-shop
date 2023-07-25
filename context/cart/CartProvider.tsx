import { ICartProduct } from "interfaces";
import { FC, PropsWithChildren, useReducer } from "react";
import { CartContext, cartReducer } from "./";

type Props = {};

export interface CartState {
  cart: ICartProduct[];
}

const CART_INITIAL_STATE: CartState = {
  cart: [],
};

export const CartProvider: FC<PropsWithChildren<Props>> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

  const addProductToCart = (product: ICartProduct) => {
    const { _id, size, quantity } = product;
    const productInCart = state.cart.some((p) => p._id === _id);

    if (!productInCart) {
      dispatch({
        type: "[Cart] - Update products in cart",
        payload: [...state.cart, product],
      });
      return;
    }

    const productInCartWithSameSize = state.cart.some(
      (p) => p._id === _id && p.size === size
    );

    if (productInCartWithSameSize) {
      const updatedProducts = state.cart.map((p) =>
        p._id === _id && p.size === size
          ? { ...p, quantity: p.quantity + quantity }
          : p
      );

      dispatch({
        type: "[Cart] - Update products in cart",
        payload: updatedProducts,
      });
    } else {
      dispatch({
        type: "[Cart] - Update products in cart",
        payload: [...state.cart, product],
      });
    }
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addProductToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
