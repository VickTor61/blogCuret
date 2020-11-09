const deleteButton = document.querySelectorAll(".button_id");

$(document).ready(function () {
  for (i = 0; i < deleteButton.length; i++) {
    deleteButton[i].addEventListener("click", (e) => {
      $target = $(e.target);
      const id = $target.attr("data_id");

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
