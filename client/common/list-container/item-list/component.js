import React, { Component } from 'react';
import _ from 'underscore';

import DVUtils from 'shared/utils';

import EmptyItemList from './empty-item-list';
import NoSearchResults from './no-search-results';
import FetchingResults from './fetching-results';

import './style.less';

class ItemList extends Component {
  static getUpdatedFetchParams(props, inputParams, options) {
    const initialParams = inputParams || {};
    const paramsToUpdate = options || {};
    const fetchParams = _.isFunction(props.list.config.getUpdatedFetchParams)
      ? props.list.config.getUpdatedFetchParams(paramsToUpdate)
      : paramsToUpdate;

    _.each(fetchParams, (value, param) => {
      if (_.isUndefined(value) || _.isNull(value) || (_.isString(value) && _.isEmpty(value))) {
        delete initialParams[param];
      } else {
        initialParams[param] = value;
      }
    });

    return initialParams;
  }

  constructor(props) {
    super(props);

    // Make sure we have callback defined for list item
    if (!_.isFunction(this.props.list.config.getListItemTemplate)) {
      throw new Error('Item template callback not defined for the item list');
    } else if (!_.isFunction(this.props.list.config.fetchItems)) {
      throw new Error('Item list fetch callback not defined for the item list');
    }

    this.state = {
      items: props.list.data.items,
      fetchParams: ItemList.getUpdatedFetchParams(props, props.list.config.fetchParams, props.list.data.fetchParams),
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    this.updateScrollContainer();
    this.updateList();
  }

  componentDidUpdate() {
    if (_.isFunction(this.props.list.config.onListLoad)) {
      this.props.list.config.onListLoad(this.getItemList(), this.props.list.data.total);
    }
  }

  getItemList() {
    return DVUtils.getMergedItems(this.state.items, this.props.list.data.items, this.props.list.config.key);
  }

  getNoItemsTemplate() {
    if (this.props.list.data.fetching) {
      return <FetchingResults { ...this.props } />;
    }

    if (_.isFunction(this.props.list.config.hasFilters) && this.props.list.config.hasFilters(this.state.fetchParams)) {
      return <NoSearchResults { ...this.props } />;
    }

    return <EmptyItemList { ...this.props } />;
  }

  getListItemTemplate() {
    const items = this.getItemList();

    if (items.length === 0) {
      return <li className="empty-list-default-text-container">{ this.getNoItemsTemplate() }</li>;
    }

    return (
      items.map((item) => {
        return (
          <li className="list-item" key={ item[this.props.list.config.key] }>
            { this.props.list.config.getListItemTemplate(item, this.props.list.data.fetchParams) }
          </li>
        );
      })
    );
  }

  getFetchParams() {
    return this.state.fetchParams;
  }

  handleItemClick(itemJson, event) {
    if (_.isFunction(this.props.list.config.onItemClick)) {
      this.props.list.config.onItemClick(itemJson, event);
    }
  }

  handleScroll(event) {
    event.stopPropagation();

    // NO-OP if the list is already loading.
    if (this.props.list.data.fetching) {
      return;
    }

    const listContainer = event.currentTarget;
    const SCROLL_BOTTOM_DECIDER = 0.8;
    // After scroll bar reaches 80% of scrolling element's height, we will fetch next items
    if (listContainer.scrollTop + listContainer.clientHeight >= SCROLL_BOTTOM_DECIDER * listContainer.scrollHeight) {
      this.fetchNextAvailablePage();
    }
  }

  isNextPageAvailable() {
    return this.props.list.data.total > this.getItemList().length;
  }

  fetchNextAvailablePage() {
    if (this.isNextPageAvailable()) {
      this.updateStateAndFetch({ offset: this.getItemList().length });
    }
  }

  updateStateAndFetch(inputParams, items) {
    this.setState((currentState, props) => {
      return {
        fetchParams: ItemList.getUpdatedFetchParams(props, _.extend(
          {},
          currentState.fetchParams,
          props.list.data.fetchParams,
        ), inputParams),
        items: items || this.getItemList(),
      };
    }, this.fetchList);
  }

  resetList() {
    this.props.list.data.items = [];
  }

  resetScroll() {
    this.node.scrollTop = 0;
  }

  updateList(inputParams) {
    this.resetList();
    this.resetScroll();
    this.updateStateAndFetch(_.extend({ offset: 0 }, inputParams), []);
  }

  fetchList() {
    if (_.isFunction(this.props.list.config.getHashString)) {
      window.location.hash = this.props.list.config.getHashString(DVUtils.deepClone(this.state.fetchParams));
    }
    this.props.dispatch(this.props.list.config.fetchItems(this.state.fetchParams));
  }

  updateScrollContainer() {
    const availableSpace = String(window.innerHeight - this.node.offsetTop).concat('px');
    this.node.style.height = availableSpace;
    this.node.getElementsByClassName('wrapper')[0].style['min-height'] = availableSpace;
  }

  render() {
    return (
      <div
        className="scrollable item-list"
        onScroll={ this.handleScroll }
        ref={ (node) => { this.node = node; } }
        data-table-body={ this.props.config.listName }
      >
        <div className="wrapper">
          <ul className={ [ 'list', this.props.config.listName ].join(' ') }>
            { this.getListItemTemplate() }
          </ul>
        </div>
      </div>
    );
  }
}

export default ItemList;
