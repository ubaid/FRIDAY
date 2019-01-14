import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';

import DVUtils from 'shared/utils';
import searchConfig from 'config/search';
import ListComponent from 'common/list-container/component';
import ListEnums from 'common/list-container/enum';
import Logger from 'lib/logger';

import DownloadResults from './download-results';
import SearchListItem from './search-list-item';
import { searchItems } from './actions';

import './style.less';

const defaultListConfig = ListComponent.populateDefaultProps(searchConfig);

class SearchContainer extends Component {
  static getValidParams() {
    return [ 'search', 'index', 'exact', 'maxScore' ];
  }

  static getDefaultFetchParams() {
    const fetchParams = _.extend({}, searchConfig.list.data.fetchParams);
    _.each(SearchContainer.getValidParams(), (param) => {
      fetchParams[param] = fetchParams[param] || DVUtils.EMPTY_STRING;
    });

    return fetchParams;
  }

  static getHashString(fetchParams) {
    const validParams = _.pick(fetchParams || {}, SearchContainer.getValidParams());
    const hashValueArray = [];

    _.map(validParams, (value, param) => {
      hashValueArray.push(param.concat(DVUtils.EQUAL_TO).concat(value));
    });

    return hashValueArray.join(DVUtils.AMPERSAND);
  }

  static getFetchParamsFromHash() {
    return _.extend(SearchContainer.getDefaultFetchParams(), _.object(DVUtils.getStringFromHash()
      .split(DVUtils.AMPERSAND)
      .map(s => s.split(DVUtils.EQUAL_TO))));
  }

  static hasFilters(fetchParams) {
    const params = fetchParams || {};
    return !_.isEmpty(params.search);
  }

  static getListItemTemplate(itemJson, params) {
    const itemProps = _.extend({}, itemJson, params);
    return <SearchListItem { ...itemProps } />;
  }

  constructor(props) {
    super(props);

    this.onActionClick = this.onActionClick.bind(this);
    this.updateList = this.updateList.bind(this);
  }

  onActionClick(action) {
    switch (action) {
      case ListEnums.ACTIONS.DOWNLOAD:
        this.downloadDialog.showDialog(_.extend({
          count: this.props.total || 20,
        }, this.searchList.getWrappedInstance().getFetchParams()));
        break;

      default:
    }
  }

  getListComponentProps() {
    const searchListConfig = DVUtils.deepClone(defaultListConfig);
    const fetchParams = SearchContainer.getFetchParamsFromHash();

    searchListConfig.searcher.data.value = fetchParams.search;
    searchListConfig.searcher.data.exact = fetchParams.exact === 'true';

    searchListConfig.actionBar.config.onActionClick = this.onActionClick;
    searchListConfig.actionBar.config.actions[0].disabled = this.props.total === 0;

    searchListConfig.masterSelector.data.selected = fetchParams.index;
    searchListConfig.list.config = {
      ...searchListConfig.list.config,
      getListItemTemplate: SearchContainer.getListItemTemplate,
      fetchItems: searchItems,
      getHashString: SearchContainer.getHashString,
      hasFilters: SearchContainer.hasFilters,
    };
    searchListConfig.list.data.total = this.props.total || 0;
    searchListConfig.list.data.items = this.props.items || [];
    searchListConfig.list.data.fetching = _.isBoolean(this.props.fetching) ? this.props.fetching : false;

    Logger.info(`Setting max score to ${ this.props.maxScore }`);
    fetchParams.maxScore = this.props.maxScore;
    searchListConfig.list.data.fetchParams = fetchParams;

    const fieldsConfig = searchConfig.fieldsConfig[fetchParams.index];
    searchListConfig.header.config.activeColumns = fieldsConfig.fields;
    searchListConfig.list.config.key = fieldsConfig.key;

    return searchListConfig;
  }

  updateList() {
    this.searchList.getWrappedInstance().updateList();
  }

  render() {
    const listComponentProps = this.getListComponentProps();
    const downloadResultProps = { visible: false, count: _.size(listComponentProps.list.data.items) };

    return (
      <div className="search-list-container">
        <DownloadResults
          ref={ (node) => { this.downloadDialog = node; } }
          { ...downloadResultProps }
        />
        <ListComponent ref={ (node) => { this.searchList = node; } } { ...listComponentProps } />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  maxScore: state.searchReducer.maxScore,
  total: state.searchReducer.total,
  fetching: state.searchReducer.fetching,
  items: state.searchReducer.items,
  errorMessage: state.searchReducer.errorMessage,
});

export default connect(mapStateToProps)(SearchContainer);
