import { notification } from "antd";

import codeMessage from "./codeMessage";

const successHandler = (response, typeNotification = {}) => {
  if (!response) {
    response = {
      ...response,
      status: 404,
      url: null,
      data: {
        success: false,
        result: null,
      },
    };
  }
  // const { data } = response;
  if (response.status === false) {
    const message = data && data.message;
    const errorText = message || codeMessage[response.status];
    const { status } = response;
    notification.config({
      duration: 20,
    });
    notification.error({
      message: `Request error ${status}`,
      description: errorText,
    });
  } else {
    const message = response && response.message;
    const successText = message || codeMessage[response.status];
    const { status } = response;
    // notification.config({
    //   duration: 20,
    // });
    // notification.success({
    //   message: `Request success`,
    //   description: successText,
    // });
  }

  return response;
};

export default successHandler;
