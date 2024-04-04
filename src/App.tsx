import { RouterProvider, createRouter } from "@tanstack/react-router";
import { Provider } from "react-redux";

import { TooltipProvider } from "@/components/ui/tooltip";

import { routeTree } from "./routeTree.gen";
import { store } from "@/store";

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return (
    <Provider store={store}>
      <TooltipProvider>
        <RouterProvider router={router} />
      </TooltipProvider>
    </Provider>
  );
}

export default App;
