async function onSubmit(e) {
  e.preventDefault();
  const username = document.getElementById('username-input').value;
  const response = await apiPost('update_username', {username})
  if (response && response.error_message) {
    alert('Error: ' + response.error_message)
  }
  await updateUser();
  if (getConfig().user.user_profile.username) {
    location = '/';
  }
}
async function loadHandler() {
  if (await doRedirect()) {
    return;
  }
  document.getElementById('username-input').value =
      getConfig().user.user_profile.username || '';
}
window.onload = loadHandler;