function getHeaders() {
  const headers = {
    'User-Agent': 'Clubhouse',
    'CH-Locale': 'en_US',
    'CH-AppVersion': '0.2.15',
    'CH-AppBuild': '269',
  };
  if (isLoggedIn()) {
    const auth = getConfig().auth;
    headers['Authorization'] = 'Token ' + auth.auth_token;
    headers['CH-UserId'] = auth.user_profile.user_id;
  }
  return headers;
}
function isLoggedIn() {
  return !!getConfig().auth;
}

function apiUrl(api) {
  // return 'https://www.clubhouseapi.com/api/' + api;
  return 'https://decisive-acoustic-rhythm.glitch.me/api/' + api;
  return '/api/' + api;
}

async function apiPost(api, body) {
  const response = await fetch(apiUrl(api), {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'content-type': 'application/json',
      ...getHeaders(),
    },
  });
  const responseBody = await response.json();
  return responseBody;
}

function getConfig() {
  if (!localStorage.hipsterHouse) return {};
  return JSON.parse(localStorage.hipsterHouse);
}

function setConfig(newConfig) {
  localStorage.hipsterHouse = JSON.stringify({
    ...getConfig(),
    ...newConfig,
  });
}

async function updateUser() {
  const response = await apiPost('me', {});
  setConfig({user: response});
}

async function doRedirect(needsOffWaitlist) {
  if (!isLoggedIn()) {
    location = '/login.html';
    return;
  }
  await updateUser();
  if (needsOffWaitlist && isWaitlisted()) {
    location = '/';
    return;
  }
}

function isWaitlisted() {
  if (getConfig().bypass) return false;
  return getConfig().user && !getConfig().user.is_waitlisted;
}