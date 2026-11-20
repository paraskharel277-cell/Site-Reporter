import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

function EditReportPage({ reports, updateReport }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const report = reports.find((item) => item.id === Number(id));

  const [title, setTitle] = useState(report ? report.title : "");
  const [category, setCategory] = useState(report ? report.category : "Fault");
  const [description, setDescription] = useState(
    report ? report.description : ""
  );
  const [error, setError] = useState("");

  if (!report) {
    return <p className="text-slate-600">Report not found.</p>;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (title.trim() === "") {
      setError("Please enter a title.");
      return;
    }

    updateReport({
      ...report,
      title: title,
      category: category,
      description: description,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-lg font-bold">Edit report</h2>

      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-md border bg-white p-2 text-sm"
        >
          <option>Fault</option>
          <option>Wildlife</option>
          <option>Maintenance</option>
          <option>Fly-tipping</option>
          <option>Other</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="flex gap-2">
        <Button type="submit" className="flex-1">
          Save changes
        </Button>
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          onClick={() => navigate("/")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}

export default EditReportPage;