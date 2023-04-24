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
    const { pageNumber, searchQuery, pictures } = this.state;
    let responseLength;
    if (
      prevState.searchQuery !== searchQuery ||
      prevState.pageNumber !== pageNumber
    ) {
      this.setState({ isLoading: true, showButton: false });
      try {
        const newPictures = await API.searchPictures(searchQuery, pageNumber);
        responseLength = Math.floor(newPictures.length / 12);
        const allPictures = [...pictures, ...newPictures];
        this.setState({ pictures: allPictures });
        // якщо просто розпилити сюди prevState.pictures, то при пошуку за новим ключовим словом
        // старий масив не зникає з галереї, воно додає картинки поверх масиву з попереднього пошуку.
        // на жаль я не можу придумати як це виправити, можливо ви можете допомогти
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false, showButton: responseLength < 1 ? false : true });
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
    const { pictures, largeImgUrl, showModal, isLoading, showButton } = this.state;
    return (
      <>
        <Seachbar onSubmit={this.searchPics} />
        {pictures.length > 0 && (
          <ImageGallery pics={pictures} onClick={this.openModal} />
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
