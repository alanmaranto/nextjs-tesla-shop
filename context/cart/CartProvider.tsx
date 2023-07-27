import { ICartProduct } from "interfaces";
import { FC, PropsWithChildren, useEffect, useReducer } from "react";
import { CartContext, cartReducer } from "./";
import Cookie from "js-cookie";

export interface CartState {
  cart: ICartProduct[];
}

const CART_INITIAL_STATE: CartState = {
  cart: [],
};

export const CartProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

  useEffect(() => {
    try {
      const cookieProducts = Cookie.get("cart")
        ? JSON.parse(Cookie.get("cart")!)
        : [];
      dispatch({
        type: "[Cart] - LoadCart from cookies | storage",
        payload: cookieProducts,
      });
    } catch (error) {
      dispatch({
        type: "[Cart] - LoadCart from cookies | storage",
        payload: [],
      });
    }
  }, []);

  useEffect(() => {
    Cookie.set("cart", JSON.stringify(state.cart));
  }, [state.cart]);

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

  const updateCartQuantity = (product: ICartProduct) => {
    dispatch({ type: "[Cart] - Change cart quantity", payload: product });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addProductToCart,
        updateCartQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
