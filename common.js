function getHeaders(useGuestMode) {
  const headers = {
    'User-Agent': 'clubhouse/269 (iPhone; iOS 14.1; Scale/3.00)',
    'CH-Languages': 'en-US',
    'CH-Locale': 'en_US',
    'CH-AppVersion': '0.1.15',
    'CH-AppBuild': '269',
    'CH-UserID': '(null)',
    'CH-DeviceId': getDeviceId(),
  };
  if (isLoggedIn()) {
    const auth = getConfig().auth;
    headers['Authorization'] = 'Token ' + auth.auth_token;
    headers['CH-UserID'] = auth.user_profile.user_id;
  } else if (useGuestMode) {
    // Hi, View Source user: please don't get this banned, ok?
    headers['Authorization'] = 'Token 6d2e7064fbe7a06c4d423015581e20c6dbc24302';
    headers['CH-UserID'] = '69577135';
    headers['CH-DeviceId'] = '2E76C714-7730-4920-A56C-896622A7A794';
  }
  return headers;
}
function isLoggedIn() {
  const config = getConfig();
  return config.auth && config.auth.auth_token;
}

function apiUrl(api) {
  return 'https://api.hipster.house/api/' + api;
}

async function apiPost(api, body, opts) {
  let useGuestMode = true;
  if (opts && opts.disableGuestMode) {
    useGuestMode = false;
  }
  const response = await fetch(apiUrl(api), {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'content-type': 'application/json; charset=utf-8',
      ...getHeaders(useGuestMode),
    },
  });
  const responseBody = await response.json();
  return responseBody;
}

async function apiGet(api) {
  const response = await fetch(apiUrl(api), {
    method: 'GET',
    headers: getHeaders(/*useGuestMode=*/ true),
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
  const waitlistResponse = await apiGet('check_waitlist_status');
  const response = waitlistResponse && waitlistResponse.is_waitlisted ?
      {} :
      await apiPost('me', {});
  setConfig({user: response, waitlist: waitlistResponse});
}

async function doRedirect(needsOffWaitlist) {
  if (!isLoggedIn()) {
    if (needsOffWaitlist) {
      location = '/';
      return;
    }
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
  return getConfig().waitlist && getConfig().waitlist.is_waitlisted;
}

function getDeviceId() {
  let deviceId = getConfig().deviceId;
  if (!deviceId) {
    deviceId = uuidv4().toUpperCase();
    setConfig({deviceId});
  }
  return deviceId;
}
