$(window).on("load", () => {
  preloader();
});

$(document).ready(() => {
  initBot();
});

// Preloader
function preloader() {
  $("#preloader").fadeOut("slow", () => {
    $(this).remove();
  });
}

// Initialize Bot
function initBot() {
  console.log("Bot Ready...");
}
