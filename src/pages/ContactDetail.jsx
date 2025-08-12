// src/pages/ContactDetail.jsx
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/db";

export default function ContactDetail() {
  const { id } = useParams();
  const [contact, setContact] = useState(null);

  useEffect(() => {
    const fetchContact = async () => {
      const docRef = doc(db, "contacts", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setContact({ id: docSnap.id, ...docSnap.data() });
      }
    };
    fetchContact();
  }, [id]);

  if (!contact) return <p>Loading...</p>;

  return (
    <div className="contact-detail">
      <h2>
        {contact.firstName} {contact.lastName}
      </h2>
      <p>
        <strong>Email:</strong> {contact.email}
      </p>
      {contact.phone && (
        <p>
          <strong>Phone:</strong> {contact.phone}
        </p>
      )}
      {contact.address && (
        <p>
          <strong>Address:</strong> {contact.address}
        </p>
      )}

      <div className="button-group">
        <Link to={`/edit/${id}`} className="btn-edit">
          Edit
        </Link>
        <button
          className="btn-delete"
          onClick={() => {
            if (window.confirm("Delete this contact?")) {
              // We'll implement delete later
            }
          }}
        >
          Delete
        </button>
        <Link to="/" className="btn-back">
          Back to List
        </Link>
      </div>
    </div>
  );
}
