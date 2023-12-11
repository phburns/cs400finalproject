document.getElementById('changePasswordButton').addEventListener('click', function(event) {
    event.preventDefault();
    var form = document.getElementById('passwordChangeForm');
    form.reset();
    var modal = document.getElementById('myModal');
    modal.style.display = "block";
    document.getElementsByClassName('close')[0].onclick = function() {
        modal.style.display = "none";
    }
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});