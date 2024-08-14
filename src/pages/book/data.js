import book1Img from '../book/asserts/dune.jpeg';
import book1Pdf from '../book/pdf/dune.pdf';
import book2Img from '../book/asserts/book1984.jpeg';
import book2Pdf from '../book/pdf/book1984.pdf';
import book3Img from '../book/asserts/catcher.jpeg';
import book3Pdf from '../book/pdf/catcher.pdf';
import book4Img from '../book/asserts/cinderlla.jpeg';
import book4Pdf from '../book/pdf/cinderella.pdf';
import book5Img from '../book/asserts/mice.png';
import book5Pdf from '../book/pdf/mice.pdf';
import book6Img from '../book/asserts/The Hobbit.jpeg';
import book6Pdf from '../book/pdf/hobbit.pdf';
import book7Img from '../book/asserts/all.jpeg';
import image1 from '../book/asserts/na1.png';
import image2 from '../book/asserts/na2.png';
import image3 from '../book/asserts/na3.png';
import image4 from '../book/asserts/na4.png';
import image5 from '../book/asserts/na5.png';
import image6 from '../book/asserts/na6.png';
import image7 from '../book/asserts/na7.png';
import image8 from '../book/asserts/na8.png';
import image9 from '../book/asserts/na9.png';

const data = [
  {
    title: 'Of Mice and Men',
    author: 'John Steinbeck',
    year: 1937,
    pdf: book5Pdf,
    img: book5Img,
    categories: ['young'],
    membership: 'free',
    rating:0,
    updated: '2024-07-20',  // Example date
    description: '“Of Mice and Men” by John Steinbeck is a poignant novella set during the Great Depression...'
  },
  {
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    year: 1951,
    pdf: book3Pdf,
    img: book3Img,
    categories: ['fantasy'],
    membership: 'premium',
    rating: 4.2,
    updated: '2024-07-15',  // Example date
    description: '“The Catcher in the Rye” by J.D. Salinger is a classic novel that explores the challenges of teenage angst and alienation...'
  },
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    year: 1937,
    pdf: book6Pdf,
    img: book6Img,
    categories: ['fantasy'],
    membership: 'premium',
    rating: 4.8,
    updated: '2024-06-25',  // Example date
    description: '“The Hobbit” by J.R.R. Tolkien is a beloved fantasy novel that follows the adventure of Bilbo Baggins...'
  },
  {
    title: 'Dune',
    author: 'Frank Herbert',
    year: 1965,
    pdf: book1Pdf,
    img: book1Img,
    categories: ['sci-fi'],
    membership: 'premium',
    rating: 4.6,
    updated: '2024-07-10',  // Example date
    description: '“Dune” by Frank Herbert is a seminal science fiction novel set in a distant future amidst a sprawling feudal interstellar empire...'
  },
  {
    title: '1984',
    author: 'George Orwell',
    year: 1949,
    pdf: book2Pdf,
    img: book2Img,
    categories: ['classic'],
    membership: 'free',
    rating: 4.7,
    updated: '2024-07-05',  // Example date
    description: '“1984” by George Orwell is a dystopian novel set in a totalitarian society ruled by the Party and its leader, Big Brother...'
  },
  {
    title: 'Cinderella',
    author: 'Charles Perrault',
    year: 1697,
    pdf: book4Pdf,
    img: book4Img,
    categories: ['fairy'],
    membership: 'free',
    rating: 4.3,
    updated: '2024-06-30',  // Example date
    description: '“Cinderella” by Charles Perrault is a classic fairy tale about a young woman who, despite her hardships and mistreatment...'
  },
  {
    title: 'All the Twisted Secrets',
    author: 'Angela Hart',
    year: 2021,
    img: book7Img,
    categories: ['mystery', 'thriller'],
    membership: 'premium',
    rating: 4.7,
    updated: '2024-07-25',  // Example date
    description: 'A gripping mystery about friends unraveling dark secrets and betrayal from their past.'
  },
  {
    title: 'Spear',
    author: 'Jack Whyte',
    year: 2000,
    img: image1,
    categories: ['historical'],
    membership: 'free',
    rating: 4.2,
    updated: '2024-06-28',  // Example date
    description: '“Spear” by Jack Whyte is a historical novel set in the ancient world...'
  },
  {
    title: 'Sword',
    author: 'Robert Holdstock',
    year: 2001,
    img: image2,
    categories: ['fantasy'],
    membership: 'basic',
    rating: 4.0,
    updated: '2024-07-12',  // Example date
    description: '“Sword” by Robert Holdstock is a thrilling fantasy novel with epic battles...'
  },
  {
    title: 'Soldier',
    author: 'Tom Clancy',
    year: 2003,
    img: image3,
    categories: ['military', 'thriller'],
    membership: 'premium',
    rating: 4.6,
    updated: '2024-07-18',  // Example date
    description: '“Soldier” by Tom Clancy is a gripping military thriller full of strategic intrigue...'
  },
  {
    title: 'Time',
    author: 'H.G. Wells',
    year: 1895,
    img: image4,
    categories: ['sci-fi'],
    membership: 'free',
    rating: 4.5,
    updated: '2024-07-02',  // Example date
    description: '“Time” by H.G. Wells is a classic science fiction novel exploring time travel...'
  },
  {
    title: 'Stay with Me',
    author: 'Ayobami Adebayo',
    year: 2017,
    img: image5,
    categories: ['drama'],
    membership: 'basic',
    rating: 4.4,
    updated: '2024-07-22',  // Example date
    description: '“Stay with Me” by Ayobami Adebayo is a compelling story of love and family in Nigeria...'
  },
  {
    title: 'The Young Wizard',
    author: 'Diana Wynne Jones',
    year: 2001,
    img: image6,
    categories: ['fantasy'],
    membership: 'premium',
    rating: 4.7,
    updated: '2024-07-08',  // Example date
    description: '“The Young Wizard” by Diana Wynne Jones is a magical adventure full of wonder and excitement...'
  },
  {
    title: 'Pencil',
    author: 'James L. Brooks',
    year: 2005,
    img: image7,
    categories: ['creative'],
    membership: 'free',
    rating: 4.1,
    updated: '2024-06-26',  // Example date
    description: '“Pencil” by James L. Brooks is a captivating story about creativity and expression...'
  },
  {
    title: 'Soul',
    author: 'Frank Peretti',
    year: 2010,
    img: image8,
    categories: ['religious'],
    membership: 'basic',
    rating: 4.3,
    updated: '2024-07-11',  // Example date
    description: '“Soul” by Frank Peretti is a powerful novel exploring the battle between good and evil...'
  },
  {
    title: 'The Mirror of Destiny',
    author: 'J.K. Rowling',
    year: 2015,
    img: image9,
    categories: ['fantasy'],
    membership: 'premium',
    rating: 4.8,
    updated: '2024-07-01',  // Example date
    description: '“The Mirror of Destiny” by J.K. Rowling is a thrilling addition to the magical world...'
  }
];

const membershipData = [
  {
    plan: 'Free Plan',
    price: '$0.00',
    description: 'Explore a selection of popular titles with our Free Plan—no commitment required.',
  },
  {
    plan: 'Premium Plan',
    price: '$14.99/month',
    description: 'Enjoy unlimited access to all content and exclusive releases with our Premium Plan.',
    offer: 'Limited time offer: Get 1 month free with annual subscription.',
  },
];

export default { data, membershipData };
