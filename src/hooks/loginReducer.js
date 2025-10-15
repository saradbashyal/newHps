const initialState ={
    user:null,
    token:null,
    error:null,
}

function loginReducer(state,action){
    switch(action.type){
        case "LOGGEDIN":
            return{
                ...initialState
            }
            case "LOGGEDIN_SUCCESS":
                return{
                    ...state,
                    user:action.payload.user,
                    token:action.payload.accessToken
                }
                case "LOGIN_FAILED":
                    return{
                        ...state,
                        error:action.payload
                    }
                
                case "LOGGED_OUT":
                return{
                    ...initialState
                }
                default:
                    return state
    }
}
export default loginReducer