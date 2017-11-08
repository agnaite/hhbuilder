(function() {
  var form = document.getElementsByTagName('form')[0];
  var addButton = document.getElementsByClassName('add')[0];

  form.addEventListener('submit', submitForm);
  addButton.addEventListener('click', addPerson);

  function addPerson(evt) {
    evt.preventDefault();
    console.log('adding person');
    // check age < 0
    // check relationship not null
    // display person in html
      // with button to delete
  }

  // function onsubmit
  // serialize json and display in DEBUG
  function submitForm(evt) {
    evt.preventDefault();
    console.log('submitting form');
  }

})();