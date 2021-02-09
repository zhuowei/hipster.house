async function loadHandler() {
  if (await doRedirect()) {
    return;
  }
  const userId = parseInt(location.search.substring(1));
  const response = await apiPost('get_following', {user_id: userId});
  const usersContainer = document.getElementById('users-container');
  for (const user of response.users) {
    const userLink = document.createElement('a');
    userLink.href = '/user.html?' + user.user_id;
    userLink.innerText = user.username;
    const userDiv1 = document.createElement('div');
    userDiv1.appendChild(userLink);
    const userDiv = document.createElement('div');
    userDiv.appendChild(userDiv1);
    const userBio = document.createElement('div');
    userBio.textContent = user.bio;
    userDiv.appendChild(userBio);
    usersContainer.appendChild(userDiv);
  }
}
window.onload = loadHandler;