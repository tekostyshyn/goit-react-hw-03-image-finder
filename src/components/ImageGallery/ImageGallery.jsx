import ImageGalleryItem from 'components/ImageGalleryItem';
import { Component } from 'react';

class ImageGallery extends Component {
  componentDidUpdate(prevProps) {
    const { height: cardHeight } = document
    .querySelector('.ImageGallery')
    .firstElementChild.getBoundingClientRect();

    if (prevProps.pics.length !== this.props.pics.length) {
      window.scrollBy({
        bottom: cardHeight * 4,
        behavior: 'smooth',
      });
    }
  }

  render() {
    const { pics, onClick } = this.props;
    return (
      <ul className="ImageGallery">
        {pics.map(pic => {
          return (
            <ImageGalleryItem
              url={pic.webformatURL}
              key={pic.id}
              onClick={onClick}
            />
          );
        })}
      </ul>
    );
  }
}

export default ImageGallery;
