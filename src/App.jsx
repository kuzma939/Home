import { useState, useEffect } from 'react'
import './App.css'
import SearchBar from './components/SearchBar/SearchBar'
import { fetchImages } from './api'
import ImageGallery from './components/ImageGallery/ImageGallery'
import Loader from './components/Loader/Loader'
import ErrorMessage from './components/ErrorMessage/ErrorMessage'
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn'
import ImageModal from './components/ImageModal/ImageModal'
import { Toaster } from 'react-hot-toast';
const App = () => {
 
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalImage, setModalImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    if (query === '')return;
    
    async function getData() {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchImages(query, page);
        setImages(prevImages => {
          return [...prevImages, ...data.results];
        });
    
      } catch {
        setError('Failed to fetch images. Please try again.');
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [page, query]);

  const handleSearch = (newQuery) => {
   // if (newQuery !== query) {
      setQuery(newQuery);
      setImages([]);
      setPage(1);
    
  };
  const openModal = (image) => {
    setModalImage(image);
     setShowModal(true);
   };
   const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
    
  };
  const closeModal = () => {
    setShowModal(false);
    setModalImage(null);
  };
  return <>
  <SearchBar onSubmit={handleSearch} />
  {images.length > 0 && <ImageGallery images={images}  openModal={openModal} />}
  {loading && <Loader />}
  {error && <ErrorMessage message={error} />}
  {images.length > 0 && !loading && <LoadMoreBtn onClick={handleLoadMore} />}
 
  {modalImage && (
        <ImageModal isOpen={showModal} onRequestClose={closeModal} image={modalImage} />
      )}
      <Toaster position="top-right" />
  </>
}

export default App




