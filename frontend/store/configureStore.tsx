import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

import reducer from "../reducers";
import logger from "redux-logger";

const makeStore = (context: any) =>
  configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV !== "production",
  });

const wrapper = createWrapper(makeStore, {
  debug: process.env.NODE_ENV !== "production",
});
export default wrapper;
