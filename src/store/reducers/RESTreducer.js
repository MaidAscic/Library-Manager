const initalState = {
  bookItems: null,
  userItems: null,
  isNew: false,
};

const RESTreducer = (state = initalState, action) => {
  switch (action.type) {
    case "FETCH_BOOKS": {
      return {
        ...state,
        bookItems: action.data,
      };
    }
    case "FETCH_USERS": {
      return {
        ...state,
        userItems: action.data,
      };
    }
   
    case "REMOVE_ID": {
      return {
        ...state,
        isNew: false,
      };
    }
    case "NEW_ITEM": {
      return {
        ...state,
        isNew: true,
      };
    }
    default: {
      return state;
    }
  }
};

export default RESTreducer;
