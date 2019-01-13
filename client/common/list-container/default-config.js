export default {
  config: {
    listName: 'items',
  },
  masterSelector: {
    data: {},
    config: {
      options: [],
    },
  },
  searcher: {
    data: {
      match: false,
    },
    config: {
      timeout: 300,
      searchBy: 'search',
      placeholder: 'Search Item',
    },
  },
  header: {
    config: {
      listName: 'items',
      columns: {},
      activeColumns: [],
      sortableColumns: [],
    },
    data: {
      sortBy: '',
      sortOrder: 'DESCENDING',
    },
  },
  actionBar: {
    data: {},
    config: {
      actions: [],
    },
  },
  list: {
    config: {
      key: 'id',
      listName: 'items',
      fetchParams: {
        offset: 0,
        limit: 20,
        sortBy: '',
      },
    },
    data: {
      fetchParams: {},
    },
  },
};
