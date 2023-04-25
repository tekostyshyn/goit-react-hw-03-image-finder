import { Component } from 'react';
import Seachbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Modal from './Modal';
import Loader from './Loader';
import * as API from 'services/api';

export class App extends Component {
  state = {
    searchQuery: '',
    pageNumber: 1,
    pictures: [],
    isLoading: false,
    error: null,
    largeImgUrl: '',
    showModal: false,
    showButton: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { pageNumber, searchQuery } = this.state;
    if (
      prevState.searchQuery !== searchQuery ||
      prevState.pageNumber !== pageNumber
    ) {
      this.setState({ isLoading: true, showButton: false });
      try {
        const fetchedPictures = await API.searchPictures(searchQuery,pageNumber);
        const picturesAmount = fetchedPictures.totalHits;
        const newPictures = fetchedPictures.hits.map(
          ({ id, webformatURL, largeImageURL }) => {
            return { id, webformatURL, largeImageURL };
          }
        );
        this.setState((prevState) => {
          return {
            pictures: [...prevState.pictures, ...newPictures],
            showButton: pageNumber < Math.ceil(picturesAmount / 12),
          }
        } 
    );
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  searchPics = value => {
    this.setState({
      pictures: [],
      searchQuery: value,
      pageNumber: 1,
    });
  };

  changePageNumber = () => {
    this.setState({
      pageNumber: this.state.pageNumber + 1,
    });
  };

  openModal = url => {
    this.setState({
      largeImgUrl: url,
      showModal: true,
    });
  };

  closeModal = () => {
    this.setState({
      largeImgUrl: '',
      showModal: false,
    });
  };

  render() {
    const {pageNumber, pictures, largeImgUrl, showModal, isLoading, showButton } =
      this.state;
    return (
      <>
        <Seachbar onSubmit={this.searchPics} />
        {pictures.length > 0 && (
          <ImageGallery pics={pictures} onClick={this.openModal} pageNumber={pageNumber}/>
        )}
        {isLoading && <Loader />}
        {pictures.length > 0 && showButton === true && (
          <Button onClick={this.changePageNumber} />
        )}
        {showModal && <Modal onClose={this.closeModal} url={largeImgUrl} />}
      </>
    );
  }
}
