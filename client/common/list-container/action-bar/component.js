import React, { Component } from 'react';
import _ from 'underscore';

import './style.less';

class ActionBar extends Component {
  constructor(props) {
    super(props);

    this.triggerAction = this.triggerAction.bind(this);
  }

  triggerAction(eventName) {
    if (_.isFunction(this.props.config.onActionClick)) {
      this.props.config.onActionClick(eventName);
    }
  }

  render() {
    const actions = _.isArray(this.props.config.actions) ? this.props.config.actions : [];

    return (
      <div className="action-bar">
        {
          actions.map((action) => {
            return (
              <button
                type="button"
                className={ action.event }
                disabled={ action.disabled }
                title={ action.name }
                onClick={ this.triggerAction.bind(this, action.event) }
              >
                <img className="icon light-border" src={ action.src } alt={ action.name } />
              </button>
            );
          })
        }
      </div>
    );
  }
}

export default ActionBar;
