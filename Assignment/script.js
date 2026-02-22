const form = document.getElementById("eventForm");
const container = document.getElementById("eventContainer");
const emptyState = document.getElementById("emptyState");

function updateEmptyState() {
  const eventCount = container.querySelectorAll(".event-card").length;
  emptyState.style.display = eventCount === 0 ? "block" : "none";
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const date = document.getElementById("date").value;
  const desc = document.getElementById("description").value;
  
  if (!title.trim()) {
    alert("Event title cannot be empty.");
    return;
  }

  if (!desc.trim()) {
    alert("Please add a short description.");
    return;
  }

  const card = document.createElement("div");
  card.className = "event-card";

  card.innerHTML = `
    <h3>${title}</h3>
    <small>${formatDate(date)}</small>
    <p>${desc}</p>

    <div class="event-actions">
      <button class="complete-btn">Complete</button>
      <button class="delete-btn">Delete</button>
    </div>
  `;

  container.appendChild(card);
  form.reset();
  updateEmptyState();
});

container.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete-btn")) {
    e.target.closest(".event-card").remove();
    updateEmptyState();
  }

  if (e.target.classList.contains("complete-btn")) {
    e.target.closest(".event-card").classList.toggle("completed");
  }
});

updateEmptyState();