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
  }
}
window.onload = loadHandler;
