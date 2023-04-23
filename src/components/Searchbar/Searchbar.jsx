import { Component } from 'react';

class Seachbar extends Component {
  state = {
    inputValue: '',
  };

  handleInput = e => {
    this.setState({
      inputValue: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.resetInput();
    this.props.onSubmit(this.state.inputValue)
  };

  resetInput = () => {
    this.setState({
      inputValue: '',
    });
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.inputValue}
            onChange={this.handleInput}
          />
        </form>
      </header>
    );
  }
}

export default Seachbar;
