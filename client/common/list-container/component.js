import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';

import MasterSelector from './master-selector/component';
import Searcher from './list-searcher/component';
import ListHeading from './list-heading/component';
import ActionBar from './action-bar/component';
import ListHeader from './list-header/component';
import ItemList from './item-list/component';

import defaultListConfig from './default-config';

import './style.less';

class ListContainer extends Component {
  static populateDefaultProps(inputProps) {
    const props = _.extend({ data: {}, config: {} }, inputProps);
    const defaultState = this.state || ListContainer.getDefaultState();

    return _.extend({}, {
      data: _.extend({}, defaultState.data, props.data),
      config: _.extend({}, defaultListConfig.config, props.config),
      masterSelector: {
        data: _.extend({}, defaultState.masterSelector.data, props.masterSelector.data),
        config: _.extend({}, defaultListConfig.masterSelector.config, props.masterSelector.config),
      },
      searcher: {
        data: _.extend({}, defaultState.searcher.data, props.searcher.data),
        config: _.extend({}, defaultListConfig.searcher.config, props.searcher.config),
      },
      header: {
        data: _.extend({}, defaultState.header.data, props.header.data),
        config: _.extend({}, defaultListConfig.header.config, props.header.config),
      },
      actionBar: {
        data: _.extend({}, defaultState.actionBar.data, props.actionBar.data),
        config: _.extend({ onActionClick: () => {} }, defaultListConfig.actionBar.config, props.actionBar.config),
      },
      list: {
        data: _.extend({}, defaultState.list.data, props.list.data),
        config: _.extend({}, defaultListConfig.list.config, props.list.config),
      },
    });
  }

  static getDefaultState() {
    return {
      masterSelector: {},
      searcher: {},
      header: {},
      actionBar: {},
      list: {
        data: {
          fetching: false,
          total: 0,
          items: [],
          fetchParams: {},
        },
      },
    };
  }

  constructor(props) {
    super(props);

    this.state = ListContainer.getDefaultState();

    this.handleMaterialChange = this.handleMaterialChange.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleListLoaded = this.handleListLoaded.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
    this.handleClearAll = this.handleClearAll.bind(this);
  }

  getFetchParams() {
    return this.itemList.getFetchParams();
  }

  handleMaterialChange(options) {
    this.updateList(options);
  }

  handleSearchChange(options) {
    this.updateList(options);
  }

  handleSortChange(options) {
    this.updateList(options);
  }

  updateList(options) {
    this.itemList.updateList(options);
  }

  handleClearAll() {
    this.searcher.clear();
  }

  handleListLoaded(items, total) {
    if (this.listHeading) {
      this.listHeading.setState({ count: items.length, total, fetching: false });
    }
  }

  render() {
    const masterSelectorProps = _.extend(this.props.masterSelector, { onChange: this.handleMaterialChange });
    const searcherProps = _.extend(this.props.searcher, { onSearchChange: this.handleSearchChange });
    const listHeaderProps = _.extend(this.props.header, { onSortChange: this.handleSortChange });

    this.props.list.config.onListLoad = this.handleListLoaded;
    this.props.list.config.onClearAll = this.handleClearAll;

    return (
      <div className="list-container">
        <MasterSelector { ...masterSelectorProps } />
        <Searcher ref={ (node) => { this.searcher = node; } } { ...searcherProps } />
        <ListHeading ref={ (node) => { this.listHeading = node; } } { ...this.props.list } />
        <ActionBar { ...this.props.actionBar } />
        <ListHeader { ...listHeaderProps } />
        <ItemList ref={ (node) => { this.itemList = node; } } { ...this.props } />
      </div>
    );
  }
}

export default connect(null, null, null, { withRef: true })(ListContainer);
