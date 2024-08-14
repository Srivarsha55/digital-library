import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import Footer from '../../Footer';
import './Library.css';
import Card from './Card';

const Library = ({ isLoggedIn, onLogout }) => {
  const [library, setLibrary] = useState([]);
  const [userMembership, setUserMembership] = useState('free'); 
  const navigate = useNavigate();

  useEffect(() => {
    const savedLibrary = JSON.parse(localStorage.getItem('library')) || [];
    setLibrary(savedLibrary);
    const savedUserMembership = localStorage.getItem('userMembership') || 'free';
    setUserMembership(savedUserMembership);
  }, []);

  const handleRemoveFromLibrary = (book) => {
    const updatedLibrary = library.filter((item) => item.title !== book.title);
    setLibrary(updatedLibrary);
    localStorage.setItem('library', JSON.stringify(updatedLibrary));
  };

  const handleViewClick = (book) => {
    if (
      (book.membership === 'premium' && userMembership !== 'premium') ||
      (book.membership === 'basic' && userMembership === 'free')
    ) {
      navigate('/membership', { state: { requiredMembership: book.membership } });
    } else {
      navigate(`/book/${book.id}`);
    }
  };

  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <div className="library">
        <h1>My Library</h1>
        <div className="library-list">
          {library.length === 0 ? (
            <p>Your library is empty.</p>
          ) : (
            library.map((book, index) => (
              <Card
                key={index}
                book={book}
                onViewClick={() => handleViewClick(book)}
                onRemoveFromLibrary={() => handleRemoveFromLibrary(book)}
              />
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Library;
