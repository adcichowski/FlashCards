import React from "react";
import { useContext } from "react";
const CountContext = React.createContext({});
export default function FormContext() {
  const context = React.useContext(CountContext);
  return context;
}
