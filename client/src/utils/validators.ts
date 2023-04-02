export const isDarkMode = (theme: string) => {
  const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
  return (theme === "system" && darkThemeMq.matches) || theme === "dark";
};
