var channelId;
var channelInfo;
var agoraClient;
const agoraApp = '938de3e8055e42b281bb8c6f69c21f78';

function handleError(e) {
  console.log(e);
}

async function loadHandler() {
  if (await doRedirect(true)) {
    return;
  }
  channelId = location.search.substring(1);
  channelInfo = await apiPost('join_channel', {channel: channelId});
  agoraClient = AgoraRTC.createClient({
    mode: 'rtc',
    codec: 'vp8',
  });
  const uid = await agoraClient.join(
      agoraApp, channelId, channelInfo.token,
      getConfig().auth.user_profile.user_id);
}

window.onload = loadHandler;