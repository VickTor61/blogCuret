const deleteButton = document.querySelectorAll(".button_id");

$(document).ready(function () {
  for (i = 0; i < deleteButton.length; i++) {
    deleteButton[i].addEventListener("click", (e) => {
      $target = $(e.target);
      const id = $target.attr("data_id");

<<<<<<< HEAD
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          $.ajax({
            type: "DELETE",
            url: "/delete/" + id,
            success: function (response) {},
            error: function (err) {
              console.log(err);
            },
          }),
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      });
    });
  }
});
=======
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

const deletePost = postId => {
  return fetch(`/delete/${postId}`, {
    method: "DELETE"
  })
    .then(response => {
      window.location = "/";
    })
    .catch(error => console.log(error));
};
>>>>>>> 4f3798f... Fix deleting posts
