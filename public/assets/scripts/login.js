function login(userName, password, successCallback, errorCallback) {
    var url = '/v1/users/login';

    var postData = { email: userName, password: password };

    // jQuery .post method is used to send post request.
    $.post(url, postData, function (data, status) {
        console.log("login post status is " + status);
        if (successCallback)
            successCallback(data.token);

    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log('error in login.');
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
        if (errorCallback){
            var errorResponse = $.parseJSON(jqXHR.responseText);
            errorCallback(errorResponse.error);
        }
    });
}