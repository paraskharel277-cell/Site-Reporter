import { Button } from "@/components/ui/button";

function BottomNav({ page, setPage }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 flex gap-2 border-t bg-white p-2">
      <Button
        className="flex-1"
        variant={page === "reports" ? "default" : "outline"}
        onClick={() => setPage("reports")}
      >
        Reports
      </Button>
      <Button
        className="flex-1"
        variant={page === "new" ? "default" : "outline"}
        onClick={() => setPage("new")}
      >
        New report
      </Button>
    </nav>
  );
}

export default BottomNav;