import { fireEvent, render, screen } from "@testing-library/react";
import { Form } from "./Form";
import { AuthProvider } from "../../Context/AuthContext";
import { ModalProvider } from "../../Context/ModalContext";
import { MemoryRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom/extend-expect";
describe("login to website", () => {
  render(
    <AuthProvider>
      <ModalProvider>
        <Form type="login" />
      </ModalProvider>
    </AuthProvider>,
    { wrapper: MemoryRouter }
  );
  const [email, password] = screen.getAllByRole("textbox");
  const loginButton = screen.getByText("Login");
  test("email is in document", () => expect(email).toBeInTheDocument());
  test("password is in document", () => expect(password).toBeInTheDocument());

  fireEvent.change(email, { target: { value: "aa@gmail.com" } });
  fireEvent.change(password, { target: { value: "aaaaaaaaaaaa" } });
  fireEvent.click(loginButton);
});
