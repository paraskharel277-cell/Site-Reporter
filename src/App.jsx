import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import ReportsPage from "@/pages/ReportsPage";
import NewReportPage from "@/pages/NewReportPage";
import EditReportPage from "@/pages/EditReportPage";

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

  function deleteReport(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this report?"
    );

    if (confirmed) {
      setReports(reports.filter((report) => report.id !== id));
    }
  }

  function updateReport(updatedReport) {
    setReports(
      reports.map((report) =>
        report.id === updatedReport.id ? updatedReport : report
      )
    );
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-slate-100 pb-20">
      <Header />

      <main className="p-4">
        <Routes>
          <Route
            path="/"
            element={
              <ReportsPage reports={reports} deleteReport={deleteReport} />
            }
          />
          <Route
            path="/new-report"
            element={<NewReportPage addReport={addReport} />}
          />
          <Route
            path="/edit/:id"
            element={
              <EditReportPage reports={reports} updateReport={updateReport} />
            }
          />
        </Routes>
      </main>

      <BottomNav />
    </div>
  );
}

export default App;