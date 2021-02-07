function logOut() {
  setConfig({auth: null, user: null});
  location = '/login.html';
}
async function loadHandler() {
  if (location.search === '?bypass') {
    setConfig({bypass: true});
  }
  if (location.search === '?nobypass') {
    setConfig({bypass: false});
  }
  if (await doRedirect()) {
    return;
  }
  if (!getConfig().user.success) {
    document.getElementById('maybe-banned').style.display = '';
  } else if (isWaitlisted()) {
    document.getElementById('waitlist').style.display = '';
  }
  if (getConfig().user.user_profile.username) {
    document.getElementById('set-username').style.display = 'none';
    document.getElementById('waitlist-username').style.display = 'none';
  }
}
window.onload = loadHandler;
