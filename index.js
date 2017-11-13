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
  var count = 0;

  updateAddButton();
  updateSubmitButton();

  form.addEventListener('submit', submitForm);
  addButton.addEventListener('click', addPerson);

  relField.addEventListener('change', function() {
    clearWarning();
    validateRel(relField.value);
    updateAddButton();
  });
  ageField.addEventListener('change', function() {
    clearWarning();
    validateAge(ageField.value);
    updateAddButton();
  });

  function addPerson(evt) {
    evt.preventDefault();

    household.push({ id: count,
                     age: ageField.value,
                     rel: relField.value,
                     smoker: smokerField.checked
                  });
    addPersonToDOM(household[household.length-1]);
    updateSubmitButton();
    count++;
  }

  function deletePerson(evt) {
    var personId = evt.target.parentElement.firstChild.innerHTML;

    // remove li from dom
    evt.target.parentElement.remove();

    // remove person from household object
    for (var i=0; i<household.length; i++) {
      if (household[i].id == personId) {
        household.splice(i, 1);
        break;
      }
    }
  }

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
    var personId = document.createElement("SPAN");
    deleteButton.innerHTML = 'Delete';
    deleteButton.className = 'delete';
    personId.innerHTML = person.id;
    personId.style.display = 'none';
    var textnode = document.createTextNode('age: '+person.age+' |'+
                                           ' relationship: '+person.rel+' |'+
                                           ' smoker: '+person.smoker);
    node.appendChild(personId)
    node.appendChild(textnode);
    node.appendChild(deleteButton);
    domHousehold.appendChild(node);
    deleteButton.addEventListener('click', deletePerson);
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
      addWarning('Age required and has to be > 0.');
      ageValid = false;
      disableButton(addButton, true);
    }
  }

  function validateRel(rel) {
    if (isNotEmpty(rel)) {
      relValid = true;
    } else {
      addWarning('Relationship is required.');
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

  function addWarning(msg) {
    var warning = document.createElement('DIV');
    warning.className = 'warning';
    warning.style.color = 'red';
    var textnode = document.createTextNode(msg);
    warning.appendChild(textnode);
    form.prepend(warning);
  }

  function clearWarning() {
    var warning = document.getElementsByClassName('warning')[0];
    if (warning) { warning.innerHTML = '' };
  }

})();