var club;
async function follow() {
  const clubId = parseInt(location.search.substring(1));
  const api = club.is_follower ? 'unfollow_club' : 'follow_club';
  const response = await apiPost(api, {club_id: clubId});
  await reloadClub();
}

async function loadHandler() {
  if (await doRedirect()) {
    return;
  }
  await reloadClub();
}
async function reloadClub() {
  const clubId = parseInt(location.search.substring(1));
  const response = await apiPost('get_club', {club_id: clubId});
  const c = response.club;
  club = c;
  document.getElementById('club-title').textContent = c.name;
  document.getElementById('club-description').textContent = c.description;
  document.getElementById('follow-unfollow').textContent =
      club.is_follower ? 'Unfollow' : 'Follow';
  document.getElementById('follow-container').style.display =
      isWaitlisted() ? 'none' : '';
}
window.onload = loadHandler;