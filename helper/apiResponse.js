exports.successResponse = function (res, msg, data) {
    let resData = {
        success: true,
        message: msg,
        data: data
    }
    return res.status(200).json(resData);
}
//when we success the call
exports.successResponseWithData = function (res, msg, data) {
    let resData = {
        success: true,
        message: msg,
        data: data
    }

    return res.status(200).json(resData);

}
// gettting internal server error when we perform await db operations
exports.errorResponse = function (res, msg, data) {
    let resData = {
        success: false,
        message: msg,
        data: data
    }
    return res.status(500).json(resData);
}
// data not found from data base
exports.notFoundResponse = function (res, msg) {

    let resData = {
        success: false,
        message: msg
    }
    return res.status(404).json(resData);
}
//data validation failed
exports.validationErrorWithData = function (res, msg, data) {
    let resData = {
        success: false,
        message: msg,
        data: data
    }

    return res.status(400).json(resData);
}
//indicating a duplicate key error, it logs the appropriate message.
exports.duplicateDataError = function (res, msg, data){
    let resData = {
        success: false,
        message: msg,
        data: data
    }
    
    return res.status(409).json(resData);
}


//not found token
exports.unAuthorizedResponse = function (res, msg, data) {
    let resData = {
        success: false,
        message: msg,
        data: data
    }
    return res.status(401).json(resData);
}

//When the user is authenticated but does not have permission to perform the requested action.
exports.forbiddenResponse = function (res, msg, data) {
    let resData = {
        success: false,
        message: msg,
        data: data
    }
    return res.status(403).json(resData);
}



//to many request response 429
exports.tooManyRequestResponse = function (res, msg, data) {
    let resData = {
        success: false,
        message: msg,
        data: data
    }
    return res.status(429).json(resData);
}

//Sending a POST request to a route that only supports GET 405

exports.methodNotAllowedResponse = function (res, msg, data) {
    let resData = {
        success: false,
        message: msg,
        data: data
    }
    return res.status(405).json(resData);
}
//used when the server recognizes the request method but doesn't implement it.

exports.notImplementedResponse = function (res, msg, data) {
    let resData = {
        success: false,
        message: msg,
        data: data
    }
    return res.satus(501).json(resData);
}
//erver is temporarily unable to handle the request due to maintenance or overload. ->503
exports.serviceUnavailableResponse = function (res, msg, data) {
    let resData = {
        success: false,
        message: msg,
        data: data
    }
    return res.status(503).json(resData);
}




