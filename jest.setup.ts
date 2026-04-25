jest.mock("react-native-keyboard-controller", () =>
  require("react-native-keyboard-controller/jest"),
);

jest.mock("expo-router", () => ({
  router: {
    push: jest.fn(),
    replace: jest.fn(),

    back: jest.fn(),
  },
}));
