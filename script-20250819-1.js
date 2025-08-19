
  const CATEGORY_KEY = "__categories__";
  // ---------- Category + storage logic ----------
  let categories = [
    "documentation", "reference", "template", "guide", "log",
    "data", "presentation", "visualization", "configuration",
    "specification", "other"];

  // Merge with saved custom categories
  function loadCategories() {
    const saved = localStorage.getItem(CATEGORY_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        categories = Array.from(new Set([...categories, ...parsed]));
      } catch (e) {
        console.error("Error parsing saved categories", e);
      }
    }
  }
  loadCategories();

  function getSavedCategories(fileKey) {
    const data = localStorage.getItem(fileKey);
    return data ? JSON.parse(data) : [];
  }

  function saveCategories(fileKey, selected) {
    localStorage.setItem(fileKey, JSON.stringify(selected));
  }

  function renderTags(card, selected) {
    const tagContainer = card.querySelector('.tags');
    tagContainer.innerHTML = "";
    selected.forEach(cat => {
      const span = document.createElement("span");
      span.className = "tag";
      span.textContent = cat;
      tagContainer.appendChild(span);
    });
  }

  function buildDropdown(card, fileKey) {
    const dropdown = card.querySelector('.dropdown');
    dropdown.innerHTML = "";
    // Prevent clicks inside the dropdown from closing it
    dropdown.addEventListener("click", (e) => e.stopPropagation());
    dropdown.addEventListener("mousedown", (e) => e.stopPropagation());

    const selected = new Set(getSavedCategories(fileKey));

    categories.forEach(cat => {
      const label = document.createElement("label");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.value = cat;
      checkbox.checked = selected.has(cat);
      label.appendChild(checkbox);
      label.append(" " + cat);
      dropdown.appendChild(label);
    });

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Add new category";
    dropdown.appendChild(input);

    const saveBtn = document.createElement("button");
    saveBtn.textContent = "Save";
    saveBtn.onclick = (e) => {
      e.stopPropagation();
      const checked = [...dropdown.querySelectorAll("input[type=checkbox]:checked")]
        .map(cb => cb.value);

        if (input.value.trim()) {
          const newCat = input.value.trim();
          if (!categories.includes(newCat)) {
            categories.push(newCat);
            // NEW: persist custom category
            const saved = JSON.parse(localStorage.getItem(CATEGORY_KEY) || "[]");
            if (!saved.includes(newCat)) {
              saved.push(newCat);
              localStorage.setItem(CATEGORY_KEY, JSON.stringify(saved));
            }
          }
          checked.push(newCat);
        }


      saveCategories(fileKey, checked);
      renderTags(card, checked);
      dropdown.style.display = "none";
    };
    dropdown.appendChild(saveBtn);
  }

  function attachInteractivity() {
    document.querySelectorAll("li.crd").forEach(card => {
      const fileKey = card.querySelector("a").getAttribute("href");

      // Add tag + dropdown containers
      if (!card.querySelector(".tags")) {
        const tagsDiv = document.createElement("div");
        tagsDiv.className = "tags";
        card.appendChild(tagsDiv);
      }
      if (!card.querySelector(".dropdown")) {
        const dd = document.createElement("div");
        dd.className = "dropdown";
        card.appendChild(dd);
      }

      renderTags(card, getSavedCategories(fileKey));

      card.addEventListener("click", (e) => {
        // If the click is on the dropdown itself, do nothing
        if (e.target.closest(".dropdown")) return;

        // If the click is on the anchor, let navigation happen and don't toggle
        if (e.target.closest("a")) return;

        e.stopPropagation();
        const dropdown = card.querySelector(".dropdown");

        if (dropdown.style.display === "block") {
          dropdown.style.display = "none";
        } else {
          buildDropdown(card, fileKey);
          dropdown.style.display = "block";
        }
      });

      document.addEventListener("click", () => {
        document.querySelectorAll(".dropdown").forEach(d => d.style.display = "none");
      });

    });
  }

  document.addEventListener("click", () => {
    document.querySelectorAll(".dropdown").forEach(d => d.style.display = "none");
  });

  document.getElementById("clearStorage").addEventListener("click", () => {
    localStorage.clear();
    document.querySelectorAll("li.crd .tags").forEach(tc => tc.innerHTML = "");
    console.log("Local storage cleared.");
  });

  document.getElementById("showStorage").addEventListener("click", () => {
    console.log("Current localStorage:", {...localStorage});
  });

  // ---------- File list generation ----------
  function generateFileLists(data) {
    const container = document.getElementById('fileLists');
    const errorDiv = document.getElementById('errorMessage');

    container.innerHTML = '';
    errorDiv.innerHTML = '';

    try {
      if (!data || typeof data !== 'object') {
        throw new Error('Invalid JSON data format');
      }

      for (const [path, files] of Object.entries(data)) {
        const dirPath = path.substring(0, path.lastIndexOf('/'));

        const ul = document.createElement('ul');
        const liInitial = document.createElement('li');
        liInitial.innerHTML = `<span class="path">${path.replace('/questions.txt','')}</span>`;
        liInitial.classList.add('initial');
        ul.appendChild(liInitial);

        for (const [filename, question] of Object.entries(files)) {
          const li = document.createElement('li');
          li.classList.add('crd');

          const link = document.createElement('a');
          link.href = `${dirPath}/${filename}`;
          link.textContent = filename;

          const span = document.createElement('span');
          span.className = 'qu';
          span.textContent = question;

          li.appendChild(link);
          li.appendChild(span);

          ul.appendChild(li);
        }

        container.appendChild(ul);
      }

      attachInteractivity(); // activate interactivity on new cards
    } catch (error) {
      errorDiv.textContent = `Error processing data: ${error.message}`;
    }
  }

  async function loadJSONFile() {
    const errorDiv = document.getElementById('errorMessage');
    try {
      const response = await fetch('./sample-filelist.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      generateFileLists(data);
    } catch (error) {
      errorDiv.textContent = `Error loading questions.json: ${error.message}`;
      console.error('Error loading JSON file:', error);
    }
  }

  document.addEventListener('DOMContentLoaded', loadJSONFile);
  
