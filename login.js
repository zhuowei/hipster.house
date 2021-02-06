var phoneNumberLast = '';
async function onSubmit(e) {
  e.preventDefault();
  const countrycode = document.getElementById('countrycode').value;
  const phoneNumber =
      document.getElementById('phone-number').value.replace(/[^0-9]/g, '');
  phoneNumberLast = countrycode + phoneNumber;
  const body = {
    phone_number: phoneNumberLast,
  };
  const response = await apiPost('start_phone_number_auth', body);
  if (response && response.is_blocked) {
    alert('It seems your account is banned :(');
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
  const response = await apiPost('complete_phone_number_auth', body);
  setConfig({auth: response});
  location = '/';
}
function loadHandler() {}
window.onload = loadHandler;
