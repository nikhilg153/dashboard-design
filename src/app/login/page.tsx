"use client";

import LoginPage from "@/components/LoginPage";
import { store } from "@/store";
import React from "react";
import { Provider } from "react-redux";

const page = () => {
  return (
    <div>
      <Provider store={store}>
        <LoginPage />
      </Provider>
    </div>
  );
};

export default page;
