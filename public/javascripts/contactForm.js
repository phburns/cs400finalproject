document.addEventListener('DOMContentLoaded', function() {
  // Get the form and the modal
  var contactForm = document.getElementById('contactForm');
  var submissionModal = document.getElementById('submissionModal');
  var closeModal = document.getElementById('closeModal');

  // Show the modal when the form is submitted
  contactForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from being submitted

    // Get the form data
    var contactReason = document.getElementById('contactReason').value;
    var message = document.getElementById('message').value;

    // Validate the form data
    if (!contactReason || !message) {
      alert('Please fill out all fields');
      return;
    }

    // Show the modal
    submissionModal.style.display = 'block';
  });

  // Navigate back to /index when the Close button is clicked
  closeModal.onclick = function() {
    window.location.href = '/index';
  }
});