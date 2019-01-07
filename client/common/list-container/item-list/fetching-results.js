import React from 'react';
import DVUtils from 'shared/utils';

const FetchingResults = props => (
  <div className="no-items">
    <h2 className="no-content-message">
      { `Fetching ${ DVUtils.capitalizeFirstLetter(props.config.listName || 'items') }...` }
    </h2>
  </div>
);

export default FetchingResults;
