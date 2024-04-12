import { Route, Routes } from "react-router-dom";
import { lazy } from "react";

const Dashboard = lazy(() => import("./pages/dashboard"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
