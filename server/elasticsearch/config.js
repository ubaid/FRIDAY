module.exports = {
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
