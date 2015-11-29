class HTTP
  @post: (url, params, callback, errback) ->

    success = (data) ->
      callback data

    error = (fail_message) ->
      fail_message = JSON.parse fail_message.response
      errback fail_message.error

    data =
      tx: params.tx

    ajax =
      contentType: 'application/json',
      data: JSON.stringify(data),
      dataType: 'json',
      processData: false,
      type: 'POST',
      success: success,
      error: error,
      url: url

    $.ajax ajax
