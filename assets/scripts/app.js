let roleForm = document.getElementById('roleForm')
let dropdownMenu = document.querySelector('[name=dropdownMenu]')
let imgBox = document.getElementById('imgBox')
let firstName = document.querySelector('[name=firstname]')
let lastName = document.querySelector('[name=lastname]')
let saveBtn = document.querySelector('[name=saveBtn]')
let status = document.getElementById('status')
let roles = [];
let postInputs = {
  firstName: 'First',
  lastName: 'Last',
  role: 'Selected Role'
}
document.addEventListener("DOMContentLoaded", function(e) {
  axios.get('https://galvanize-student-apis.herokuapp.com/gpersonnel/roles')
    .then((response) => {
      response.data.map(data => {
        roles.push(data.title)
      })
      roles.sort();
      roles.map(role => {
        var option = document.createElement('option');
        option.innerHTML = role;
        dropdownMenu.appendChild(option);
      })
      dropdownMenu.addEventListener('change', function() {
        var roleOption = this.value;
        imgBox.src = `./assets/images/${roleOption}.jpg`
        postInputs.role = roleOption;
      })
    })

  saveBtn.addEventListener('click', function() {
    postInputs.firstName = firstName.value
    postInputs.lastName = lastName.value;
    axios.post('https://galvanize-student-apis.herokuapp.com/gpersonnel/users', postInputs)
      .then(function(response) {
        status.innerHTML = 'Success!'
        status.classList += ' fade-in'
        status.classList += ' fade'
        setTimeout(function() {
          status.classList.remove('fade')
          status.classList += ' save-status'
        }, 1000);
      })
      .catch(function(error) {
        status.innerHTML = 'Not quite.'
        status.classList += ' fade'
        setTimeout(function() {
          status.classList.remove('fade')
          status.classList += ' save-status'
        }, 1000);
      });
  })

});
