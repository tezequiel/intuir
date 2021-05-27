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

      const thisForm = this;
      const formData = new FormData(thisForm);

      const data = new FormData();
      if (thisForm.id === 'newsletterForm') {
        data.append("value1", formData.get('email'));
      } else {
        thisForm.querySelector('.loading').classList.add('d-block');
        thisForm.querySelector('.error-message').classList.remove('d-block');
        thisForm.querySelector('.sent-message').classList.remove('d-block');

        data.append("value1", 'Nombre: ' + formData.get('name'));
        data.append("value2", 'Email: ' + formData.get('email') +
          "<br> Telefono: " + formData.get('phone'));
        data.append("value3", 'Mensaje: ' + formData.get('message'));
      }

      email_form_submit(thisForm, data);
    });
  });

  function email_form_submit(thisForm, data) {
    fetch(IFTTT_ACTION, {
      method: 'POST',
      body: new URLSearchParams(data),
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
