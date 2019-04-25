import * as types from  './constants'

 function cameraReducer(state = [], action) {
  switch (action.type) {
    case types.CAMERA_LIST_REQUEST:
      return [...state, action.payload];
      case types.ISLOADING:
      return [...state, action.payload];  
    default:
      return state;
  }
}




export function exampleReducer(state = {
	isLoading: false,
	data: [],
	error: false}
, action = null) {
	switch(action.type) {
		case types.RECV_ERROR:
			return Object.assign({}, state, {isLoading: false, data: action.data, error: true});
		case types.RECV_DATA:
			return Object.assign({}, state, {isLoading: false, data: action.data, error: false });
		case types.REQ_DATA:
			return Object.assign({}, state, {isLoading: true, error: false,tInfo:'测试' });
		default:
			return state;
	}
};