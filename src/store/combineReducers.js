export default function combineReducers(reducers) {
  const keys = Object.keys(reducers);

  return function(state = Map(), action) {
    return keys.reduce(function(state, key) {
      return state.update(key, function(slice) {
        return reducers[key](slice, action);
      });
    }, state);
  };
}