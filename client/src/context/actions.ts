import { ContextAction, ContextActions, THEMES } from "types";

export const changeTheme = (
  theme: THEMES,
  dispatch: React.Dispatch<ContextAction>
) => dispatch({ type: ContextActions.THEME, value: theme });
