import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

function NewReportPage({ addReport }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Fault");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (title.trim() === "") {
      setError("Please enter a title.");
      return;
    }

    const newReport = {
      id: Date.now(),
      title: title,
      category: category,
      description: description,
      date: new Date().toLocaleDateString("en-GB"),
    };

    addReport(newReport);
    setTitle("");
    setCategory("Fault");
    setDescription("");
    setError("");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-lg font-bold">New report</h2>

      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="For example: Damaged fence"
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
          placeholder="Describe what you found"
        />
      </div>

      <Button type="submit" className="w-full">
        Save report
      </Button>
    </form>
  );
}

export default NewReportPage;