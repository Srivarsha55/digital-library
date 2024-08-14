import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Carousel.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const isNewArrival = (updatedDate) => {
    const currentDate = new Date();
    const updated = new Date(updatedDate);
    const diffTime = Math.abs(currentDate - updated);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30; 
};

const NewArrivalCarousel = ({ userMembership }) => {
    const [newArrivals, setNewArrivals] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNewArrivals = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/books/getall');
                const books = response.data.filter(book => isNewArrival(book.updated));
                setNewArrivals(books);
            } catch (error) {
                console.error('Error fetching new arrivals:', error);
            }
        };
        fetchNewArrivals();
    }, []);

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
            {newArrivals.length > 0 ? (
                <Slider {...settings}>
                    {newArrivals.map((book, index) => (
                        <div key={index} className="carousel-card">
                            <img src={`data:image/jpeg;base64,${book.img}`} alt={book.title} className="carousel-image" />
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
                <p>No new arrivals available.</p>
            )}
        </div>
    );
};

export default NewArrivalCarousel;
