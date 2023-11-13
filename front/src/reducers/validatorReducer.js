export const emailValidateReducer = (emailState, action) => {
  switch (action.type) {
    case "EMAIL_VALIDATOR":
      return {
        value: action.value,
        isEmailValid: action.value
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ),
      };

    case "INPUT_BLUR":
      return {
        value: emailState.value,
        isEmailValid: emailState.value
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ),
      };

    default:
      return { value: "", isEmailValid: false };
  }
};

export const paswordValidateReducer = (passwordState, action) => {
  switch (action.type) {
    case "PASSWORD_VALIDATOR":
      return {
        value: action.value,
        isPasswordValid: action.value.trim().length >= 5,
      };
    case "INPUT_BLUR":
      return {
        value: passwordState.value,
        isPasswordValid: passwordState.value.trim().length >= 5,
      };

    default:
      return { value: "", isPasswordValid: false };
  }
};
