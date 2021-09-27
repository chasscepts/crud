/* eslint-disable no-bitwise */

export const GET = 'GET';

export const POST = 'POST';

export const PUT = 'PUT';

export const DELETE = 'DELETE';

export const requestMethods = {
  get: GET,
  post: POST,
  put: PUT,
  delete: DELETE,
};

export const copyToClipboard = (text) => new Promise((resolve, reject) => {
  const useExec = () => {
    const textarea = document.createElement('textarea');
    textarea.style = {
      width: '1px',
      height: '1px',
      position: 'fixed',
      left: '-100px',
    };
    textarea.value = text;
    document.body.append(textarea);
    textarea.select();
    const copied = document.execCommand('copy');
    textarea.remove();
    if (copied) {
      resolve('Copied!');
    } else {
      reject(new Error('Failed to copy text!'));
    }
  };

  const write = () => {
    navigator.clipboard.writeText(text)
      .then(() => resolve('Copied!'))
      .catch(() => useExec());
  };

  navigator.permissions.query({ name: 'clipboard-write' })
    .then((result) => {
      if (result.state === 'granted' || result.state === 'prompt') {
        write();
      } else {
        useExec();
      }
    })
    .catch(() => write());
});

export const COLORS = {
  primary: '#62b5e5',
  gray: '#67899c',
  red: '#9e0606',
  success: '#1e6d19',
};

export const hash = (param) => {
  const type = typeof param;
  if (type === 'boolean' || type === 'number' || type === 'undefined') {
    return param;
  }

  if (!param) {
    return param;
  }

  let str = param;
  if (type !== 'string') {
    try {
      str = JSON.stringify(param);
    } catch {
      return undefined;
    }
  }

  let hash = 0;
  if (str.length === 0) {
    return hash;
  }
  for (let i = 0; i < str.length; i += 1) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash &= hash;
  }
  return hash;
};
