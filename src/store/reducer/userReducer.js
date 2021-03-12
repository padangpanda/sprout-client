const initialState = {
  isLogin: false
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'user/login':
      console.log(action);
      return { ...state, isLogin: action.payload }
    case 'user/logout':
      return { ...state, isLogin: false }
    default:
      return state
  }
}