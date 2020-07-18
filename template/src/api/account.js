import apiFetch, { saveToken, removeToken } from 'utils/apiFetch';

const saveLoginResult = (result) => {
  const { access_token } = result;
  saveToken(access_token);
};

export const accountLogin = async (body) => {
  const result = await apiFetch('/api/login', {
    method: 'POST',
    body,
  });

  saveLoginResult(result);
  return result;
};

export const accountRefresh = async (body) => {
  const result = await apiFetch('/api/login/refresh', {
    method: 'POST',
    body,
  });
  saveLoginResult(result);

  return result;
};

export const accountLogout = async (body = {}) => {
  try {
    const result = await apiFetch('/api/logout', {
      method: 'POST',
      body,
    });
    return result;
  } catch (err) {
    return false;
  } finally {
    removeToken();
  }
};
