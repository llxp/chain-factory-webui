export default function thunkTemplate(callback, default_value) {
  return (dispatch, getState) => {
    if (getState().signin.loggedIn) {
      const token = getState().signin.token;
      return callback(token);
    }
    return default_value;
  }
}