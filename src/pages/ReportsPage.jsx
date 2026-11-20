import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

function ReportsPage({ reports, deleteReport }) {
  const navigate = useNavigate();

  if (reports.length === 0) {
    return (
      <div>
        <h2 className="text-lg font-bold">Reports</h2>
        <p className="text-slate-600">No reports yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-bold">Reports</h2>

      {reports.map((report) => (
        <div key={report.id} className="rounded-md border bg-white p-3">
          <p className="font-semibold">{report.title}</p>
          <p className="text-sm text-emerald-700">{report.category}</p>
          <p className="text-sm text-slate-600">{report.description}</p>
          <p className="mt-1 text-xs text-slate-400">{report.date}</p>

          <div className="mt-3 flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/edit/" + report.id)}
            >
              Edit
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={() => deleteReport(report.id)}
            >
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ReportsPage;