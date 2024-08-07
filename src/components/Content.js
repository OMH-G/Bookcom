import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useClerk, useUser } from '@clerk/clerk-react';

export default function Content() {
  const [imageUrls, setImageUrls] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    author: '',
    isbn: '',
    price: '',
    publisher: '',
    year: '',
  });

  const [categoryList, setCategoryList] = useState({});

  const { session } = useClerk();
  const { isLoaded, isSignedIn, user } = useUser();

  async function getDescription(book) {
    const token = await session.getToken();
    console.log(book)
    try {
      const response = await axios.post('http://localhost:8080/Bookcom/book/getDescription',{"bookId":book},{

        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      response.data['year']=new Date(response.data['year']).getFullYear();
      console.log(response.data)
      setFormData(response.data);
      return response.data;
      // setCategoryList(response.data);
    } catch (error) {
      console.error('There was an error uploading the book!', error);
    }
  }

  useEffect(() => {
    async function fetchImage() {
      const url = 'http://localhost:8080/Bookcom/book/getAllImages';
      const jwt_token = await session.getToken();

      axios
        .get(url, { headers: { Authorization: `Bearer ${jwt_token}` } })
        .then((response) => {
          setImageUrls(response.data);
        })
        .catch((error) => console.error('Error fetching image:', error));
    }

    fetchImage();
  }, []);

  const openModal = (book) => {
    getDescription(book[1]);
    setSelectedBook(book);
    setFormData({
      title: book.title,
      category: book.category,
      author: book.author,
      isbn: book.isbn,
      price: book.price,
      publisher: book.publisher,
      year: book.year,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
    setFormData({
      title: '',
      category: '',
      author: '',
      isbn: '',
      price: '',
      publisher: '',
      year: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const url = selectedBook ? `http://localhost:8080/Bookcom/book/update` : 'http://localhost:8080/Bookcom/book/create';
    const jwt_token = await session.getToken();

    const data = new FormData();
    data.append('title', formData.title);
    data.append('category', formData.category);
    data.append('author', formData.author);
    data.append('isbn', formData.isbn);
    data.append('publisher', formData.publisher);
    data.append('year', formData.year);
    data.append('price', formData.price);
    data.append('id', selectedBook[0]);

    axios
      .post(url, data, { headers: { Authorization: `Bearer ${jwt_token}` } })
      .then((response) => {
        console.log('Book updated:', response.data);
        closeModal();
      })
      .catch((error) => console.error('Error updating book:', error));
  };

  const OrderBook = async (bookId) => {
    let data= await getDescription(bookId);
    data['bookid']=bookId
    const url = `http://localhost:8080/Bookcom/orders/create`;
    const jwt_token = await session.getToken();
    axios
      .post(url,data,{headers: { Authorization: `Bearer ${jwt_token}` } })
      .then((response) => {
        console.log('Book Ordered:', response.data);
      })
      .catch((error) => console.error('Error deleting book:', error));
  };

  return (
    <>
 <div className="min-h-screen bg-gradient-to-br from-purple-800 via-violet-900 to-gray-900 p-5">
  <div className="grid gap-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 justify-items-center">
    {imageUrls.length !== 0 ? (
      imageUrls.map((item, index) => (
        <div
          key={index}
          className="group border-gray-100/30 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border bg-gray-800 shadow-lg transform transition-transform duration-500 hover:scale-105"
        >
          <a
            className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
            href="#"
          >
            <img
              className="peer absolute top-0 right-0 h-full w-full object-cover transform transition-transform duration-500 group-hover:scale-110"
              src={item[2]}
              alt={index + 1}
            />
            <img
              className="peer peer-hover:right-0 absolute top-0 -right-96 h-full w-full object-cover transition-all delay-100 duration-1000 hover:right-0"
              src={item[3]}
              alt="product image"
            />
            <svg
              className="group-hover:animate-ping group-hover:opacity-30 peer-hover:opacity-0 pointer-events-none absolute inset-x-0 bottom-5 mx-auto text-3xl text-white transition-opacity"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="img"
              width="1em"
              height="1em"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 32 32"
            >
              <path
                fill="currentColor"
                d="M2 10a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v10a4 4 0 0 1-2.328 3.635a2.996 2.996 0 0 0-.55-.756l-8-8A3 3 0 0 0 14 17v7H6a4 4 0 0 1-4-4V10Zm14 19a1 1 0 0 0 1.8.6l2.7-3.6H25a1 1 0 0 0 .707-1.707l-8-8A1 1 0 0 0 16 17v12Z"
              />
            </svg>
          </a>
          <div className="mt-4 px-5 pb-5">
            <button
              onClick={() => openModal(item)}
              className="hover:border-white/40 flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300 transform transition-transform duration-300 hover:scale-105"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 3v2a2 2 0 002 2h2M5 21v-2a2 2 0 012-2h14a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
              Description
            </button>
            <button
              onClick={() => OrderBook(item[1])}
              className="hover:border-white/40 flex items-center justify-center rounded-md border border-transparent bg-red-600 px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-red-300 transform transition-transform duration-300 hover:scale-105"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 7H5m7-4v4m-1 4v4m-4 0v4m5-9v-4m-2 4v4m4 0v4m4-4v4m-4-4v4"
                />
              </svg>
              Buy
            </button>
          </div>
        </div>
      ))
    ) : (
      <p className="text-white text-xl">No images found.</p>
    )}
  </div>
</div>

{isModalOpen && (
  <div
    className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75 animate-fade-in"
    onClick={closeModal}
  >
    <div
      className="bg-white rounded-lg overflow-hidden w-1/3"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="p-4">
        <h2 className="text-xl mb-4">{selectedBook ? 'Edit Book' : 'Add Book'}</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              disabled
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
              Category
            </label>
            <input
              id="category"
              name="category"
              value={formData.category}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              disabled
            >
            </input>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="author">
              Author
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              disabled
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="isbn">
              ISBN
            </label>
            <input
              type="number"
              id="isbn"
              name="isbn"
              value={formData.isbn}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              minLength={10}
              maxLength={12}
              disabled
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              min={0}
              disabled
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="publisher">
              Publisher
            </label>
            <input
              type="text"
              id="publisher"
              name="publisher"
              value={formData.publisher}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              disabled
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="year">
              Year
            </label>
            <input
              type="number"
              id="year"
              name="year"
              value={formData.year}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              min={1902}
              max={new Date().getFullYear()}
              disabled
            />
          </div>
        </form>
      </div>
    </div>
  </div>
)}

</>

  
  
  );
}

