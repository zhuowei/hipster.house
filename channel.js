var channelId;
var channelInfo;
var agoraClient;
const kSendAudio = false;
const agoraApp = '938de3e8055e42b281bb8c6f69c21f78';
var localAudioTrack;

function handleError(e) {
  console.log(e);
}

async function loadHandler() {
  if (await doRedirect()) {
    return;
  }
  if (isWaitlisted()) {
    document.getElementById('waitlist').style.display = '';
    document.getElementById('join-channel-div').style.display = 'none';
    return;
  }
  channelId = location.search.substring(1);
  channelInfo = await apiPost('join_channel', {channel: channelId});
  document.getElementById('channel-topic').textContent =
      channelInfo.topic || '(empty)';
}
async function joinChannel() {
  document.getElementById('join-channel-div').style.display = 'none';
  // https://docs.agora.io/en/Voice/start_call_audio_web_ng
  agoraClient = AgoraRTC.createClient({
    mode: 'rtc',
    codec: 'vp8',
  });
  agoraClient.on('user-published', async (user, mediaType) => {
    await agoraClient.subscribe(user, mediaType);
    if (mediaType === 'audio') {
      const remoteAudioTrack = user.audioTrack;
      remoteAudioTrack.play();
    }
  });
  const uid = await agoraClient.join(
      agoraApp, channelId, channelInfo.token,
      getConfig().auth.user_profile.user_id);
  if (kSendAudio) {
    localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    await agoraClient.publish([localAudioTrack]);
  }
}

window.onload = loadHandler;