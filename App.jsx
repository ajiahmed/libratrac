import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bell, BookOpen, Users, AlertTriangle } from "lucide-react";

export default function DolLibraryApp() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    personnel: "",
    dueDate: "",
  });

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const checkOverdue = () => {
      const now = new Date();
      const overdue = books.filter(
        (b) => new Date(b.dueDate) < now && !b.notified
      );
      if (overdue.length > 0) {
        const msgs = overdue.map(
          (b) => `⚠️ ${b.personnel} has not returned "${b.title}" (by ${b.author})`
        );
        setNotifications((prev) => [...prev, ...msgs]);
        setBooks((prev) =>
          prev.map((b) =>
            overdue.includes(b) ? { ...b, notified: true } : b
          )
        );
      }
    };
    const timer = setInterval(checkOverdue, 5000);
    return () => clearInterval(timer);
  }, [books]);

  const addBook = () => {
    if (
      !newBook.title ||
      !newBook.author ||
      !newBook.personnel ||
      !newBook.dueDate
    )
      return;
    setBooks([...books, { ...newBook, notified: false }]);
    setNewBook({ title: "", author: "", personnel: "", dueDate: "" });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <motion.h1
        className="text-3xl font-bold text-center mb-6 text-blue-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        📚 Directorate of Logistics Library
      </motion.h1>

      <div className="bg-white p-4 rounded-2xl shadow-md mb-6 max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold mb-3 flex items-center">
          <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
          Add Borrowed Book
        </h2>
        <div className="grid gap-2 sm:grid-cols-2">
          <input
            type="text"
            placeholder="Book Title"
            value={newBook.title}
            onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
            className="border rounded p-2"
          />
          <input
            type="text"
            placeholder="Author"
            value={newBook.author}
            onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
            className="border rounded p-2"
          />
          <input
            type="text"
            placeholder="Personnel Name"
            value={newBook.personnel}
            onChange={(e) =>
              setNewBook({ ...newBook, personnel: e.target.value })
            }
            className="border rounded p-2"
          />
          <input
            type="date"
            value={newBook.dueDate}
            onChange={(e) =>
              setNewBook({ ...newBook, dueDate: e.target.value })
            }
            className="border rounded p-2"
          />
        </div>
        <button
          onClick={addBook}
          className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Add Entry
        </button>
      </div>

      <div className="max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold mb-3 flex items-center">
          <Users className="w-5 h-5 mr-2 text-green-600" />
          Borrowed Books
        </h2>
        <div className="space-y-3">
          {books.map((b, i) => (
            <motion.div
              key={i}
              className="bg-white p-4 rounded-xl shadow flex justify-between"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div>
                <p className="font-semibold">{b.title}</p>
                <p className="text-sm text-gray-600">Author: {b.author}</p>
                <p className="text-sm">Borrower: {b.personnel}</p>
                <p className="text-sm">
                  Due:{" "}
                  {new Date(b.dueDate).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
              {new Date(b.dueDate) < new Date() ? (
                <AlertTriangle className="text-red-600 w-6 h-6" />
              ) : (
                <Bell className="text-green-600 w-6 h-6" />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {notifications.length > 0 && (
        <div className="max-w-3xl mx-auto mt-6">
          <h2 className="text-xl font-semibold mb-3 text-red-700">
            Notifications
          </h2>
          <ul className="bg-white p-4 rounded-xl shadow space-y-2">
            {notifications.map((n, i) => (
              <li key={i} className="text-sm text-red-700">
                {n}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}