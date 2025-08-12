// src/components/ContactCard.jsx
import { Link } from "react-router-dom";

export default function ContactCard({ contact }) {
  return (
    <div className="contact-card">
      <Link to={`/contact/${contact.id}`} className="contact-link">
        {contact.firstName} {contact.lastName}
      </Link>
    </div>
  );
}
