export const getToken = () => {
  const matches = document.cookie.match(
    new RegExp(`(?:^|; )${'Token'.replace(/([.$?*|{}()[]\\\/\+^])/g, '\\$1')}=([^;]*)`)
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const setToken = (value: string) => {
  const date = new Date(Date.now() + 86400e3);
  const updatedCookie = `${encodeURIComponent('Token')}=${encodeURIComponent(value)}; expires=${date.toUTCString()}`;

  document.cookie = updatedCookie;
};

export const deleteToken = () => {
  document.cookie = `Token=;max-age=-1`;
};
