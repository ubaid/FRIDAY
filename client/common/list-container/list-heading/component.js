import React, { Component } from 'react';
import DVUtils from 'shared/utils';

import './style.less';

class ListHeading extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: props.data.items.length,
      total: props.data.total,
      listName: props.config.listName,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      count: nextProps.data.items.length,
      total: nextProps.data.total,
    });
  }

  render() {
    return (
      <div className="list-heading">
        <div className="list-header">
          {
            [
              this.state.count,
              'of',
              this.state.total,
              DVUtils.capitalizeFirstLetter(this.state.listName),
            ].join(DVUtils.SPACE)
          }
        </div>
      </div>
    );
  }
}

export default ListHeading;
