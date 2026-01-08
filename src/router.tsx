import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layouts from "./layouts/Layouts";

const IndexPage = lazy(() => import("./views/IndexPage"));
const FavoritePage = lazy(() => import("./views/FavoritePage"));
const GenerateAI = lazy(() => import("./views/GenerateAI"));

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layouts />}>
          <Route
            path="/"
            element={
              <Suspense fallback="Cargando...">
                <IndexPage />
              </Suspense>
            }
            index
          />
          <Route
            path="/favoritos"
            element={
              <Suspense fallback="Cargando...">
                <FavoritePage />
              </Suspense>
            }
          />
          <Route
            path="/ai"
            element={
              <Suspense fallback="Cargando...">
                <GenerateAI />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
