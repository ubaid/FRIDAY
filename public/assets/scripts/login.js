// eslint-disable-next-line no-unused-vars
function login(userName, password, successCallback, errorCallback) {
  const url = '/v1/users/login';
  const postData = { email: userName, password };

  // jQuery .post method is used to send post request.
  // eslint-disable-next-line no-undef
  $.post(url, postData, (data, status) => {
    // eslint-disable-next-line no-console
    console.log(`login post status is ${ status }`);
    if (successCallback) successCallback(data.token);
  }).fail((jqXHR, textStatus, errorThrown) => {
    // eslint-disable-next-line no-console
    console.log('error in login.', jqXHR, textStatus, errorThrown);
    if (errorCallback) {
      // eslint-disable-next-line no-undef
      const errorResponse = $.parseJSON(jqXHR.responseText);
      errorCallback(errorResponse.error);
    }
  });
}
