import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from './adminhome';
import './BookManagement.css';

const BookManagement = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    title: '', author: '', year: '', pdf: '', img: '', categories: '', membership: '', rating: '', updated: '', description: ''
  });
  const [editingBook, setEditingBook] = useState(null);
  const [editForm, setEditForm] = useState({
    title: '', author: '', year: '', pdf: '', img: '', categories: '', membership: '', rating: '', updated: '', description: ''
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/books/getall');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books', error);
      }
    };

    fetchBooks();
  }, []);

  const deleteBook = async (bookId) => {
    try {
      await axios.delete(`http://localhost:8080/api/books/delete/${bookId}`);
      setBooks(books.filter(book => book.id !== bookId));
    } catch (error) {
      console.error('Error deleting book', error);
    }
  };

  const handleFileUpload = (e, callback) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      callback(reader.result.split(',')[1]);
    };
    reader.readAsDataURL(file);
  };

  const addBook = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/books/add', newBook);
      setBooks([...books, response.data]);
      setNewBook({
        title: '', author: '', year: '', pdf: '', img: '', categories: '', membership: '', rating: '', updated: '', description: ''
      });
      setShowAddModal(false);
    } catch (error) {
      console.error('Error adding book', error);
    }
  };

  const updateBook = async () => {
    try {
      await axios.put(`http://localhost:8080/api/books/update/${editingBook.id}`, editForm);
      setBooks(books.map(book => (book.id === editingBook.id ? { ...book, ...editForm } : book)));
      setEditingBook(null);
      setEditForm({
        title: '', author: '', year: '', pdf: '', img: '', categories: '', membership: '', rating: '', updated: '', description: ''
      });
      setShowEditModal(false);
    } catch (error) {
      console.error('Error updating book', error);
    }
  };

  return (
    <Layout>
      <div className="book-header-container">
        <h1>Manage Books</h1>
        <button onClick={() => setShowAddModal(true)} className="book-open-modal-button">Add Book</button>
      </div>

      {/* Add Book Modal */}
      {showAddModal && (
        <div className="book-modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="book-modal-content" onClick={e => e.stopPropagation()}>
            <h2>Add Book</h2>
            <div className="book-modal-grid">
              <input
                type="text"
                placeholder="Title"
                value={newBook.title}
                onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
              />
              <input
                type="text"
                placeholder="Author"
                value={newBook.author}
                onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
              />
              <input
                type="number"
                placeholder="Year"
                value={newBook.year}
                onChange={(e) => setNewBook({ ...newBook, year: e.target.value })}
              />
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => handleFileUpload(e, (base64) => setNewBook({ ...newBook, pdf: base64 }))}
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, (base64) => setNewBook({ ...newBook, img: base64 }))}
              />
              <input
                type="text"
                placeholder="Categories"
                value={newBook.categories}
                onChange={(e) => setNewBook({ ...newBook, categories: e.target.value })}
              />
              <input
                type="text"
                placeholder="Membership"
                value={newBook.membership}
                onChange={(e) => setNewBook({ ...newBook, membership: e.target.value })}
              />
              <input
                type="number"
                placeholder="Rating"
                value={newBook.rating}
                onChange={(e) => setNewBook({ ...newBook, rating: e.target.value })}
              />
              <input
                type="date"
                placeholder="Updated"
                value={newBook.updated}
                onChange={(e) => setNewBook({ ...newBook, updated: e.target.value })}
              />
              <textarea
                placeholder="Description"
                value={newBook.description}
                onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
              />
            </div>
            <button onClick={addBook} className="book-action-button">Add Book</button>
            <button onClick={() => setShowAddModal(false)} className="book-close-modal-button">Close</button>
          </div>
        </div>
      )}

      {/* Edit Book Modal */}
      {showEditModal && editingBook && (
        <div className="book-modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="book-modal-content" onClick={e => e.stopPropagation()}>
            <h2>Edit Book</h2>
            <div className="book-modal-grid">
              <input
                type="text"
                placeholder="Title"
                value={editForm.title}
                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
              />
              <input
                type="text"
                placeholder="Author"
                value={editForm.author}
                onChange={(e) => setEditForm({ ...editForm, author: e.target.value })}
              />
              <input
                type="number"
                placeholder="Year"
                value={editForm.year}
                onChange={(e) => setEditForm({ ...editForm, year: e.target.value })}
              />
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => handleFileUpload(e, (base64) => setEditForm({ ...editForm, pdf: base64 }))}
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, (base64) => setEditForm({ ...editForm, img: base64 }))}
              />
              <input
                type="text"
                placeholder="Categories"
                value={editForm.categories}
                onChange={(e) => setEditForm({ ...editForm, categories: e.target.value })}
              />
              <input
                type="text"
                placeholder="Membership"
                value={editForm.membership}
                onChange={(e) => setEditForm({ ...editForm, membership: e.target.value })}
              />
              <input
                type="number"
                placeholder="Rating"
                value={editForm.rating}
                onChange={(e) => setEditForm({ ...editForm, rating: e.target.value })}
              />
              <input
                type="date"
                placeholder="Updated"
                value={editForm.updated}
                onChange={(e) => setEditForm({ ...editForm, updated: e.target.value })}
              />
              <textarea
                placeholder="Description"
                value={editForm.description}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
              />
            </div>
            <button onClick={updateBook} className="book-action-button">Update Book</button>
            <button onClick={() => setShowEditModal(false)} className="book-close-modal-button">Close</button>
          </div>
        </div>
      )}

      <table className="book-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Author</th>
            <th>Year</th>
            <th>PDF</th>
            <th>Image</th>
            <th>Categories</th>
            <th>Membership</th>
            <th>Rating</th>
            <th>Updated</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.year}</td>
              <td>{book.pdf && <a href={`data:application/pdf;base64,${book.pdf}`} download={`${book.title}.pdf`}>Download PDF</a>}</td>
              <td>{book.img && <img src={`data:image/png;base64,${book.img}`} alt={book.title} className="book-img-preview" />}</td>
              <td>{book.categories}</td>
              <td>{book.membership}</td>
              <td>{book.rating}</td>
              <td>{book.updated}</td>
              <td>{book.description}</td>
              <td>
                <button
                  onClick={() => {
                    setEditingBook(book);
                    setEditForm({
                      title: book.title,
                      author: book.author,
                      year: book.year,
                      pdf: book.pdf,
                      img: book.img,
                      categories: book.categories,
                      membership: book.membership,
                      rating: book.rating,
                      updated: book.updated,
                      description: book.description
                    });
                    setShowEditModal(true);
                  }}
                  className="book-action-button"
                >
                  Edit
                </button>
                <button onClick={() => deleteBook(book.id)} className="book-action-button">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default BookManagement;
