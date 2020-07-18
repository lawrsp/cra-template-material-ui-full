import React from 'react';
import { useDispatch } from 'react-redux';
import { useLatestFunc } from './useUtils';

export function useParam(request, onParams) {
  const handleOnParams = useLatestFunc(onParams);

  return React.useCallback(
    async (params) => {
      const theParams = handleOnParams(params);
      const result = await request(theParams);
      return result;
    },
    [request, handleOnParams]
  );
}

export function useResult(fetcher, setResult) {
  return React.useCallback(
    async (params) => {
      const result = await fetcher(params);
      setResult(result);
      return result;
    },
    [fetcher, setResult]
  );
}

export function useThunk(thunk, onParams) {
  const dispatch = useDispatch();

  const handleOnParams = useLatestFunc(onParams);

  return React.useCallback(
    async (params) => {
      const theParams = handleOnParams(params);
      const action = await dispatch(thunk(theParams));
      // '@reduxjs/toolkit' set error object to action.error
      if (action.error) {
        throw action.error;
      }
      return action.payload;
    },
    [dispatch, thunk, handleOnParams]
  );
}

export default function useFetcher(fetcher, { onSuccess, onError } = {}) {
  const [err, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const handleOnSuccess = useLatestFunc(onSuccess);
  const handleOnError = useLatestFunc(onError);
  const hasErrorHandler = !!onError;

  const request = React.useCallback(
    async (params) => {
      setError(null);
      setLoading(true);
      try {
        const result = await fetcher(params);
        handleOnSuccess(result);
        return true;
      } catch (err) {
        // console.log('api error:', err);
        setError(err);
        if (hasErrorHandler) {
          handleOnError(err);
          return false;
        }
        // 如果没有处理error，则在这里throw
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [fetcher, handleOnSuccess, handleOnError, hasErrorHandler]
  );

  return { err, loading, request };
}
