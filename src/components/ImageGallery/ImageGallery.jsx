import ImageGalleryItem from 'components/ImageGalleryItem';

const ImageGallery = ({ pics, onClick }) => {
  return (
    <ul className="ImageGallery">
      {pics.map(pic => {
        return <ImageGalleryItem url={pic.webformatURL} key={pic.id} onClick={onClick}/>;
      })}
    </ul>
  );
};

export default ImageGallery;
