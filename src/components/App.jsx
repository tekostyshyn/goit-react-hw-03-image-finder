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
        const newPictures = await API.searchPictures(searchQuery, pageNumber);
        // якщо просто розпилити сюди prevState.pictures, то при пошуку за новим ключовим словом
        // старий масив не зникає з галереї, воно додає картинки поверх масиву з попереднього пошуку.
        // я закоментую старий варіант і зроблю нижче новий, єдиний який знаю, іншого варіанту з prevState.pictures я не бачу
        // const allPictures = [...pictures, ...newPictures];
        // this.setState({ pictures: allPictures });
        let allPictures;
        if (
          prevState.searchQuery !== searchQuery &&
          prevState.pageNumber !== pageNumber
        ) {
          allPictures = [...newPictures];
        } else {
          allPictures = [...prevState.pictures, ...newPictures];
        }
        this.setState({ pictures: allPictures });
        //
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false, showButton: true });
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
