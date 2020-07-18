import 'whatwg-fetch';

const statusMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

// console.log('===', window.location);
const { host } = window.location;
const API_BASE_URL =
  process.env.NODE_ENV === 'development'
    ? `${window.location.protocol}//${host}`
    : `https://${host}`;

// APIError:
// { name, status, code, message, fields }
//
class APIError extends Error {
  constructor(response, data = {}) {
    super();
    const { status, statusText } = response;
    this.name = 'APIError';
    console.log('===', response);

    if (!status) {
      this.message = '网络错误';
    } else if (data.code === undefined) {
      const errText = statusMessage[status] || statusText;
      this.message = `服务不可用:${errText}`;
    } else {
      this.code = data.code;
      this.message = data.message || `服务错误:${status}`;
      if (data.fields) {
        this.fields = data.fields;
      }
    }
    this.status = status;
    // this.stack = (new Error()).stack;
  }
}

const TOKEN_STORAGE_KEY = 'token';
export const saveToken = (token) => {
  return localStorage.setItem(TOKEN_STORAGE_KEY, `Bearer ${token}`);
};
export const getToken = () => {
  return localStorage.getItem(TOKEN_STORAGE_KEY);
};
export const removeToken = () => {
  return localStorage.removeItem(TOKEN_STORAGE_KEY);
};

const parseAPIResult = async (response) => {
  // console.log("====response is", response);
  const { status } = response;
  if (status === 0) {
    const err = new APIError(response);
    throw err;
  }

  const data = await response.json();
  // console.log('=== fetch result:', response, result);
  if (status.status < 200 || status >= 400) {
    const err = new APIError(response, data);
    throw err;
  }

  return data;
};

// TODO: token

const apiFetch = async (path, data = {}) => {
  console.log('=== start fetch:', path);
  const { method = 'GET', params = {}, body } = data;
  const url = new URL(path, API_BASE_URL);
  Object.keys(params).forEach((key) => {
    const val = params[key];
    if (Array.isArray(val)) {
      val.forEach((v) => url.searchParams.append(key, v));
      return;
    }

    url.searchParams.append(key, val);
  });

  const token = getToken();

  console.log('=== (method, url, params, body):', method, url.toString(), params, body);

  try {
    const response = await window.fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: token,
      },
      body: JSON.stringify(body),
    });

    const result = await parseAPIResult(response);
    // console.log('=== fetch succeed:', result);
    return result;
  } catch (err) {
    console.log('=== fetch error:', err);
    // TODO: 错误提示？
    if (err instanceof APIError) {
      throw err;
    }

    throw err;
  }
};

export default apiFetch;
