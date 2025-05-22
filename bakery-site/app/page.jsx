"use client"

import store from "./stores/store";
import { Provider } from 'react-redux';
import App from "./features/App";

export default function IndexPage() {
  return (
    <Provider store={store}>
      <App />     
    </Provider>
  );
}