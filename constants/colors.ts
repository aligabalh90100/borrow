const colors = {
  // Brand
  primary: "#7659FB", // header bg, button, links, toggle
  primaryLight: "#9B82FC", // hover / pressed state
  primaryDark: "#5438E8", // gradient end, active
  primaryTint: "#F0EEFF", // subtle bg tint, toggle track

  // Text
  textMain: "#1A1A2E", // headlines, body
  textSub: "#6B6B80", // descriptions, captions
  textPlaceholder: "#A8A8B8", // input placeholder
  textWhite: "#FFFFFF", // text on purple bg
  textLink: "#7659FB", // "fees", "Check out", links

  // Backgrounds
  bgScreen: "#F5F5FA", // page / screen background
  bgCard: "#FFFFFF", // cards, bottom sheet, modal
  bgPrimary: "#7659FB", // header, hero section
  bgGray: "#EEEEEE",

  // Borders
  borderDefault: "#c7c7d3", // input, card divider
  borderFocus: "#7659FB", // focused input
  borderError: "#FF4B4B", // error input

  // Semantic
  error: "#FF4B4B", // error text & border
  success: "#00C48C", // success / confirmed
  warning: "#FFB800", // caution / pending

  // icons
  activeIcon: "#000000",
  defaultIcon: "#D8D8D8",

  black: "#000",
  darkGray: "#3c3a3a",
  grayLight: "#F5F4F8",
  link: "#009D61",
  gold: "#FDE670",
} as const;

export default colors;
