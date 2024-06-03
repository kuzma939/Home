import styles from './ImageCard.module.css';
const ImageCard = ({ image, onImageClick }) => {
  const handleClick = () => {
    onImageClick(image);
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      <img src={image.urls.small} alt={image.alt_description} className={styles.image} />
    </div>
  );
};


export default ImageCard;