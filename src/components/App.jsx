import { Component } from 'react';
import Seachbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import axios from 'axios';

const KEY = '8210264-2ea871c1a05460bb4aaa242b8';
axios.defaults.baseURL = 'https://pixabay.com/api';

export class App extends Component {
  state = {
    searchQuery: '',
    pageNumber: 1,
    pictures: [],
  };

  async componentDidUpdate(prevProps, prevState) {
    const { pageNumber, searchQuery } = this.state;

    if (
      prevState.searchQuery !== searchQuery ||
      prevState.pageNumber !== pageNumber
    ) {
      const response = await axios.get(
        `?q=${searchQuery}&page=${pageNumber}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );
      const newPictures = response.data.hits.map(
        ({ id, webformatURL, largeImageURL }) => {
          return { id, webformatURL, largeImageURL };
        }
      );

      if (
        prevState.searchQuery !== searchQuery &&
        prevState.pageNumber !== pageNumber
      ) {
        const searchedPictures = [...newPictures];
        this.setState({ pictures: searchedPictures });
        return;
      }

      const searchedPictures = [...prevState.pictures, ...newPictures];
      this.setState({ pictures: searchedPictures });
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
    const {pictures} = this.state;
    return (
      <div>
        <Seachbar onSubmit={this.getSearchQuery} />
        <ImageGallery pics={pictures} />
        {pictures.length > 0 && <Button onClick={this.changePageNumber} />}
      </div>
    );
  }
}
