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
    // lv1
    // dispatch({ type: "[Cart] - Add Product", payload: product }); // This duplicates the same product instead of adding it
    // lv2
    // const productsIncart = state.cart.filter(p => p._id !== product._id && p.size !== p.size); // This function overwrites the cart state instead of adding it
    // dispatch({ type: "[Cart] - Add Product", payload: [...productsIncart, product]})
    // final solution
    const productInCart = state.cart.some((p) => p._id === product._id);

    if (!productInCart)
      return dispatch({
        type: "[Cart] - Update products in cart",
        payload: [...state.cart, product],
      });

    const productInCartButDifferentSize = state.cart.some(
      (p) => p._id === product._id && p.size === product.size
    );
    if (!productInCartButDifferentSize)
      return dispatch({
        type: "[Cart] - Update products in cart",
        payload: [...state.cart, product],
      });

    // Accumulate
    const updatedProducts = state.cart.map((p) => {
      if (p._id !== product._id) return p;
      if (p.size !== product.size) return p;

      // update quantity
      p.quantity += product.quantity;
      return p;
    });

    dispatch({
      type: "[Cart] - Update products in cart",
      payload: updatedProducts,
    });
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
