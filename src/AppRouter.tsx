import { BrowserRouter, Route, Routes } from "react-router-dom";
import { filePaths } from "./utilities/filePaths";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {filePaths.map((item, index) => {
          return (
            <Route key={index} path={item.path} element={<item.element />} />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
