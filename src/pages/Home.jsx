import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/db";
import ContactCard from "../components/ContactCard";
import SearchBar from "../components/SearchBar";

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [query, setQuery] = useState("");

  // Fetch contacts from Firestore
  useEffect(() => {
    const fetchContacts = async () => {
      const querySnapshot = await getDocs(collection(db, "contacts"));
      const contactList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      // Sort by last name
      const sorted = contactList.sort((a, b) =>
        a.lastName.localeCompare(b.lastName)
      );
      setContacts(sorted);
      setFilteredContacts(sorted);
    };

    fetchContacts();
  }, []);

  // Filter contacts when search query changes
  useEffect(() => {
    if (query.trim() === "") {
      setFilteredContacts(contacts);
    } else {
      const lowerQuery = query.toLowerCase();
      setFilteredContacts(
        contacts.filter(
          (contact) =>
            contact.firstName.toLowerCase().includes(lowerQuery) ||
            contact.lastName.toLowerCase().includes(lowerQuery)
        )
      );
    }
  }, [query, contacts]);

  return (
    <div>
      <h2>Contacts</h2>
      <SearchBar query={query} setQuery={setQuery} />
      <div className="contact-list">
        {filteredContacts.length === 0 ? (
          <p>No contacts found.</p>
        ) : (
          filteredContacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))
        )}
      </div>
    </div>
  );
}
