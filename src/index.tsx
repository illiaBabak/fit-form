import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./root";
import "./index.scss";
import { Provider } from "react-redux";
import { store } from "./app/store";

const root = document.getElementById("root");

if (root) {
  createRoot(root).render(
    <Provider store={store}>
      <App />
    </Provider>
  );
} else {
  throw new Error("Something went wrong with root element!");
}
