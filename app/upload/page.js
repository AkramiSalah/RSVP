// app/guests/upload.js
"use client";
import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import * as ExcelJS from "exceljs";
import { useRouter } from "next/navigation";
import { auth } from "../firebase";

const UploadGuests = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const router = useRouter();
  
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
      setFile(selectedFile);
      setError("");  // Clear any previous error
    } else {
      setError("Please upload a valid Excel file.");
      setFile(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      const reader = new FileReader();

      reader.onload = async (e) => {
        try {
          const arrayBuffer = e.target.result;
          const workbook = new ExcelJS.Workbook();
          await workbook.xlsx.load(arrayBuffer);  // Use load, not readFile
          
          const worksheet = workbook.getWorksheet(1); // Get the first sheet
          const guests = [];

          worksheet.eachRow((row, rowIndex) => {
            if (rowIndex > 1) { // Skip header row
              const name = row.getCell(1).value;
              const phoneNumber = row.getCell(2).value;
              if (name && phoneNumber) {
                guests.push({ name, phoneNumber, status: "Pending" });
              }
            }
          });

          // Upload to Firestore
          const user = auth.currentUser;
          if (user) {
            const db = getFirestore();
            const userRef = collection(db, "users", user.uid, "guests");
            for (const guest of guests) {
              await addDoc(userRef, guest);
            }

            setError("");
            alert("Guests uploaded successfully!");
            router.push("/guests");
          } else {
            setError("No authenticated user. Please log in.");
          }

        } catch (error) {
          setError("Error processing the Excel file.");
          console.error(error);
        }
      };

      reader.onerror = () => setError("Failed to read the file.");
      reader.readAsArrayBuffer(file);  // Start reading the file here

    } catch (error) {
      setError("An unexpected error occurred.");
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Upload Guest List</h1>
      <input type="file" accept=".xlsx" onChange={handleFileChange} />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={handleUpload} disabled={!file}>Upload</button>
    </div>
  );
};

export default UploadGuests;
