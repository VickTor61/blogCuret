const icon = document.querySelectorAll(".trashicon");

const modal = document.querySelector(".modal");
for (i = 0; i < icon.length; i++) {
  icon[i].onclick = function () {
    modal.style.display = "block";
  };
}

var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
