const setUserData = "setUser";

export const setUser = (data) => ({
  type: setUserData,
  data: data,
});

const initState = {
  currentUser: [],
};
export default function weatherReducer(state = initState, action) {
  switch (action.type) {
    case setUserData: {
      state.currentUser[0] = action.data;
    }

    default:
      return state;
  }
}
