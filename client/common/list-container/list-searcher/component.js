import React, { Component } from 'react';
import _ from 'underscore';
import Switch from 'react-switch';

import DVUtils from 'shared/utils';

import './style.less';

class Searcher extends Component {
  constructor(props) {
    super(props);

    this.clearSearch = this.clearSearch.bind(this);
    this.handleSearchButtonClick = this.handleSearchButtonClick.bind(this);
    this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
    this.triggerExactMatchChange = this.triggerExactMatchChange.bind(this);
  }

  componentDidMount() {
    this.lastSearchBy = this.props.config.searchBy;
    this.updateSearchString(_.isObject(this.props.data) ? this.props.data.value : DVUtils.EMPTY_STRING);
  }

  handleSearchButtonClick() {
    this.triggerSearch(this.node.querySelector('.search').value, {
      forceTrigger: true,
    });
  }

  handleSearchInputChange(event) {
    if (this.searchProcessId) {
      clearTimeout(this.searchProcessId);
    }

    const searchValue = event.currentTarget.value;
    this.triggerSearch(searchValue);
  }

  clearSearch() {
    this.clear();
  }

  clear(skipTrigger) {
    this.updateSearchString(DVUtils.EMPTY_STRING);
    this.triggerChangeSearchEvent(DVUtils.EMPTY_STRING, { skipTrigger });
  }

  updateSearchString(value) {
    const valueToSet = value || DVUtils.EMPTY_STRING;
    this.node.querySelector('.search').value = valueToSet;
    this.toggleClearSearchElement(valueToSet);
  }

  triggerSearch(searchValue, options) {
    const that = this;

    this.searchProcessId = setTimeout(() => {
      that.triggerChangeSearchEvent(searchValue, options);
    }, this.props.config.timeout);
  }

  triggerChangeSearchEvent(newValue, optionsJson) {
    const options = optionsJson || {};
    const trimmedValue = newValue.replace(/^\s+|\s+$/g, '');

    this.toggleClearSearchElement(trimmedValue);
    if ((!options.skipTrigger && this.hasSearchContextChanged(trimmedValue)) || options.forceTrigger) {
      if (_.isFunction(this.props.onSearchChange)) {
        const searchOptions = {};
        searchOptions[this.lastSearchBy] = trimmedValue;

        this.props.onSearchChange(searchOptions);
      }
    }

    // Save the current value for next time comparison.
    this.lastSearchString = trimmedValue;
  }

  triggerExactMatchChange(checked) {
    const searchOptions = {};
    searchOptions[this.lastSearchBy] = this.lastSearchString;
    searchOptions.exact = checked;
    this.props.onSearchChange(searchOptions);
  }

  toggleClearSearchElement(flag) {
    this.node.querySelector('.clear-search').classList.toggle('hidden', !flag);
  }

  hasSearchContextChanged(searchString) {
    return this.lastSearchString !== searchString || this.lastSearchBy !== this.searchBy;
  }

  render() {
    return (
      <div className="list-searcher" ref={ (node) => { this.node = node; } }>
        <span className="search-container">
          <input
            className="search light-border"
            title="Search"
            onChange={ this.handleSearchInputChange }
            placeholder={ this.props.config.placeholder }
          />
          <button type="button" className="icon clear-search hidden" onClick={ this.clearSearch } >X</button>
        </span>
        <button type="button" className="search-button light-border" onClick={ this.handleSearchButtonClick } >
          <img src="images/search.png" alt="Search" />
        </button>
        <div className="exact-match">
          <Switch onChange={ this.triggerExactMatchChange } checked={ this.props.data.exact } />
          <div className="label">Exact Match</div>
        </div>
      </div>
    );
  }
}

export default Searcher;
