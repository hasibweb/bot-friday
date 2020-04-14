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
      //   Scroll to bottom when has new message
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
        ? "bg-primary float-left"
        : "bg-secondary mr-1 float-right";
    // Creating new list element and apending to dom
    const msgLI = ` <li class="clearfix"> 
            <p class='d-inline-block mb-1 px-2 py-1 rounded font-italic ${isBot}'> ${msg} </p> </li>`;
    $("#output-message").append(msgLI);
  }
})(jQuery);
