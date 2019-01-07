export const SEARCH_REQ = 'Search.SEARCH_REQ';
export const SEARCH_RESULT = 'Search.SEARCH_RESULT';
export const SEARCH_ERR = 'Search.SEARCH_ERR';

export const searchItems = (params) => {
  return {
    method: 'POST',
    url: '/v1/search',
    type: SEARCH_REQ,
    data: params,
  };
};
