function getHeaders() {
  return {
    'User-Agent': 'Clubhouse',
    'CH-Locale': 'en_US',
    'CH-AppVersion': '0.2.15',
    'CH-AppBuild': '269',
  };
}
function isLoggedIn() {
  return localStorage.hipsterHouse && localStorage.hipsterHouse.auth;
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
