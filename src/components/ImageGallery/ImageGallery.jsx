import ImageGalleryItem from 'components/ImageGalleryItem';

const ImageGallery = ({ pics }) => {
  return (
    <ul className="ImageGallery">
      {pics.map(pic => {
        return <ImageGalleryItem url={pic.webformatURL} key={pic.id}/>;
      })}
    </ul>
  );
};

export default ImageGallery;
