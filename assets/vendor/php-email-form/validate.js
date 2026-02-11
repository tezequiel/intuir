/**
* PHP Email Form Validation - v3.11
* URL: https://bootstrapmade.com/php-email-form/
* Author: BootstrapMade.com
*/
(function () {
  "use strict";

  const IFTTT_ACTION = "https://maker.ifttt.com/trigger/form_submitted/with/key/goJFaCJNFXaWBC49winHxTpI3X8MKvtdTxTeLC-AcKI";

  let forms = document.querySelectorAll('.php-email-form');

  forms.forEach( function(e) {
    e.addEventListener('submit', function(event) {
      event.preventDefault();

      let thisForm = this;

      thisForm.querySelector('.loading').classList.add('d-block');
      thisForm.querySelector('.error-message').classList.remove('d-block');
      thisForm.querySelector('.sent-message').classList.remove('d-block');

      let formData = new FormData();

      formData.append("value1", "Intuir Idiomas");
      formData.append("value2", "Nombre: " + thisForm.elements.name.value + '<br>Email: ' + thisForm.elements.email.value + "<br>Telefono: " + thisForm.elements.phone.value);
      formData.append("value3", 'Mensaje: ' + thisForm.elements.message.value);

      php_email_form_submit(thisForm, action, formData);
    });
  });

  function php_email_form_submit(thisForm, action, formData) {
    fetch(IFTTT_ACTION, {
      method: 'POST',
      body: new URLSearchParams(formData),
      headers: {'X-Requested-With': 'XMLHttpRequest'},
      mode: 'no-cors'
    })
    .then(response => {
      if( response.ok ) {
        return response.text();
      } else {
        throw new Error(`${response.status} ${response.statusText} ${response.url}`); 
      }
    })
    .then(data => {
      thisForm.querySelector('.loading').classList.remove('d-block');
      if (data.trim() == 'OK') {
        gtag('event', 'conversion', {'send_to': 'AW-436101450/2GJxCKSVgIoCEMrC-c8B'});
        thisForm.querySelector('.sent-message').classList.add('d-block');
        thisForm.reset(); 
      } else {
        throw new Error(data ? data : 'Form submission failed and no error message returned from: ' + action); 
      }
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
