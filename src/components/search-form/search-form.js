import React, { Component } from 'react';
import { debounce } from 'lodash';

import './search-form.css';

export default class SearchForm extends Component {
  state = {
    label: '',
  };

  debounceQuery = debounce(() => {
    this.props.updateInformation(this.state.label);
    this.setState({
      label: '',
    });
  }, 1000);

  addNewQuery = (e) => {
    this.setState({
      label: e.target.value,
    });
    this.debounceQuery(e.target.value);
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({
      label: '',
    });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input autoFocus placeholder="Type to search..." onChange={this.addNewQuery} value={this.state.label} />
      </form>
    );
  }
}
