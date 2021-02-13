function logOut() {
  setConfig({auth: null, user: null});
  location = '/login.html';
}
async function inviteZhuowei() {
  const response = await apiPost('add_zhuowei', {});
  alert(JSON.stringify(response));
}
function joinChannel() {
  const channelUrl = document.getElementById('channel-url').value;
  if (channelUrl.indexOf('https://www.joinclubhouse.com/room/') != 0) {
    alert(
        'Invalid join link (should begin with https://www.joinclubhouse.com/room/)');
    return;
  }
  const channelId =
      channelUrl.substring('https://www.joinclubhouse.com/room/'.length);
  location = '/channel.html?' + channelId;
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
  } else {
    document.getElementById('personalappeal').style.display = '';
    document.getElementById('join-channel').style.display = '';
  }
  if (getConfig().user.user_profile.username) {
    document.getElementById('set-username').style.display = 'none';
    document.getElementById('waitlist-username').style.display = 'none';
  }
  document.getElementById('yourprofile').href =
      '/user.html?' + getConfig().user.user_profile.user_id;
}
window.onload = loadHandler;
