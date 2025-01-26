"use client";

import { useState } from "react";

export const ClientComponent = () => {
  console.log("This log appears in browser console");

  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
};
