const ImageGalleryItem = ({url}) => {
  return (
    <li className="ImageGalleryItem">
      <img className="ImageGalleryItem-image" src={url} alt="" />
    </li>
  );
};

export default ImageGalleryItem
