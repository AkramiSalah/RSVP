// src/app/page.js
'use client'; // Add this line to mark the file as a client component

import React, { useState, useEffect } from 'react';
import { collection, addDoc } from 'firebase/firestore';

export default function Home() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    // Your useEffect logic
  }, []);
  
  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
}
