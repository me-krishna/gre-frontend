import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

const Dashboard = lazy(() => import("./pages/dashboard"));
const Exam = lazy(() => import("./pages/exam/Exam"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/gretest/:examName" element={<Exam />} />
      </Routes>
    </Suspense>
  );
}

export default App;
