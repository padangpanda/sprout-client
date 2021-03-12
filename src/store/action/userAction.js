export const login = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'user/login',
        payload: true
      })
      console.log('masuk action');
    } catch (err) {
      console.log(err);
    }
  }
}

export const logout = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'user/logout'
      })
    } catch (err) {
      console.log(err);
    }
  }
}