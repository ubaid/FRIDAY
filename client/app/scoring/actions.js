import _ from 'underscore';
import cookie from 'cookie';
import DVUtils from 'shared/utils';

export const CUST_SCORING_REQ = 'Scoring.CUST_SCORING_REQ';
export const CUST_SCORING_RESULT = 'Scoring.CUST_SCORING_RESULT';
export const CUST_SCORING_ERR = 'Scoring.CUST_SCORING_ERR';

export const getCustomerScore = (inputOptions) => {
  const customerJson = inputOptions || {};
  const cookiesMap = cookie.parse(document.cookie);

  if (_.isEmpty(customerJson.name)
      || _.isEmpty(customerJson.address)
      || _.isEmpty(customerJson.postalCode)
      || _.isEmpty(customerJson.accountNumber)
      || _.isEmpty(customerJson.contactName)) {
    throw new Error('Invalid options for scoring API.');
  }

  return {
    method: 'POST',
    type: CUST_SCORING_REQ,
    url: '/v1/scoring/customers',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: cookiesMap[DVUtils.FRIDAY_AUTH_TOKEN_KEY],
    },
    data: {
      customers: [ {
        kna1_name1: customerJson.name,
        kna1_stras: customerJson.address,
        kna1_pstlz: customerJson.postalCode,
        'knb1_props.knb1_akont': customerJson.accountNumber,
        'knvk_props.knvk_name1': customerJson.contactName,
      } ],
    },
  };
};
