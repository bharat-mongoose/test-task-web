import {
    GET_REPOSITORY_DATA,
    SET_REPOSITORY_DATA
} from "../action/actionContant";

const initialState = {
    repositoryData: [],
    page: 1,
    date: ''
};
const AllRepository = (state = initialState, action = {}) => {
    switch (action.type) {
        case SET_REPOSITORY_DATA:
            return {
                ...state,
                page: action.payload.page,
                date: action.payload.date
            };
        case GET_REPOSITORY_DATA:
            return {
                ...state,
                repositoryData: action.payload.data
            };
        default:
            return state;
    }
};

export default AllRepository;
