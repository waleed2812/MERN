import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { ContextAction, ContextActions, IContext, THEMES } from "types";
import { isDarkMode } from "utils";

// Context reducer
function reducer(state: IContext, action: ContextAction) {
  switch (action.type) {
    case "THEME": {
      const theme = action.value;
      const darkMode = isDarkMode(theme);
      window.localStorage.setItem("theme", theme);
      return { ...state, theme, darkMode };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}
// Context State
const initialState: IContext = {
  theme: THEMES.SYSTEM,
  darkMode: false,
};
// The Context main context
const MyContext = createContext<
  [IContext, React.Dispatch<ContextAction>] | null
>(null);
// Setting custom name for the context which is visible on react dev tools
MyContext.displayName = "MyContext";
// Context provider
export const ContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [controller, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const theme = window.localStorage.getItem("theme") || "system";
    dispatch({
      type: ContextActions.THEME,
      value:
        theme === "dark"
          ? THEMES.DARK
          : theme === "light"
          ? THEMES.LIGHT
          : THEMES.SYSTEM,
    });
  }, []);
  useEffect(() => {
    document.body.className = controller.darkMode
      ? "bg-black text-white"
      : "bg-white text-black";
  }, [controller]);

  return (
    <MyContext.Provider value={[controller, dispatch]}>
      {children}
    </MyContext.Provider>
  );
};

// Context custom hook for using context
export const useContextController = () => {
  const context = useContext(MyContext);

  if (!context) {
    throw new Error(
      "useContextController should be used inside the ContextProvider."
    );
  }

  return context;
};
