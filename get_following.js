async function loadHandler() {
  if (await doRedirect()) {
    return;
  }
  const parts = location.search.substring(1).split(',');
  const userId = parseInt(parts[0]);
  const getFullBio = parts.length > 1 && parts[1] == 'full';
  if (getFullBio) {
    document.getElementById('get-full-bios').style.display = '';
  } else {
    document.getElementById('get-full-bios').href =
        '/get_following.html?' + userId + ',full';
  }

  const response = await apiPost('get_following', {user_id: userId});
  const usersContainer = document.getElementById('users-container');
  for (const userRaw of response.users) {
    const user = getFullBio ? (await apiPost('get_profile', {
                                user_id: userRaw.user_id
                              })).user_profile :
                              userRaw;
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