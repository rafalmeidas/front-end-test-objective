import {
  createRoutesFromElements,
  createHashRouter,
  RouterProvider,
  Route,
} from "react-router-dom";

import PaginatorContextProvider from "./contexts/paginator-context";
import Container from "./layout/container/container";
import Character from "./pages/character/character";
import Home from "./pages/home/home";

const router = createHashRouter(
  createRoutesFromElements(
    <Route path="/" element={<Container />}>
      <Route
        index
        element={
          <PaginatorContextProvider>
            <Home />
          </PaginatorContextProvider>
        }
      />
      <Route path="character/:id" element={<Character />} />
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
