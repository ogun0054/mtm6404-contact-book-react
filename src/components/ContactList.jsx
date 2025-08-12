import React from "react";
import ContactCard from "./ContactCard";
import { useContacts } from "../context/ContactContext";

const ContactList = ({ searchTerm }) => {
  const { contacts, loading, error } = useContacts();

  if (loading) return <div className="loading">Loading contacts...</div>;
  if (error) return <div className="error">{error}</div>;

  const filteredContacts = contacts.filter((contact) => {
    const fullName = `${contact.firstName} ${contact.lastName}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="contact-list">
      {filteredContacts.length > 0 ? (
        filteredContacts.map((contact) => (
          <ContactCard key={contact.id} contact={contact} />
        ))
      ) : (
        <div className="no-contacts">
          <p>No contacts found</p>
        </div>
      )}
    </div>
  );
};

export default ContactList;
