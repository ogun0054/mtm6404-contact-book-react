import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/db";

export default function AddContact() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "contacts"), formData);
      navigate(`/contact/${docRef.id}`);
    } catch (error) {
      alert("Error adding contact: " + error.message);
    }
  };

  return (
    <div>
      <h2>Add New Contact</h2>
      <form onSubmit={handleSubmit} className="contact-form">
        <input
          name="firstName"
          placeholder="First Name"
          required
          value={formData.firstName}
          onChange={handleChange}
        />
        <input
          name="lastName"
          placeholder="Last Name"
          required
          value={formData.lastName}
          onChange={handleChange}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={handleChange}
        />
        <input
          name="phone"
          type="tel"
          placeholder="Phone (optional)"
          value={formData.phone}
          onChange={handleChange}
        />
        <textarea
          name="address"
          placeholder="Address (optional)"
          value={formData.address}
          onChange={handleChange}
        ></textarea>

        <div className="form-buttons">
          <button type="submit">Save Contact</button>
          <Link to="/" className="btn-cancel">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
