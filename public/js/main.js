(($) => {
  $(window).on("load", () => {
    preloader();
  });

  $(document).ready(() => {
    initBot();
  });

  // Preloader
  function preloader() {
    $("#preloader").fadeOut("slow", () => $(this).remove());
  }

  // Initialize Bot
  function initBot() {
    const socket = io();
    // Output Message when event happne
    socket.on("message", (msg, sender) => {
      outputDOM(msg, sender);
      $("#output-message").scrollTop($("#output-message").prop("scrollHeight"));
    });

    // Send Message on Form Submit
    $("#command-form").on("submit", (e) => {
      e.preventDefault();
      const command = $("#command").val().trim();
      if (command) {
        outputDOM(command, "user");
        socket.emit("message", command);
        // reset input
        $("#command").val("");
      } else {
        $("#command").val("");
      }
    });
  }

  // Output messages to DOM
  function outputDOM(msg, sender) {
    //   Dynamic Class name
    const isBot =
      sender === "bot"
        ? "float-left badge-primary"
        : "float-right badge-secondary mr-1";
    // Creating new list element and apending to dom
    const msgLI = ` <li class="clearfix"> 
          <p class="badge px-3 py-2 mb-2 ${isBot}"> ${msg} </p> 
          </li>`;
    $("#output-message").append(msgLI);
  }
})(jQuery);
