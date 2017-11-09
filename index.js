(function() {

  var form = document.getElementsByTagName('form')[0];
  var addButton = document.getElementsByClassName('add')[0];
  var relField = document.getElementsByName('rel')[0];
  var ageField = document.getElementsByName('age')[0];
  var relValid = false;
  var ageValid = false;
  var houseHold = [];

  notValid(addButton, true);

  form.addEventListener('submit', submitForm);
  addButton.addEventListener('click', addPerson);

  relField.addEventListener('change', function() {
    validateRel(relField.value);
    if (ageValid && relValid) {
      notValid(addButton, false);
    }
  });
  ageField.addEventListener('change', function() {
    validateAge(ageField.value)
    if (ageValid && relValid) {
      notValid(addButton, false);
    }
  });

  function addPerson(evt) {
    evt.preventDefault();

    console.log('can submit')
    // display person in html
      // with button to delete
  }

  // function onsubmit
  // serialize json and display in DEBUG
  function submitForm(evt) {
    evt.preventDefault();
    console.log('submitting form');

  }

  // helpers

  function notValid(el, status) {
    el.disabled = status;
  }

  function validateAge(age) {
    if (isNotEmpty(age) && parseInt(age) > 0) {
      ageValid = true;
    } else {
      console.log('age required and has to be > 0.')
      ageValid = false;
      notValid(addButton, true);
    }
  }

  function validateRel(rel) {
    if (isNotEmpty(rel)) {
      relValid = true;
    } else {
      console.log('relationship required.')
      relValid = false;
      notValid(addButton, true);
    }
  }

  function isNotEmpty(value) {
    if (value !== "") {
      return true;
    } else {
      return false;
    }
  }

})();