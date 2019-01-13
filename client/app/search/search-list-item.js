import React, { Component } from 'react';
import _ from 'underscore';

import DVUtils from 'shared/utils';
import Logger from 'lib/logger';
import searchConfig from 'config/search';


class SearchListItem extends Component {
  static getFieldValueList(itemJson, fieldName) {
    if (fieldName.indexOf(DVUtils.PERIOD) === -1) {
      return [ itemJson[fieldName] ];
    }

    const parts = fieldName.split(DVUtils.PERIOD);
    const propsArray = itemJson[parts[0]];
    const fieldValues = [];
    _.each(propsArray, (props) => {
      fieldValues.push(props[parts[1]]);
    });

    return fieldValues;
  }

  static getFieldValues(itemJson, fieldName) {
    if (fieldName === 'knb1_props.knb1_bukrs') {
      const values = [];
      _.each(itemJson.knb1_props, (prop) => {
        values.push(`Reconciliation Account in General Ledger : ${
          prop.knb1_akont
        }, Company Code : ${
          prop.knb1_bukrs
        },  Terms of Payment Key : ${
          prop.knb1_zterm
        }`);
      });

      return values;
    }

    if (fieldName === 'knvk_props.knvk_namev') {
      const values = [];
      _.each(itemJson.knvk_props, (prop) => {
        values.push(`Customer Name: ${
          prop.knvk_kunnr
        }, First Name: ${
          prop.knvk_namev
        }, Last Name: ${
          prop.knvk_name1
        }`);
      });

      return values;
    }

    return SearchListItem.getFieldValueList(itemJson, fieldName);
  }

  getBucket() {
    const bucket = Math.round(Math.log2((parseFloat(this.props.maxScore) + this.props.min_score) / this.props.score));
    Logger.info(`Score: ${ this.props.score } Bucket ${ bucket }`);
    return 'bucket_'.concat(bucket);
  }

  render() {
    const fieldsConfig = searchConfig.fieldsConfig[this.props.index] || {};

    return (
      <div className={ [ 'row fixed list-row', this.getBucket() ].join(DVUtils.SPACE) }>
        {
          fieldsConfig.fields.map((field) => {
            return (
              <div className={ [ 'cell middle', field.replace(DVUtils.PERIOD, DVUtils.HYPHEN) ].join(DVUtils.SPACE) }>
                {
                  SearchListItem.getFieldValues(this.props, field).map((value) => {
                    return (
                      <span>
                        { value }
                        <br />
                      </span>
                    );
                  })
                }
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default SearchListItem;
