var phoneNumberLast = '';
async function onSubmit(e) {
  e.preventDefault();
  const countrycode = document.getElementById('countrycode').value;
  const phoneNumber =
      document.getElementById('phone-number').value.replace(/[^0-9]/g, '');
  if (phoneNumber.length == 0) {
    alert('Please enter a phone number.');
    return;
  }
  phoneNumberLast = countrycode + phoneNumber;
  const body = {
    phone_number: phoneNumberLast,
  };
  let response = null;
  try {
    response = await apiPost(
        'start_phone_number_auth', body, {disableGuestMode: true});
  } catch (e) {
    alert(e);
    console.log(e);
    return;
  }
  if (response && response.is_blocked) {
    alert('It seems your account is banned :(');
    return;
  }
  if (response && !response.success) {
    alert('Failed to login: ' + response.error_message);
    return;
  }
  document.getElementById('phone-number-div').style.display = 'none';
  document.getElementById('phone-code-div').style.display = '';
}

async function onSubmitCode(e) {
  e.preventDefault();
  const code = document.getElementById('phone-code').value;
  const body = {
    verification_code: code,
    phone_number: phoneNumberLast,
  };
  const response = await apiPost(
      'complete_phone_number_auth', body, {disableGuestMode: true});
  if (!response.success) {
    alert('Failed to login: ' + response.error_message)
    return;
  }
  if (!response.is_verified) {
    alert(
        'Wrong code: ' + response.number_of_attempts_remaining +
        ' attempts remaining');
    return;
  }
  setConfig({auth: response});
  location = '/';
}
function loadHandler() {}
window.onload = loadHandler;
