import { NavLink, Outlet, RouterProvider, createBrowserRouter } from "react-router";
import Home from "./pages/Home.jsx";
import Cups from "./pages/Cups.jsx";
import Boxes from "./pages/Boxes.jsx";
import CapacityCalculator from "./pages/CapacityCalculator.jsx";

function Layout() {
  return (
    <div className="shell">
      <header className="topbar">
        <a className="brand" href="/"><span className="brand-mark">C</span>CupBox</a>
        <nav className="nav">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/cups">Cups</NavLink>
          <NavLink to="/boxes">Boxes</NavLink>
          <NavLink to="/capacity">Capacity</NavLink>
        </nav>
      </header>
      <Outlet />
      <footer className="footer">CupBox · Capacity estimates are for planning only.</footer>
    </div>
  );
}

const router = createBrowserRouter([
  { element: <Layout />, children: [
    { path: "/", element: <Home /> },
    { path: "/cups", element: <Cups /> },
    { path: "/boxes", element: <Boxes /> },
    { path: "/capacity", element: <CapacityCalculator /> }
  ]}
]);

export default function App() {
  return <RouterProvider router={router} />;
}
