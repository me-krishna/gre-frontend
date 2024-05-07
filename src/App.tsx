import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import PriavateRoute from "./PrivateRoute";
import Login from "./pages/auth/login";

const Dashboard = lazy(() => import("./pages/dashboard"));
const Exam = lazy(() => import("./pages/exam/Exam"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route element={<PriavateRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/gretest/:examName" element={<Exam />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Suspense>
  );
}

export default App;
