import React from 'react';
import DVUtils from 'shared/utils';

const EmptyItemList = props => (
  <div className="no-items">
    <h2 className="no-content-message">
      {
        [
          'You don\'t have any',
          props.config.listName || 'items',
          'yet.',
        ].join(DVUtils.SPACE)
      }
    </h2>
    <div className="click-below-text">Please contact administrator to make sure data has been uploaded.</div>
  </div>
);

export default EmptyItemList;
