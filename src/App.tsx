import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import PriavateRoute from "./PrivateRoute";
import Login from "./pages/auth/login";
import ForgotPassword from "./pages/auth/forgot-password";

const Dashboard = lazy(() => import("./pages/dashboard"));
const Exam = lazy(() => import("./pages/exam/Exam"));
const ReviewScore = lazy(() => import("./pages/review-scores"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route element={<PriavateRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/mock-test/:exam_section_id" element={<Exam />} />
          <Route path="/review-score/:exam_section_id" element={<ReviewScore />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </Suspense>
  );
}

export default App;
