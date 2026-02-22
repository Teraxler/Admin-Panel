const getCookie = (key) => {
  let cookieMap = {};

  const cookies = document.cookie.split(";");

  cookies.forEach((cookie) => {
    const splitedCookie = cookie.split("=");
    cookieMap = { ...cookieMap, [splitedCookie[0]]: splitedCookie[1] };
  });

  return cookieMap[key];
};

export { getCookie };
