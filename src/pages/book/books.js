import React from 'react';
import NavBar from '../../components/NavBar'; // Adjust the path if necessary
import Footer from '../../Footer'; // Adjust the path if necessary
import BookBar from './BookBar';
import './book.css';

const BookViewer = () => (
  <div>
    <NavBar />
    <div id="main-container" className="main-container nav-effect-1">
      <div className="divider"></div> {/* Divider added here */}
      <BookBar />
      <div className="page-container">
        <section id="book_list">
          <div className="grid-shuffle">
            <ul id="grid" className="row">
              {/* Book items will be added here */}
            </ul>
          </div>
        </section>
      </div>
    </div>
    <Footer />
  </div>
);

export default BookViewer;
