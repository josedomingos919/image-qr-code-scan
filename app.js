// Get references to the elements in the HTML file
const fileInput = document.getElementById("fileInput");
const canvas = document.getElementById("canvas");

//const canvas = document.createElement("canvas");

const ctx = canvas.getContext("2d");
const resultDiv = document.getElementById("result");

// Add an event listener to the file input
fileInput.addEventListener("change", handleFileSelect, false);

// Function to handle the file selection
function handleFileSelect(event) {
  // Get the selected file from the input
  const file = event.target.files[0];

  // Create a FileReader to read the file
  const reader = new FileReader();

  // When the file is loaded, process it for QR code detection
  reader.onload = function (event) {
    // Create an image object
    const image = new Image();

    // Set the image source to the data URL from the FileReader
    image.src = event.target.result;

    // After the image is loaded, process it for QR code detection
    image.onload = function () {
      // Draw the image on the canvas
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

      // Get the image data from the canvas
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      // Decode the QR code from the image data
      const code = jsQR(imageData.data, imageData.width, imageData.height);

      // Display the result
      if (code) {
        console.log({ teste: code.data });
        resultDiv.innerText = "QR Code detected: " + code.data;
      } else {
        resultDiv.innerText = "No QR Code found.";
      }
    };
  };

  // Read the file as a data URL
  reader.readAsDataURL(file);
}
