async function loadData() {
  const response = await fetch("data.json");
  if (!response.ok) {
    throw new Error("Failed to load data.json");
  }
  return response.json();
}

function createCard(item) {
  const card = document.createElement("div");
  card.className = "card";

  const title = document.createElement("h3");
  title.textContent = item.title;
  card.appendChild(title);

  if (item.description) {
    const description = document.createElement("p");
    description.textContent = item.description;
    card.appendChild(description);
  }

  if (item.tags && item.tags.length) {
    const tagRow = document.createElement("div");
    tagRow.className = "card-actions";
    item.tags.forEach((tag) => {
      const tagEl = document.createElement("span");
      tagEl.className = "tag";
      tagEl.textContent = tag;
      tagRow.appendChild(tagEl);
    });
    card.appendChild(tagRow);
  }

  if (item.actions && item.actions.length) {
    const actions = document.createElement("div");
    actions.className = "card-actions";

    item.actions.forEach((action) => {
      const link = document.createElement("a");
      link.className = `button ${action.variant || "secondary"}`;
      link.textContent = action.label;
      link.href = action.href;
      link.target = action.target || "_blank";
      actions.appendChild(link);
    });

    card.appendChild(actions);
  }

  return card;
}

function renderSection(containerId, items) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  items.forEach((item) => container.appendChild(createCard(item)));
}

function formatUpdated(value) {
  if (!value) {
    return "Updated manually";
  }
  return `Updated ${value}`;
}

async function init() {
  try {
    const data = await loadData();
    renderSection("automation-grid", data.automations || []);
    renderSection("projects-grid", data.projects || []);
    renderSection("links-grid", data.links || []);

    const updatedEl = document.getElementById("last-updated");
    updatedEl.textContent = formatUpdated(data.updated);
  } catch (error) {
    console.error(error);
    const updatedEl = document.getElementById("last-updated");
    updatedEl.textContent = "Failed to load data";
  }
}

init();
