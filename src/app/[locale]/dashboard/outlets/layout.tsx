'use client';

import { useState } from "react";

export default function outletsLayout({ children }: { children: React.ReactNode }) {

  return (
    <section>
      {children}
    </section>
  );
}
