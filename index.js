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
  if (isWaitlisted()) {
    document.getElementById('waitlist').style.display = '';
  } else if (!getConfig().user.success) {
    document.getElementById('maybe-banned').style.display = '';
  } else {
    // TODO(zhuowei): nope still didn't work
    // document.getElementById('personalappeal').style.display = '';
    document.getElementById('join-channel').style.display = '';
    document.getElementById('you-can-join').style.display = '';
  }
  if (getConfig().user.user_profile.username) {
    document.getElementById('set-username').style.display = 'none';
    document.getElementById('waitlist-username').style.display = 'none';
  }
  document.getElementById('yourprofile').href =
      '/user.html?' + getConfig().user.user_profile.user_id;
}
window.onload = loadHandler;
