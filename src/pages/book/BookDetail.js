import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../../components/NavBar';
import Footer from '../../Footer'; 
import './BookDetail.css';

const BookDetail = () => {
  const { id } = useParams(); // Get the book ID from the URL
  const [book, setBook] = useState(null);
  const [rating, setRating] = useState(0);
  const [userRating, setUserRating] = useState(0);

  useEffect(() => {
    console.log('Fetching book with ID:', id);

    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/books/${id}`); // Fetch book based on ID
        console.log('Book data:', response.data); 
        if (response.status === 200 && response.data) {
          setBook(response.data);
          setRating(response.data.rating);
        } else {
          console.error('Book not found');
        }
      } catch (error) {
        console.error('Error fetching book data:', error.response ? error.response.data : error.message);
        setBook({ pdf: null }); 
      }
    };

    fetchBook();
  }, [id]);

  const handleRatingClick = (value) => {
    setUserRating(value);
    setRating((prevRating) => (prevRating * 4 + value) / 5); 
  };

  if (!book) {
    return <div>Book not found</div>; 
  }

  return (
    <div>
      <NavBar />
      <div className="book-detail">
        <div className="left-side">
          <div className="book-image">
            {book.img ? (
              <img src={`data:image/jpeg;base64,${book.img}`} alt={book.title} />
            ) : (
              <p>No image available</p>
            )}
          </div>
          <div className="book-info">
            <h3>{book.title || 'Title not available'}</h3>
            <p>by {book.author || 'Author not available'} • {book.year || 'Year not available'}</p>
            <div className="rating">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`star ${userRating > i ? 'filled' : ''}`}
                    onClick={() => handleRatingClick(i + 1)}
                  >
                    ★
                  </span>
                ))}
              </div>
              <p>Average Rating: {rating.toFixed(1)}</p>
            </div>
          </div>
        </div>
        <div className="right-side">
          <p className="book-description">{book.description || 'Description not available'}</p>
          {book.pdf ? (
            <div className="pdf-viewer">
              <button onClick={() => window.open(`data:application/pdf;base64,${book.pdf}`, '_blank')}>Read Book</button>
            </div>
          ) : (
            <p>PDF not available</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookDetail;
