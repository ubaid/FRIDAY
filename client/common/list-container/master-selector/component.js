import React, { Component } from 'react';
import _ from 'underscore';

import './style.less';

class MasterSelector extends Component {
  constructor(props) {
    super(props);

    this.triggerEvent = this.triggerEvent.bind(this);
  }

  triggerEvent(event) {
    if (_.isFunction(this.props.onChange)) {
      this.props.onChange({ index: event.currentTarget.value });
    }
  }

  render() {
    return (
      <div className="material-selector-container">
        <select className="material-selector" onChange={ this.triggerEvent }>
          {
            this.props.config.options.map((option) => {
              return (
                <option
                  className="active"
                  value={ option.value }
                  selected={ this.props.data.selected === option.value }
                >
                  { option.name }
                </option>
              );
            })
          }
        </select>
      </div>
    );
  }
}

export default MasterSelector;
