'use client';
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getFirestore, collection, query, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/cardContent";
import { Button } from "@/components/ui/button";
import { Trash, Edit } from "lucide-react";

const GuestsPage = () => {
  const [guests, setGuests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const router = useRouter();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/");
      } else {
        const db = getFirestore();
        const guestsRef = collection(db, "users", user.uid, "guests");
        const q = query(guestsRef);
        const unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
          const guestsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setGuests(guestsData);
          setLoading(false);
        });
        setAuthChecked(true);

        // Cleanup snapshot listener on unmount
        return () => unsubscribeSnapshot();
      }
    });

    // Cleanup auth listener on unmount
    return () => unsubscribe();
  }, [auth, router]);

  const handleDeleteGuest = async (guestId) => {
    try {
      const user = auth.currentUser;
      if (!user) return;
      const db = getFirestore();
      const guestRef = doc(db, "users", user.uid, "guests", guestId);
      await deleteDoc(guestRef);
      alert("Guest deleted successfully.");
    } catch (error) {
      console.error("Error deleting guest:", error);
      alert("Failed to delete guest.");
    }
  };

  const filteredGuests = guests.filter(guest => 
    guest.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (statusFilter === "" || guest.status === statusFilter)
  );

  if (!authChecked) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Guest List</h1>
      
      <input 
        type="text" 
        placeholder="Search guests..." 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
        className="p-2 mb-4 w-full rounded border"
      />
      
      <select 
        value={statusFilter} 
        onChange={(e) => setStatusFilter(e.target.value)} 
        className="p-2 mb-4 w-full rounded border"
      >
        <option value="">All Statuses</option>
        <option value="Pending">Pending</option>
        <option value="Confirmed">Confirmed</option>
        <option value="Canceled">Canceled</option>
      </select>

      {loading ? (
        <p>Loading guests...</p>
      ) : filteredGuests.length === 0 ? (
        <p>No guests found. Try adjusting your filters.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredGuests.map(guest => (
            <Card key={guest.id} className="flex items-center justify-between p-4">
              <CardContent>
                <p><strong>Name:</strong> {guest.name}</p>
                <p><strong>Phone:</strong> {guest.phoneNumber}</p>
                <p><strong>Status:</strong> {guest.status}</p>
              </CardContent>
              <div className="flex gap-2">
                <Button variant="ghost" onClick={() => alert('Edit coming soon!')} className="hover:bg-gray-200"><Edit /></Button>
                <Button variant="ghost" onClick={() => handleDeleteGuest(guest.id)} className="hover:bg-red-200"><Trash /></Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default GuestsPage;
