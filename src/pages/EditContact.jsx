import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/db";

export default function EditContact() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    const fetchContact = async () => {
      const docRef = doc(db, "contacts", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFormData(docSnap.data());
      }
    };
    fetchContact();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, "contacts", id);
      await updateDoc(docRef, formData);
      navigate(`/contact/${id}`);
    } catch (error) {
      alert("Error updating contact: " + error.message);
    }
  };

  return (
    <div>
      <h2>Edit Contact</h2>
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
          <button type="submit">Update Contact</button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn-cancel"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
