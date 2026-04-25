import LoginScreen from "@/app/(auth)/loginScreen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, userEvent, waitFor } from "@testing-library/react-native";
import { router } from "expo-router";
import { ReactNode } from "react";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";
jest.useFakeTimers();
const queryClient = new QueryClient();
const AllTheProviders = ({ children }: { children: ReactNode }) => {
  return (
    <SafeAreaProvider
      initialMetrics={{
        frame: { height: 100, width: 100, x: 0, y: 0 },
        insets: { bottom: 10, left: 10, right: 10, top: 10 },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <KeyboardProvider>{children}</KeyboardProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
};

test("Render Email, Password, Login Button", () => {
  const { getByPlaceholderText, getByText } = render(<LoginScreen />, {
    wrapper: AllTheProviders,
  });

  const emailInput = getByPlaceholderText("Enter your email");
  const passwordInput = getByPlaceholderText("Enter your password");
  const loginBtn = getByText("Login");

  expect(emailInput).toBeOnTheScreen();
  expect(passwordInput).toBeOnTheScreen();
  expect(loginBtn).toBeOnTheScreen();
});

test("Login With invalid credentials expect error message", async () => {
  const { getByPlaceholderText, getByText, findByTestId } = render(
    <LoginScreen />,
    {
      wrapper: AllTheProviders,
    },
  );

  const emailInput = getByPlaceholderText("Enter your email");
  const passwordInput = getByPlaceholderText("Enter your password");
  const loginBtn = getByText("Login");
  const user = userEvent.setup();
  await user.type(emailInput, "test@example.com");
  await user.type(passwordInput, "password12");

  await user.press(loginBtn);
  await waitFor(async () => {
    jest.advanceTimersByTime(1000);
  });
  const errorMessage = await findByTestId("error-message");
  expect(errorMessage).toHaveTextContent("Invalid credentials");
});
test("Login With valid credentials navigate to home", async () => {
  const { getByPlaceholderText, getByText, findByTestId } = render(
    <LoginScreen />,
    {
      wrapper: AllTheProviders,
    },
  );

  const emailInput = getByPlaceholderText("Enter your email");
  const passwordInput = getByPlaceholderText("Enter your password");
  const loginBtn = getByText("Login");
  const user = userEvent.setup();
  await user.type(emailInput, "test@example.com");
  await user.type(passwordInput, "password123");

  await user.press(loginBtn);
  await waitFor(async () => {
    jest.advanceTimersByTime(1000);
  });

  expect(router.replace).toHaveBeenCalledWith("/homeScreen");
});
