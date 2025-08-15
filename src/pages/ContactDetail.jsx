import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/db";

export default function ContactDetail() {
  const { id } = useParams();
  const [contact, setContact] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContact = async () => {
      const docRef = doc(db, "contacts", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setContact({ id: docSnap.id, ...docSnap.data() });
      } else {
        setContact(null);
      }
    };
    fetchContact();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      try {
        await deleteDoc(doc(db, "contacts", id));
        navigate("/");
      } catch (error) {
        console.error("Error deleting contact: ", error);
        alert("Failed to delete contact. Please try again.");
      }
    }
  };

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
        <button className="btn-delete" onClick={handleDelete}>
          Delete
        </button>
        <Link to="/" className="btn-back">
          Back to List
        </Link>
      </div>
    </div>
  );
}
