import { useState } from "react";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import ReportsPage from "@/pages/ReportsPage";
import NewReportPage from "@/pages/NewReportPage";

function App() {
  const [page, setPage] = useState("reports");

  return (
    <div className="min-h-screen bg-slate-100 pb-20">
      <Header />

      <main className="p-4">
        {page === "reports" && <ReportsPage />}
        {page === "new" && <NewReportPage />}
      </main>

      <BottomNav page={page} setPage={setPage} />
    </div>
  );
}

export default App;