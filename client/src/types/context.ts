import { THEMES } from "./theme";

// An enum with all the types of actions to use in our reducer
export enum ContextActions {
  THEME = "THEME"
}

// An interface for our actions
export type ContextAction = {
  type: ContextActions.THEME;
  value: THEMES;
}

// Context Values
export interface IContext {
  theme: THEMES,
  darkMode: boolean
}