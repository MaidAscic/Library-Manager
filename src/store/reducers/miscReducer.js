const initalState = {
    userId : null,
    bookId:null,
    type : null,
    newItemImage:null,

}

const miscReducer = (state = initalState, action)=>{


    switch (action.type){
        case "SELECT_USER_ID":{
            return {
                ...state,
                userId: action.value
            };
        }
        case "REMOVE_USER_ID":{
            return {
                ...state,
                userId: null,
            };
        }
        case "SELECT_BOOK_ID":{
            return {
                ...state,
                bookId: action.value
            };
        }
        case "REMOVE_BOOK_ID":{
            return {
                ...state,
                bookId: null,
            };
        }
        case "REMOVE_ID":{
            return {
                ...state,
                bookId: null,
                userId: null,
            };
        }
        case "SET_IMAGE":{
            return{
                ...state,
                newItemImage: action.image,
            }
        }
        default:
            return state;
    }
}

export default miscReducer;