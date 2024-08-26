export const getUserFromStorage = () => {
  return (
    JSON.parse(localStorage.getItem("user")) ||
    JSON.parse(sessionStorage.getItem("user"))
  );
};

export const getTokenFromStorage = () => {
  return localStorage.getItem("token") || sessionStorage.getItem("token");
};

export const getRefreshTokenFromStorage = () => {
  return (
    localStorage.getItem("refreshToken") ||
    sessionStorage.getItem("refreshToken")
  );
};
