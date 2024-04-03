import { useState } from "react";

import "./App.css";
import { Button } from "@/components/ui/button";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <Button onClick={() => setCount((prev) => prev + 1)}>Hello Vite</Button>
        <h1 className="text-2xl text-gray-600 mt-6">Count is: {count}</h1>
      </div>
    </>
  );
}

export default App;
