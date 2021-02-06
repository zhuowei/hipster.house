async function loadHandler() {
  if (await doRedirect()) {
    return;
  }
  const response = await apiPost('get_channels', {});
  const channelsContainer = document.getElementById('channels-container');
  for (const channel of response.channels) {
    const channelDiv = document.createElement('div');
    const channelLink = document.createElement('a');
    channelLink.href = '/channel.html?' + channel.channel;
    channelLink.textContent = channel.topic;
    channelDiv.appendChild(channelLink);
    channelsContainer.appendChild(channelDiv);
  }
}
window.onload = loadHandler;