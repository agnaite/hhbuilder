(function() {

  var form = document.getElementsByTagName('form')[0];
  var addButton = document.getElementsByClassName('add')[0];
  var submitButton = document.getElementsByTagName('button')[1];
  var relField = document.getElementsByName('rel')[0];
  var ageField = document.getElementsByName('age')[0];
  var smokerField = document.getElementsByName('smoker')[0];
  var debugEl = document.getElementsByClassName('debug')[0];
  var domHousehold = document.getElementsByClassName('household')[0];
  var relValid = false;
  var ageValid = false;
  var household = [];

  updateAddButton();
  updateSubmitButton();

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

    household.push({ age: ageField.value,
                     rel: relField.value,
                     smoker: smokerField.checked
                  });
    addPersonToDOM(household[household.length-1]);
    updateSubmitButton();
    // display person in html
      // with button to delete
  }

  // function removePerson() {
  //
  // }

  // function onsubmit
  // serialize json and display in DEBUG
  function submitForm(evt) {
    evt.preventDefault();
    console.log('submitting form');
    var jsonSubmission = JSON.stringify(household);

    debugEl.innerHTML = jsonSubmission;
    debugEl.style.display = 'block';

  }

  // helpers

  function addPersonToDOM(person) {
    var node = document.createElement("LI");
    var deleteButton = document.createElement("BUTTON");
    deleteButton.innerHTML = 'Delete';
    deleteButton.className = 'delete';
    var textnode = document.createTextNode('age: '+person.age+' |'+
                                           ' relationship: '+person.rel+' |'+
                                           ' smoker: '+person.smoker);
    node.appendChild(textnode);
    node.appendChild(deleteButton);
    domHousehold.appendChild(node);
  }

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

  function updateSubmitButton() {
    if (household.length > 0) {
      disableButton(submitButton, false);
    } else {
      disableButton(submitButton, true);
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