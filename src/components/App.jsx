import { Component } from 'react';
import Seachbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import * as API from 'services/api';

export class App extends Component {
  state = {
    searchQuery: '',
    pageNumber: 1,
    pictures: [],
    isLoading: false,
    error: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { pageNumber, searchQuery } = this.state;
    if (
      prevState.searchQuery !== searchQuery ||
      prevState.pageNumber !== pageNumber
    ) {
      this.setState({ isLoading: true });
      try {
        const newPictures = await API.searchPictures(searchQuery, pageNumber);
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
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  getSearchQuery = value => {
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

  render() {
    const { pictures } = this.state;
    return (
      <div>
        <Seachbar onSubmit={this.getSearchQuery} />
        <ImageGallery pics={pictures} />
        {pictures.length > 0 && <Button onClick={this.changePageNumber} />}
      </div>
    );
  }
}
