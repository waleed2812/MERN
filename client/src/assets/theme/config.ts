export enum HEX_OPACITY {
  FIFTY = "0D", // 0.05
  ONE = "1A", // 0.1
  TWO = "33", // 0.2
  THREE = "4D", // 0.3
  FOUR = "66", // 0.4
  FIVE = "80", // 0.5
  SIX = "99", // 0.6
  SEVEN = "B3", // 0.7
  EIGHT = "CC", // 0.8
  NINE = "E6", // 0.9
}

export const getColorVariations = (color: string) => ({
  main: color,
  "50": color + HEX_OPACITY.FIFTY,
  "100": color + HEX_OPACITY.ONE,
  "200": color + HEX_OPACITY.TWO,
  "300": color + HEX_OPACITY.THREE,
  "400": color + HEX_OPACITY.FOUR,
  "500": color + HEX_OPACITY.FIVE,
  "600": color + HEX_OPACITY.SIX,
  "700": color + HEX_OPACITY.SEVEN,
  "800": color + HEX_OPACITY.EIGHT,
  "900": color + HEX_OPACITY.NINE,
});
