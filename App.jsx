import React, { useState, useEffect } from "react";
‎import { Card, CardContent } from "@/components/ui/card";
‎import { Button } from "@/components/ui/button";
‎import { Input } from "@/components/ui/input";
‎import { motion } from "framer-motion";
‎import { Bell, BookOpen, Users, AlertTriangle } from "lucide-react";
‎
‎export default function DolLibraryApp() {
‎  const [books, setBooks] = useState([
‎    {
‎      id: 1,
‎      personnel: "DIO I AA Ajileye",
‎      title: "The Art of War",
‎      author: "Sun Tzu",
‎      borrowedDate: "2025-09-08",
‎      dueDate: "2025-09-17",
‎      returnedDate: null,
‎      overdue: false,
‎    },
‎    {
‎      id: 2,
‎      personnel: "Maj Tunde Balogun",
‎      title: "Leadership and Self-Deception",
‎      author: "Arbinger Institute",
‎      borrowedDate: "2025-09-05",
‎      dueDate: "2025-09-15",
‎      returnedDate: null,
‎      overdue: false,
‎    },
‎    {
‎      id: 3,
‎      personnel: "Capt Grace Okafor",
‎      title: "The Prince",
‎      author: "Niccolò Machiavelli",
‎      borrowedDate: "2025-09-10",
‎      dueDate: "2025-09-20",
‎      returnedDate: null,
‎      overdue: false,
‎    },
‎    {
‎      id: 4,
‎      personnel: "Lt Ibrahim Musa",
‎      title: "Good to Great",
‎      author: "Jim Collins",
‎      borrowedDate: "2025-09-01",
‎      dueDate: "2025-09-12",
‎      returnedDate: null,
‎      overdue: false,
‎    },
‎    {
‎      id: 5,
‎      personnel: "Col Fatima Sani",
‎      title: "Atomic Habits",
‎      author: "James Clear",
‎      borrowedDate: "2025-09-07",
‎      dueDate: "2025-09-18",
‎      returnedDate: null,
‎      overdue: false,
‎    },
‎    {
‎      id: 6,
‎      personnel: "Maj Gen Chukwuemeka Obi",
‎      title: "Thinking, Fast and Slow",
‎      author: "Daniel Kahneman",
‎      borrowedDate: "2025-09-03",
‎      dueDate: "2025-09-14",
‎      returnedDate: null,
‎      overdue: false,
‎    },
‎    {
‎      id: 7,
‎      personnel: "Brig Gen Aisha Bello",
‎      title: "Start with Why",
‎      author: "Simon Sinek",
‎      borrowedDate: "2025-09-09",
‎      dueDate: "2025-09-19",
‎      returnedDate: null,
‎      overdue: false,
‎    },
‎  ]);
‎
‎  const [personnel, setPersonnel] = useState("");
‎  const [title, setTitle] = useState("");
‎  const [author, setAuthor] = useState("");
‎  const [duration, setDuration] = useState("");
‎  const [borrowedDate, setBorrowedDate] = useState("");
‎
‎  useEffect(() => {
‎    const interval = setInterval(() => {
‎      const updatedBooks = books.map((book) => {
‎        const now = new Date();
‎        if (!book.returnedDate && now > new Date(book.dueDate)) {
‎          return { ...book, overdue: true };
‎        }
‎        return book;
‎      });
‎      setBooks(updatedBooks);
‎    }, 1000 * 60);
‎    return () => clearInterval(interval);
‎  }, [books]);
‎
‎  const lendBook = () => {
‎    if (!personnel || !title || !author || !duration || !borrowedDate) return;
‎
‎    const dueDate = new Date(borrowedDate);
‎    dueDate.setDate(dueDate.getDate() + parseInt(duration));
‎
‎    const newBook = {
‎      id: Date.now(),
‎      personnel,
‎      title,
‎      author,
‎      borrowedDate,
‎      dueDate: dueDate.toISOString(),
‎      returnedDate: null,
‎      overdue: false,
‎    };
‎
‎    setBooks([...books, newBook]);
‎    setPersonnel("");
‎    setTitle("");
‎    setAuthor("");
‎    setDuration("");
‎    setBorrowedDate("");
‎  };
‎
‎  const markReturned = (id) => {
‎    const updated = books.map((book) =>
‎      book.id === id ? { ...book, returnedDate: new Date().toISOString() } : book
‎    );
‎    setBooks(updated);
‎  };
‎
‎  const getReminders = () => {
‎    const now = new Date();
‎    return books.filter((book) => !book.returnedDate).map((book) => {
‎      const due = new Date(book.dueDate);
‎      const diffDays = Math.ceil((due - now) / (1000 * 60 * 60 * 24));
‎
‎      if (book.overdue) {
‎        return { ...book, status: "Overdue", color: "bg-red-700 animate-pulse" };
‎      } else if (diffDays <= 0) {
‎        return { ...book, status: "Due Today", color: "bg-orange-600 animate-pulse" };
‎      } else if (diffDays <= 3) {
‎        return { ...book, status: `Due in ${diffDays} days`, color: "bg-yellow-600 animate-pulse" };
‎      } else {
‎        return { ...book, status: `Due in ${diffDays} days`, color: "bg-green-700" };
‎      }
‎    });
‎  };
‎
‎  return (
‎    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-6">
‎      <motion.h1
‎        initial={{ opacity: 0, y: -50 }}
‎        animate={{ opacity: 1, y: 0 }}
‎        className="text-4xl font-extrabold text-center mb-8"
‎      >
‎        📚 Directorate of Logistics Library
‎      </motion.h1>
‎
‎      {/* Reminder Panel */}
‎      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
‎        {getReminders().map((reminder) => (
‎          <div
‎            key={reminder.id}
‎            className={`p-4 rounded-xl shadow-md text-white ${reminder.color}`}
‎          >
‎            <p className="font-bold flex items-center gap-2">
‎              <AlertTriangle className="w-5 h-5" /> {reminder.status}
‎            </p>
‎            <p className="text-sm">{reminder.title} by {reminder.author}</p>
‎            <p className="text-xs">Borrowed by {reminder.personnel}</p>
‎          </div>
‎        ))}
‎      </div>
‎
‎      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
‎        <Card className="bg-gray-800/70 backdrop-blur-md shadow-xl rounded-2xl">
‎          <CardContent className="p-6 space-y-4">
‎            <h2 className="text-2xl font-bold flex items-center gap-2">
‎              <BookOpen className="w-6 h-6 text-blue-400" /> Lend a Book
‎            </h2>
‎            <Input
‎              placeholder="Personnel Name"
‎              value={personnel}
‎              onChange={(e) => setPersonnel(e.target.value)}
‎            />
‎            <Input
‎              placeholder="Book Title"
‎              value={title}
‎              onChange={(e) => setTitle(e.target.value)}
‎            />
‎            <Input
‎              placeholder="Author"
‎              value={author}
‎              onChange={(e) => setAuthor(e.target.value)}
‎            />
‎            <Input
‎              type="number"
‎              placeholder="Duration (days)"
‎              value={duration}
‎              onChange={(e) => setDuration(e.target.value)}
‎            />
‎            <Input
‎              type="date"
‎              placeholder="Borrowed Date"
‎              value={borrowedDate}
‎              onChange={(e) => setBorrowedDate(e.target.value)}
‎            />
‎            <Button
‎              onClick={lendBook}
‎              className="w-full bg-blue-600 hover:bg-blue-700"
‎            >
‎              Lend Book
‎            </Button>
‎          </CardContent>
‎        </Card>
‎
‎        <Card className="bg-gray-800/70 backdrop-blur-md shadow-xl rounded-2xl">
‎          <CardContent className="p-6 space-y-4">
‎            <h2 className="text-2xl font-bold flex items-center gap-2">
‎              <Users className="w-6 h-6 text-green-400" /> Borrowed Books
‎            </h2>
‎            <div className="space-y-3 max-h-[400px] overflow-y-auto">
‎              {books.length === 0 && <p className="text-gray-400">No records yet.</p>}
‎              {books.map((book) => (
‎                <motion.div
‎                  key={book.id}
‎                  initial={{ opacity: 0, x: -50 }}
‎                  animate={{ opacity: 1, x: 0 }}
‎                  className={`p-4 rounded-xl shadow-md border ${
‎                    book.overdue
‎                      ? "border-red-500 bg-red-900/30"
‎                      : "border-green-500 bg-green-900/30"
‎                  }`}
‎                >
‎                  <h3 className="text-lg font-semibold">
‎                    {book.title} <span className="text-gray-400">by {book.author}</span>
‎                  </h3>
‎                  <p className="text-sm">Borrowed by: <span className="font-bold">{book.personnel}</span></p>
‎                  <p className="text-sm flex items-center gap-2">
‎                    <Bell className="w-4 h-4" /> Due: {new Date(book.dueDate).toLocaleDateString()}
‎                  </p>
‎                  <p className="text-sm">Borrowed Date: {new Date(book.borrowedDate).toLocaleDateString()}</p>
‎                  {book.returnedDate && (
‎                    <p className="text-sm text-blue-400">Returned: {new Date(book.returnedDate).toLocaleDateString()}</p>
‎                  )}
‎                  {!book.returnedDate && (
‎                    <Button
‎                      onClick={() => markReturned(book.id)}
‎                      className="mt-2 bg-red-600 hover:bg-red-700"
‎                    >
‎                      Mark as Returned
‎                    </Button>
‎                  )}
‎                  {book.overdue && <p className="text-red-400 font-bold">⚠ Overdue!</p>}
‎                </motion.div>
‎              ))}
‎            </div>
‎          </CardContent>
‎        </Card>
‎      </div>
‎    </div>
‎  );
‎}
