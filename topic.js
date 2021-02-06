async function loadHandler() {
  if (await doRedirect()) {
    return;
  }
  const topicId = parseInt(location.search.substring(1));
  const body = {topic_id: topicId};
  const [responseTopic, responseClubs, responseUsers] = await Promise.all([
    apiPost('get_topic', body), apiPost('get_clubs_for_topic', body),
    apiPost('get_users_for_topic', body)
  ]);
  document.getElementById('topic-title').textContent =
      responseTopic.topic.title;
  const clubsContainer = document.getElementById('clubs-container');
  for (const club of responseClubs.clubs) {
    const clubLink = document.createElement('a');
    clubLink.href = '/club.html?' + club.club_id;
    clubLink.innerText = club.name;
    const clubDiv = document.createElement('div');
    clubDiv.appendChild(clubLink);
    clubsContainer.appendChild(clubDiv);
  }
  const usersContainer = document.getElementById('users-container');
  for (const user of responseUsers.users) {
    const userLink = document.createElement('a');
    userLink.href = '/user.html?' + user.user_id;
    userLink.innerText = user.username;
    const userDiv = document.createElement('div');
    userDiv.appendChild(userLink);
    usersContainer.appendChild(userDiv);
  }
}
window.onload = loadHandler;