import { FC, PropsWithChildren, useReducer } from "react";
import { UiContext, uiReducer } from "./";

type Props = {};

export interface UIState {
  isMenuOpen: boolean;
}

const UI_INITIAL_STATE: UIState = {
  isMenuOpen: false,
};

export const UiProvider: FC<PropsWithChildren<Props>> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const toggleSideMenu = () => {
    dispatch({ type: "[UI] - ToggleMenu" });
  };

  return (
    <UiContext.Provider
      value={{
        ...state,
        toggleSideMenu,
      }}
    >
      {children}
    </UiContext.Provider>
  );
};
