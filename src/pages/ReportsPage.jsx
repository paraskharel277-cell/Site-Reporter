import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function ReportsPage({ reports, deleteReport }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.title.toLowerCase().includes(search.toLowerCase()) ||
      report.description.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = filter === "All" || report.category === filter;

    return matchesSearch && matchesCategory;
  });

  if (reports.length === 0) {
    return (
      <div>
        <h2 className="text-lg font-bold">Reports</h2>
        <p>No reports yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-bold">Reports</h2>

      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search reports"
      />

      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full border p-2"
      >
        <option>All</option>
        <option>Fault</option>
        <option>Wildlife</option>
        <option>Maintenance</option>
        <option>Fly-tipping</option>
        <option>Other</option>
      </select>

      <p className="text-sm">
        Showing {filteredReports.length} of {reports.length} reports
      </p>

      {filteredReports.length === 0 && <p>No reports match your search.</p>}

      {filteredReports.map((report) => (
        <div key={report.id} className="border bg-white p-3">
          <p className="font-bold">{report.title}</p>
          <p className="text-green-700">{report.category}</p>
          <p>{report.description}</p>
          <p className="text-sm">{report.date}</p>

          {report.location && (
            <a
              href={report.location}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-700 underline"
            >
              View on map
            </a>
          )}

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