export const logout = () => {
  localStorage.removeItem(process.env.REACT_APP_TOKEN_KEY);
  localStorage.removeItem(process.env.REACT_APP_USER_KEY);
  window.location.href = "/login";
}