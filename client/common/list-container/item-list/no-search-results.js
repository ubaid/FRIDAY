import React from 'react';

const NoSearchResults = props => (
  <div className="no-search-results">
    <div>No results found</div>
    <div>
      <div className="suggestions">Suggestions:</div>
      <ul className="check-your-spelling">
        <li>Verify the master database selection.</li>
        <li>Try a different search term.</li>
      </ul>
    </div>
    <button type="button" className="clear-all" onClick={ props.list.config.onClearAll }>Clear All</button>
  </div>
);

export default NoSearchResults;
