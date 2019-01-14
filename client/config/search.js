module.exports = {
  masterSelector: {
    data: {},
    config: {
      options: [ {
        name: 'Material',
        value: 'material',
      }, {
        name: 'Customer',
        value: 'customer',
      } ],
    },
  },
  searcher: {},
  header: {
    config: {
      listName: 'items',
      columns: {
        name: { id: 'name', label: 'Topic Name', value: 'name' },
        modifiedDate: { id: 'modifiedDate', label: 'Modified', value: 'modifiedDate' },
        mara_matnr: { id: 'mara_matnr', label: 'Material Number', value: 'mara_matnr' },
        mara_mtart: { id: 'mara_mtart', label: 'Material Type', value: 'mara_mtart' },
        'makt_props.makt_maktx': { id: 'makt_props.makt_maktx', label: 'Description', value: 'makt_props.makt_maktx' },
        mara_ernam: { id: 'mara_ernam', label: 'Created By', value: 'mara_ernam' },

        kna1_kunnr: { id: 'kna1_kunnr', label: 'Customer name', value: 'kna1_kunnr' },
        kna1_land1: { id: 'kna1_land1', label: 'Country Key', value: 'kna1_land1' },
        kna1_name1: { id: 'kna1_name1', label: 'Name 1', value: 'kna1_name1' },
        kna1_name2: { id: 'kna1_name2', label: 'Name 2', value: 'kna1_name2' },
        kna1_ort01: { id: 'kna1_ort01', label: 'City', value: 'kna1_ort01' },
        kna1_pstlz: { id: 'kna1_pstlz', label: 'Postal Code', value: 'kna1_pstlz' },
        kna1_stras: { id: 'kna1_stras', label: 'House Number And Street', value: 'kna1_stras' },
        'knvk_props.knvk_namev': {
          id: 'knvk_props.knvk_namev',
          label: 'KNB1 Properties',
          value: 'knvk_props.knvk_namev',
        },
        'knb1_props.knb1_bukrs': {
          id: 'knb1_props.knb1_bukrs',
          label: 'KNVK Properties',
          value: 'knb1_props.knb1_bukrs',
        },

        score: { id: 'score', label: 'Score', value: 'score' },
        match: { id: 'match', label: 'Relative Score', value: 'match' },
      },
      activeColumns: [],
      sortableColumns: [],
    },
    data: {
      sortBy: 'score',
      sortOrder: 'DESCENDING',
    },
  },
  actionBar: {
    config: {
      actions: [ {
        name: 'Download Results',
        event: 'download',
        src: 'images/download.jpg',
      } ],
    },
  },
  list: {
    data: {
      fetching: false,
      total: 0,
      items: [],
      fetchParams: { index: 'material', min_score: 0.5 },
    },
  },
  fieldsConfig: {
    material: {
      key: 'mara_matnr',
      fields: [
        'mara_matnr',
        'mara_mtart',
        'makt_props.makt_maktx',
        'mara_ernam',
        'score',
        'match',
      ],
    },
    customer: {
      key: 'customer_id',
      fields: [
        'kna1_kunnr',
        'kna1_land1',
        'kna1_name1',
        'kna1_name2',
        'kna1_ort01',
        'kna1_pstlz',
        'kna1_stras',
        'knvk_props.knvk_namev',
        'knb1_props.knb1_bukrs',
        'score',
        'match',
      ],
    },
  },
};
