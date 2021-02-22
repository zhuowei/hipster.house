function logOut() {
  setConfig({auth: null, user: null});
  location = '/';
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
  if (!isLoggedIn()) {
    document.getElementById('not-logged-in').style.display = '';
    document.getElementById('login-button').style.display = '';
    document.getElementById('log-out').style.display = 'none';
    document.getElementById('set-username').style.display = 'none';
    document.getElementById('waitlist-username').style.display = 'none';
    document.getElementById('yourprofile').style.display = 'none';
    document.getElementById('alltopics').style.display = 'none';
    document.getElementById('searchbutton').style.display = 'none';
  } else if (isWaitlisted()) {
    document.getElementById('waitlist').style.display = '';
    document.getElementById('alltopics').style.display = 'none';
    document.getElementById('searchbutton').style.display = 'none';
    document.getElementById('yourprofile').style.display = 'none';
  } else if (!getConfig().user.success) {
    document.getElementById('maybe-banned').style.display = '';
  } else {
    // TODO(zhuowei): nope still didn't work
    // document.getElementById('personalappeal').style.display = '';
    document.getElementById('join-channel').style.display = '';
    document.getElementById('you-can-join').style.display = '';
    // document.getElementById('invite-user').style.display = '';
  }
  if (getConfig().user && getConfig().user.user_profile &&
      getConfig().user.user_profile.username) {
    document.getElementById('set-username').style.display = 'none';
    document.getElementById('waitlist-username').style.display = 'none';
  }
  if (getConfig().user && getConfig().user.user_profile) {
    document.getElementById('yourprofile').href =
        '/user.html?' + getConfig().user.user_profile.user_id;
  }
}
window.onload = loadHandler;
