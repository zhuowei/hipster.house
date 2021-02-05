function loadHandler() {
  if (!isLoggedIn()) {
    window.location = '/login.html';
    return;
  }
}
window.onload = loadHandler;
