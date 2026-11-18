import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import ReportsPage from "@/pages/ReportsPage";
import NewReportPage from "@/pages/NewReportPage";

function usePersistedState(key, defaultValue) {
  const [state, setState] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}

function App() {
  const navigate = useNavigate();
  const [reports, setReports] = usePersistedState("reports", []);

  function addReport(newReport) {
    setReports([newReport, ...reports]);
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-slate-100 pb-20">
      <Header />

      <main className="p-4">
        <Routes>
          <Route path="/" element={<ReportsPage reports={reports} />} />
          <Route
            path="/new-report"
            element={<NewReportPage addReport={addReport} />}
          />
        </Routes>
      </main>

      <BottomNav />
    </div>
  );
}

export default App;