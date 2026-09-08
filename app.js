const tasks = [
  { name: "Draft project proposal", due: "2026-09-10", priority: "high", done: false },
  { name: "Take trash out", due: "2026-09-11", priority: "medium", done: false },
  { name: "Get groceries", due: "2026-09-12", priority: "medium", done: false },
  { name: "Send mail", due: "2026-09-12", priority: "low", done: false }
];

let filter = "today";

function formatDate(dateText) {
  return new Date(`${dateText}T00:00:00`).toLocaleDateString(undefined, {
    weekday: "short", month: "short", day: "numeric", year: "numeric"
  });
}

function renderTasks() {
  const activeList = document.getElementById("taskList");
  const completedList = document.getElementById("completedList");
  activeList.innerHTML = "";
  completedList.innerHTML = "";

  tasks.forEach((task, index) => {
    const item = document.createElement("article");
    item.className = `task ${task.done ? "done" : ""}`;
    item.innerHTML = `
      <input type="checkbox" ${task.done ? "checked" : ""} aria-label="Complete task">
      <strong class="task-name">${task.name}</strong>
      <span class="task-meta">◷ ${formatDate(task.due)}</span>
      <span class="priority ${task.priority}" title="${task.priority} priority"></span>
      <button class="delete" aria-label="Delete task">×</button>
    `;

    item.querySelector("input").addEventListener("change", () => {
      task.done = !task.done;
      renderTasks();
    });

    item.querySelector(".delete").addEventListener("click", () => {
      tasks.splice(index, 1);
      renderTasks();
    });

    (task.done ? completedList : activeList).appendChild(item);
  });
}

function addTask() {
  const name = document.getElementById("taskName");
  const due = document.getElementById("taskDue");
  const priority = document.getElementById("taskPriority");

  if (!name.value.trim() || !due.value) {
    alert("Please enter a task and due date.");
    return;
  }

  tasks.push({
    name: name.value.trim(),
    due: due.value,
    priority: priority.value,
    done: false
  });

  name.value = "";
  due.value = "";
  document.getElementById("addPanel").classList.remove("open");
  renderTasks();
}

document.getElementById("addButton").addEventListener("click", () => {
  document.getElementById("addPanel").classList.toggle("open");
});

document.getElementById("saveTask").addEventListener("click", addTask);

document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelector(".tab.active").classList.remove("active");
    tab.classList.add("active");
    filter = tab.dataset.filter;
  });
});

document.getElementById("completedToggle").addEventListener("click", () => {
  document.getElementById("completedList").classList.toggle("hidden");
});

renderTasks();
