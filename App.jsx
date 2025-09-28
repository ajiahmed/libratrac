import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Bell, BookOpen, Users, AlertTriangle } from "lucide-react"




export default function DolLibraryApp() {
  const [books, setBooks] = useState([
    {
      id: 1,
      personnel: "DIO I AA Ajileye",
      title: "The Art of War",
      author: "Sun Tzu",
      borrowedDate: "2025-09-08",
      dueDate: "2025-09-17",
      returnedDate: null,
      overdue: false,
    },
    {
      id: 2,
      personnel: "Maj Tunde Balogun",
      title: "Leadership and Self-Deception",
      author: "Arbinger Institute",
      borrowedDate: "2025-09-05",
      dueDate: "2025-09-15",
      returnedDate: null,
      overdue: false,
    },
    {
      id: 3,
      personnel: "Capt Grace Okafor",
      title: "The Prince",
      author: "Niccolò Machiavelli",
      borrowedDate: "2025-09-10",
      dueDate: "2025-09-20",
      returnedDate: null,
      overdue: false,
    },
    {
      id: 4,
      personnel: "Lt Ibrahim Musa",
      title: "Good to Great",
      author: "Jim Collins",
      borrowedDate: "2025-09-01",
      dueDate: "2025-09-12",
      returnedDate: null,
      overdue: false,
    },
    {
      id: 5,
      personnel: "Col Fatima Sani",
      title: "Atomic Habits",
      author: "James Clear",
      borrowedDate: "2025-09-07",
      dueDate: "2025-09-18",
      returnedDate: null,
      overdue: fals
