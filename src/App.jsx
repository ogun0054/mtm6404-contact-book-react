// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddContact from "./pages/AddContact";
import EditContact from "./pages/EditContact";
import ContactDetail from "./pages/ContactDetail";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddContact />} />
            <Route path="/contact/:id" element={<ContactDetail />} />
            <Route path="/edit/:id" element={<EditContact />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
