import React, { Component } from 'react';
import _ from 'underscore';
import DVUtils from 'shared/utils';

import ListEnums from '../enum';

import './style.less';

class ListHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sortBy: props.data.sortBy,
      sortOrder: props.data.sortOrder,
    };
    this.handleSortChange = this.handleSortChange.bind(this);
  }

  handleSortChange(event) {
    const columnName = event.currentTarget.getAttribute('data-sort-by');
    const isAscending = this.state.sortOrder === ListEnums.SortOrderEnum.ASCENDING;

    let { sortOrder } = this.state;
    if (columnName === this.state.sortBy) {
      sortOrder = isAscending ? ListEnums.SortOrderEnum.DESCENDING : ListEnums.SortOrderEnum.ASCENDING;
      this.setState({ sortOrder });
    } else {
      this.setState({ sortBy: columnName });
    }

    if (_.isFunction(this.props.onSortChange)) {
      this.props.onSortChange({
        sortBy: sortOrder === ListEnums.SortOrderEnum.ASCENDING
          ? columnName
          : DVUtils.HYPHEN.concat(columnName),
      });
    }
  }

  render() {
    const config = this.props.config || {};

    return (
      <div className="sortable-header" data-table-header={ config.listName } >
        <ul className="list">
          <li className="header">
            <div className={ [ 'row fixed header-list', config.listName.concat('-list-row') ].join(DVUtils.SPACE) }>
              {
                config.activeColumns.map((columnName) => {
                  const column = config.columns[columnName];
                  const isSortable = config.sortableColumns.indexOf(column.value) !== -1;
                  const isActive = isSortable && this.state.sortBy === column.value;
                  let sortIcon = DVUtils.EMPTY_STRING;

                  if (isActive) {
                    sortIcon = this.state.sortOrder === ListEnums.SortOrderEnum.ASCENDING
                      ? <img className="icon" src="images/asc.png" title="Ascending" alt="Ascending" />
                      : <img className="icon" src="images/desc.png" title="Descending" alt="Descending" />;
                  }

                  return (
                    <div
                      key={ column.value }
                      role="presentation"
                      onClick={ isSortable ? this.handleSortChange : () => {} }
                      data-sort-by={ columnName }
                      className={ [
                        'column cell',
                        column.value.replace(DVUtils.PERIOD, DVUtils.HYPHEN),
                        isSortable ? 'sortable-column' : DVUtils.EMPTY_STRING,
                        isActive ? 'active-column' : DVUtils.EMPTY_STRING,
                      ].join(DVUtils.SPACE) }
                    >
                      <span className="column-label">{ column.label }</span>
                      { sortIcon }
                    </div>
                  );
                })
              }
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

export default ListHeader;
