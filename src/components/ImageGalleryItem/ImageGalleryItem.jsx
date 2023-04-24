const ImageGalleryItem = ({url, onClick}) => {
  return (
    <li className="ImageGalleryItem" onClick={() => {onClick(url)}}>
      <img className="ImageGalleryItem-image" src={url} alt="" />
    </li>
  );
};

export default ImageGalleryItem
