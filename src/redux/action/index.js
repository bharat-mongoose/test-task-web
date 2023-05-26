import * as types from './actionContant';

export const setRepositoryData = (payload) => ({
    type: types.SET_REPOSITORY_DATA,
    payload
  });

   export const setIsLoading = (payload) => ({
    type: types.SET_IS_LOADING,
    payload
});