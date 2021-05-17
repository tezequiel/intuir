/**
 * PHP Email Form Validation - v3.1
 * URL: https://bootstrapmade.com/php-email-form/
 * Author: BootstrapMade.com
 */
(function () {
  "use strict";

  const IFTTT_ACTION = "https://maker.ifttt.com/trigger/form_submitted/with/key/goJFaCJNFXaWBC49winHxTpI3X8MKvtdTxTeLC-AcKI";

  let forms = document.querySelectorAll('.php-email-form');

  forms.forEach(function (e) {
    e.addEventListener('submit', function (event) {
      event.preventDefault();

      let thisForm = this;

      thisForm.querySelector('.loading').classList.add('d-block');
      thisForm.querySelector('.error-message').classList.remove('d-block');
      thisForm.querySelector('.sent-message').classList.remove('d-block');

      let formData = new FormData(thisForm);
      const json = {
        'value1': 'Nombre: ' + formData.get('name'),
        'value2': 'Email: ' + formData.get('email') + "<br> Telefono: "
          + formData.get('phone'),
        'value3': 'Mensaje: ' + formData.get('message'),
      };
      email_form_submit(thisForm, json);
    });
  });

  function email_form_submit(thisForm, json) {
    fetch(IFTTT_ACTION, {
      method: 'POST',
      body: JSON.stringify(json),
      headers: {'X-Requested-With': 'XMLHttpRequest'},
      mode: 'no-cors',
    })
    .then(response => {
      if (response.ok || response.status === 0) {
        return response.text()
      } else {
        throw new Error(
          `${response.status} ${response.statusText} ${response.url}`);
      }
    })
    .then(data => {
      //Google Analytics -> gtag('event', 'conversion', {'send_to': 'AW-436101450/2GJxCKSVgIoCEMrC-c8B'});
      thisForm.querySelector('.loading').classList.remove('d-block');
      thisForm.querySelector('.sent-message').classList.add('d-block');
      thisForm.reset();
    })
    .catch((error) => {
      displayError(thisForm, error);
    });
  }

  function displayError(thisForm, error) {
    thisForm.querySelector('.loading').classList.remove('d-block');
    thisForm.querySelector('.error-message').innerHTML = error;
    thisForm.querySelector('.error-message').classList.add('d-block');
  }

})();
