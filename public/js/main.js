$(window).on("load", () => {
  preloader();
});

function preloader() {
  $("#preloader").fadeOut("slow", () => {
    $(this).remove();
  });
}
