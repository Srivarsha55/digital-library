import React from 'react';
import './Card.css';

const Card = ({ book, onViewClick, onAddToLibrary, onRemoveFromLibrary }) => {
  return (
    <div className="book-item">
      <img src={`data:image/jpeg;base64,${book.img}`} alt={book.title} className="book-item_image"/>
      <div className="item-details">
        <h3 className="book-item_title">{book.title}</h3>
        <p className="author">by {book.author} • {book.year}</p>
        <p>{book.description}</p>
        <div className="book-item_buttons">
          <button onClick={() => onViewClick(book)} className="button">View</button>
          {onAddToLibrary && (
            <button onClick={() => onAddToLibrary(book)} className="button add-to-library">Add to Library</button>
          )}
          {onRemoveFromLibrary && (
            <button onClick={() => onRemoveFromLibrary(book)} className="button remove-from-library">Remove</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
