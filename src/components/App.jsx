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
  };

  async componentDidUpdate(prevProps, prevState) {
    const { pageNumber, searchQuery, pictures } = this.state;
    if (
      prevState.searchQuery !== searchQuery ||
      prevState.pageNumber !== pageNumber
    ) {
      this.setState({ isLoading: true });
      try {
        const newPictures = await API.searchPictures(searchQuery, pageNumber);
        const allPictures = [...pictures, ...newPictures];
        this.setState({ pictures: allPictures });
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  searchPics = value => {
    this.setState({
      searchQuery: value,
      pageNumber: 1,
      pictures: [],
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
    const { pictures, largeImgUrl, showModal, isLoading } = this.state;
    return (
      <>
        <Seachbar onSubmit={this.searchPics} />
        {pictures.length > 0 && (
          <ImageGallery pics={pictures} onClick={this.openModal} />
        )}
        {isLoading && <Loader />}
        {pictures.length > 0 && isLoading === false && <Button onClick={this.changePageNumber} />}
        {showModal && <Modal onClose={this.closeModal} url={largeImgUrl} />}
      </>
    );
  }
}
