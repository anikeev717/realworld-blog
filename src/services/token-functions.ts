export const getToken = () => {
  const matches = document.cookie.match(
    new RegExp(`(?:^|; )${'Token'.replace(/([.$?*|{}()[]\\\/\+^])/g, '\\$1')}=([^;]*)`)
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const setToken = (value: string) => {
  const date = new Date(Date.now() + 86400e3);
  const updatedCookie = `${encodeURIComponent('Token')}=${encodeURIComponent(
    value
  )}; path=/; expires=${date.toUTCString()}; samesite=strict;`;

  document.cookie = updatedCookie;
};

export const deleteToken = () => {
  document.cookie = `Token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
};
