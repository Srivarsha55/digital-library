import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Carousel.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const getUserLibraryGenres = () => {
    const library = JSON.parse(localStorage.getItem('library')) || [];
    const genres = new Set();
    library.forEach(book => {
        if (Array.isArray(book.categories)) {
            book.categories.forEach(genre => genres.add(genre));
        }
    });
    return Array.from(genres);
};

const filterBooksByGenres = (books, genres) => {
    return books.filter(book =>
        Array.isArray(book.categories) && book.categories.some(genre => genres.includes(genre))
    );
};

const BookCarousel = ({ userMembership }) => {
    const [filteredBooks, setFilteredBooks] = useState([]);
    const navigate = useNavigate();
    const userGenres = getUserLibraryGenres();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/books/getall');
                const books = filterBooksByGenres(response.data, userGenres);
                setFilteredBooks(books);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };
        fetchBooks();
    }, [userGenres]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 3000,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
    };

    const handleViewClick = (book) => {
        if (
            (book.membership === 'premium' && userMembership !== 'premium') ||
            (book.membership === 'basic' && userMembership === 'free')
        ) {
            navigate('/membership', { state: { requiredMembership: book.membership } });
        } else {
            navigate(`/book/${book.title}`);
        }
    };

    const handleAddToLibrary = (book) => {
        console.log(`Adding ${book.title} to the library`);
        const savedLibrary = JSON.parse(localStorage.getItem('library')) || [];
        if (!savedLibrary.find(item => item.title === book.title)) {
            const updatedLibrary = [...savedLibrary, book];
            localStorage.setItem('library', JSON.stringify(updatedLibrary));
        }
        navigate('/library');
    };

    return (
        <div className="carousel-container">
            {filteredBooks.length > 0 ? (
                <Slider {...settings}>
                    {filteredBooks.map((book, index) => (
                        <div key={index} className="carousel-card">
                            <img src={book.img} alt={book.title} className="carousel-image" />
                            <div className="info">
                                <h3>{book.title}</h3>
                                <p>by {book.author}</p>
                                <div className="actions">
                                    <button onClick={() => handleViewClick(book)} className="button">View</button>
                                    <button onClick={() => handleAddToLibrary(book)} className="button">Add to Library</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            ) : (
                <p>No books available based on your library genres.</p>
            )}
        </div>
    );
};

export default BookCarousel;
