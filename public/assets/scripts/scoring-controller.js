function scoreCustomerObject(kna1_name1, kna1_stras, kna1_pstlz, knb1_props_knb1_akont, knvk_props_knvk_name1, successCallback, errorCallback) {
    var url = '/v1/scoring/customers';

    var payload = {
        "customers":
        [
            {
                "kna1_name1" : kna1_name1,
                "kna1_stras" : kna1_stras,
                "kna1_pstlz" : kna1_pstlz,
                "knb1_props.knb1_akont":knb1_props_knb1_akont,
                "knvk_props.knvk_name1":knvk_props_knvk_name1
            }
        ]
    };


    // jQuery .post method is used to send post request.
    $.post(url, JSON.stringify(payload), function (data, status) {
        console.log("scoring post status is " + status);
        if (successCallback)
            successCallback(data);

    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log('error in scoring customer data.');
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
        if (errorCallback){
            var errorResponse = $.parseJSON(jqXHR.responseText);
            errorCallback(errorResponse.error);
        }
    });
}