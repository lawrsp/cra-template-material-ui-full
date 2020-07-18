import React from 'react';

const identity = (x) => x;

export const useLatest = (obj) => {
  const ref = React.useRef();
  ref.current = obj;

  return React.useCallback(() => ref.current, []);
};

export const useLatestFunc = (fn = identity) => {
  const ref = React.useRef();
  ref.current = fn;

  return React.useCallback((...params) => {
    if (typeof ref.current === 'function') {
      return ref.current(...params);
    }
  }, []);
};
