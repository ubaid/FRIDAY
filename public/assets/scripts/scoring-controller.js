// eslint-disable-next-line no-unused-vars
function scoreCustomerObject(kna1Name1, kna1Stras, kna1Pstlz, knb1PropsKnb1Akont,
  knvkPropsKnvkName1, successCallback, errorCallback) {
  const url = '/v1/scoring/customers';

  const payload = {
    customers: [ {
      kna1_name1: kna1Name1,
      kna1_stras: kna1Stras,
      kna1_pstlz: kna1Pstlz,
      'knb1_props.knb1_akont': knb1PropsKnb1Akont,
      'knvk_props.knvk_name1': knvkPropsKnvkName1,
    } ],
  };

  // jQuery .post method is used to send post request.
  // eslint-disable-next-line no-undef
  $.post(url, JSON.stringify(payload), (data, status) => {
    // eslint-disable-next-line no-console
    console.log(`scoring post status is ${ status }`);
    if (successCallback) successCallback(data);
  }).fail((jqXHR, textStatus, errorThrown) => {
    // eslint-disable-next-line no-console
    console.log('error in scoring customer data.', jqXHR, textStatus, errorThrown);
    if (errorCallback) {
      // eslint-disable-next-line no-undef
      const errorResponse = $.parseJSON(jqXHR.responseText);
      errorCallback(errorResponse.error);
    }
  });
}
