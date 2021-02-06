async function loadHandler() {
  if (await doRedirect()) {
    return;
  }
  const clubId = parseInt(location.search.substring(1));
  const response = await apiPost('get_club', {club_id: clubId});
  const c = response.club;
  document.getElementById('club-title').textContent = c.name;
  document.getElementById('club-description').textContent = c.description;
}
window.onload = loadHandler;