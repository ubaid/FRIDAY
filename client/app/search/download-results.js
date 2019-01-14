import React, { Component } from 'react';
import _ from 'underscore';
import buildUrl from 'build-url';
import DVUtils from 'shared/utils';
import SearchUtils from 'shared/search-utils';

class DownloadResults extends Component {
  constructor(props) {
    super(props);

    this.state = _.extend({
      count: 20,
      downloadParams: {},
      name: SearchUtils.getFileName(props.index),
      visible: false,
    }, props);

    this.closeDialog = this.closeDialog.bind(this);
    this.handleInputPropertyChange = this.handleInputPropertyChange.bind(this);
  }

  getDownloadUrl() {
    return buildUrl(DVUtils.EMPTY_STRING, {
      path: '/v1/download',
      queryParams: _.extend({}, this.state.downloadParams, {
        name: this.state.name,
        limit: this.state.count,
      }),
    });
  }

  handleInputPropertyChange(name, event) {
    const options = {};
    options[name] = event.currentTarget.value;
    this.setState(options);
  }

  showDialog(downloadParams) {
    this.setState({
      downloadParams,
      count: downloadParams.count,
      name: SearchUtils.getFileName(downloadParams.index),
      visible: true,
    });
  }

  closeDialog() {
    this.setState({ visible: false });
  }

  render() {
    const classesToAdd = 'download-container'.concat(this.state.visible ? ' visible' : DVUtils.EMPTY_STRING);

    return (
      <div className={ classesToAdd }>
        <div className="overlay" />
        <div className="content light-border">
          <h2>Export Results to CSV</h2>
          <div className="row">
            <label className="label">File Name</label>
            <input
              className="light-border filename"
              title="Enter filename"
              onChange={ this.handleInputPropertyChange.bind(this, 'name') }
              placeholder="Enter filename"
              value={ this.state.name }
            />
          </div>
          <div className="row">
            <label className="label">No of records</label>
            <input
              className="light-border count"
              onChange={ this.handleInputPropertyChange.bind(this, 'count') }
              placeholder="Enter records count"
              value={ this.state.count }
            />
          </div>
          <div className="action-buttons">
            <button type="button" className="cancel light-border" onClick={ this.closeDialog } >Cancel</button>
            <button type="button" className="download light-border primary">
              <a href={ this.getDownloadUrl() }>Download</a>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default DownloadResults;
