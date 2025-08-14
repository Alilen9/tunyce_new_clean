'use client';

import { store } from "@/store/store";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";

export default function AuthLayout({ children }: { children: React.ReactNode }) {

  return (
    <section>
      <Provider store={store}>
        <Toaster position="top-right" />
        {children}
      </Provider>
    </section>
  );
}
