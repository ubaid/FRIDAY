function login(userName, password, successCallback, errorCallback) {
  const url = '/v1/users/login';

  const postData = { email: userName, password };

  // jQuery .post method is used to send post request.
  $.post(url, postData, (data, status) => {
    console.log(`login post status is ${ status }`);
    if (successCallback) successCallback(data.token);
  }).fail((jqXHR, textStatus, errorThrown) => {
    console.log('error in login.');
    console.log(jqXHR);
    console.log(textStatus);
    console.log(errorThrown);
    if (errorCallback) {
      const errorResponse = $.parseJSON(jqXHR.responseText);
      errorCallback(errorResponse.error);
    }
  });
}
