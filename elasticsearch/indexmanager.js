const _ = require('underscore');

const IndexManager = {
  INDEXES: [ {
    name: 'material',
    index: 'test',
    fields: [ {
      name: 'mara_matnr',
      label: 'Material Number',
    }, {
      name: 'mara_mtart',
      label: 'Material Type',
    }, {
      name: 'maktMaktx',
      label: 'Description',
    }, {
      name: 'mara_matkl',
      label: 'Material Group',
    }, {
      name: 'mara_vhart',
      label: 'Packaging Material Type',
    }, {
      name: 'mara_ersda',
      label: 'Created At',
    }, {
      name: 'mara_ernam',
      label: 'Created By',
    }, {
      name: 'mara_pstat',
      label: 'Maintenance status',
    }, {
      name: 'mara_mbrsh',
      label: 'Industry Sector',
    }, {
      name: 'mara_meins',
      label: 'Base Unit of Measure',
    }, {
      name: 'mara_prdha',
      label: 'Product hierarchy',
    } ],
  }, {
    name: 'customer',
    index: 'customer',
    fields: [ {
      name: 'kna1_kunnr',
      label: 'Name',
    }, {
      name: 'kna1_land1',
      label: 'Country key',
    }, {
      name: 'kna1_name1',
      label: 'Name 1',
    }, {
      name: 'kna1_name2',
      label: 'Name 2',
    }, {
      name: 'kna1_ort01',
      label: 'City',
    }, {
      name: 'kna1_pstlz',
      label: 'Postal Code',
    }, {
      name: 'kna1_stras',
      label: 'House Number And Street',
    }, {
      name: 'knb1_props',
      label: 'KNB1 Properties',
    }, {
      name: 'knvk_props',
      label: 'KNVK Properties',
    } ],
  } ],

  getIndexConfig: (index) => {
    return _.find(IndexManager.INDEXES, indexConfig => indexConfig.name === index);
  },
};

module.exports = IndexManager;
