
function generateTree(state = {}, action) {
  return {
    users: users(state.todos, action),
    microposts: microposts(state.microposts, action),
    visibilityFilter: visibilityFilter(state.visibilityFilter, action)
  };
}


function users(state = [], action) {
  switch (action.type) {
    case 'ADD_USER':
      return state.concat(
        [{ id: action.index,
          username: action.username,
          password: action.password
        }]
      );
    default: 
      return state;
  }
}


function microposts(state = [], action) {

}
