import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h1>Contact Book</h1>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/add">Add Contact</Link>
      </div>
    </nav>
  );
}
