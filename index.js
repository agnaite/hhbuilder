(function() {

  var form = document.getElementsByTagName('form')[0];
  var addButton = document.getElementsByClassName('add')[0];
  var relField = document.getElementsByName('rel')[0];
  var ageField = document.getElementsByName('age')[0];
  var relValid = false;
  var ageValid = false;
  var houseHold = [];

  updateAddButton();

  form.addEventListener('submit', submitForm);
  addButton.addEventListener('click', addPerson);

  relField.addEventListener('change', function() {
    validateRel(relField.value);
    updateAddButton();
  });
  ageField.addEventListener('change', function() {
    validateAge(ageField.value);
    updateAddButton();
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

  function disableButton(el, status) {
    el.disabled = status;
  }

  function updateAddButton() {
    if (ageValid && relValid) {
      disableButton(addButton, false);
    } else {
      disableButton(addButton, true);
    }
  }

  function validateAge(age) {
    if (isNotEmpty(age) && parseInt(age) > 0) {
      ageValid = true;
    } else {
      console.log('age required and has to be > 0.')
      ageValid = false;
      disableButton(addButton, true);
    }
  }

  function validateRel(rel) {
    if (isNotEmpty(rel)) {
      relValid = true;
    } else {
      console.log('relationship required.')
      relValid = false;
      disableButton(addButton, true);
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