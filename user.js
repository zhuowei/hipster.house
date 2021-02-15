var user;
async function follow() {
  const userId = parseInt(location.search.substring(1));
  const api = user.is_follower ? 'unfollow' : 'follow';
  const response = await apiPost(api, {user_id: userId});
  await updateUser();
  await refresh();
}

async function loadHandler() {
  if (await doRedirect()) {
    return;
  }
  await refresh();
}

function isFollowing(userId) {
  return getConfig().user && getConfig().user.following_ids &&
      getConfig().user.following_ids.indexOf(userId) != -1;
}

async function refresh() {
  const userId = parseInt(location.search.substring(1));
  const response = await apiPost('get_profile', {user_id: userId});
  const p = response.user_profile;
  user = p;
  document.getElementById('user-title').textContent = p.username;
  document.getElementById('user-name').textContent = p.name;
  document.getElementById('user-bio').textContent = p.bio;
  document.getElementById('user-img').src = p.photo_url;
  document.getElementById('user-following').href =
      '/get_following.html?' + userId;
  document.getElementById('user-following').textContent =
      p.num_following + ' following';
  const clubsContainer = document.getElementById('user-clubs');
  clubsContainer.innerHTML = '';
  for (const club of p.clubs) {
    const clubLink = document.createElement('a');
    clubLink.href = '/club.html?' + club.club_id;
    clubLink.innerText = club.name;
    const clubDiv = document.createElement('div');
    clubDiv.appendChild(clubLink);
    clubsContainer.appendChild(clubDiv);
  }
  document.getElementById('follow-unfollow').textContent =
      isFollowing(userId) ? 'Unfollow' : 'Follow';
  document.getElementById('follow-container').style.display =
      isWaitlisted() ? 'none' : '';
}
window.onload = loadHandler;