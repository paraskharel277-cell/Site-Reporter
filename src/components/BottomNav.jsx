import { NavLink } from "react-router-dom";

function BottomNav() {
  const baseStyle = "flex-1 rounded-md px-4 py-2 text-center text-sm font-medium";
  const activeStyle = "bg-emerald-700 text-white";
  const normalStyle = "border bg-white text-slate-900";

  return (
    <nav className="fixed bottom-0 left-0 right-0 flex gap-2 border-t bg-white p-2">
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          isActive ? baseStyle + " " + activeStyle : baseStyle + " " + normalStyle
        }
      >
        Reports
      </NavLink>

      <NavLink
        to="/new-report"
        className={({ isActive }) =>
          isActive ? baseStyle + " " + activeStyle : baseStyle + " " + normalStyle
        }
      >
        New Report
      </NavLink>
    </nav>
  );
}

export default BottomNav;