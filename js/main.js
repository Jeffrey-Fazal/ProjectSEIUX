function subscribe() {
    // Get the form fields
    var firstName = document.getElementById("first-name").value;
    var lastName = document.getElementById("last-name").value;
    var email = document.getElementById("email").value;
  
    // Validate the fields
    var nameRegex = /^[a-zA-Z]{2,}$/;
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!nameRegex.test(firstName) || !nameRegex.test(lastName) || !emailRegex.test(email)) {
      alert("Please enter a valid first name, last name, and email address.");
      return false;
    }
  
    // Store the subscriber information in a file
    var subscriber = firstName + " " + lastName + " (" + email + ")\n";
    var file = new File([subscriber], "subscribers.txt", {type: "text/plain;charset=utf-8"});
    window.webkitRequestFileSystem(window.TEMPORARY, 1024*1024, function(fs) {
      fs.root.getFile("subscribers.txt", {create: true}, function(fileEntry) {
        fileEntry.createWriter(function(fileWriter) {
          fileWriter.seek(fileWriter.length);
          var blob = new Blob([subscriber], {type: "text/plain"});
          fileWriter.write(blob);
          alert("Thank you for subscribing to our newsletter. Enjoy the drones!");
          document.getElementById("modal").style.display = "block";
        }, errorHandler);
      }, errorHandler);
    }, errorHandler);
  
    // Clear the form fields
    document.getElementById("first-name").value = "";
    document.getElementById("last-name").value = "";
    document.getElementById("email").value = "";
  
    return false;
  }
  
  function errorHandler(error) {
    console.log("Error: " + error);
  }
  