function enterAsGuest() {
  localStorage.setItem("guest", "true");
  window.location.href = "dashboard.html";
}

function askAI() {
  const input = document.getElementById("queryInput").value;
  document.getElementById("response").innerText = "Fetching response...";

  // Replace with real backend route
  fetch(`https://your-backend-url/api/ask?query=${encodeURIComponent(input)}`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("response").innerText = data.answer;
    })
    .catch(err => {
      document.getElementById("response").innerText = "Error fetching answer.";
    });
}

function askHelpBot() {
  const input = document.getElementById("helpQuery").value;
  document.getElementById("helpResponse").innerText = "Thinking...";

  // Placeholder
  setTimeout(() => {
    document.getElementById("helpResponse").innerText =
      "Try rephrasing your question or visiting our FAQ page.";
  }, 1000);
}
