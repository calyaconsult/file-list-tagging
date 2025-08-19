# Taggable File List  

A lightweight, client‑side tool for turning a chaotic collection of files into an organized, searchable set of cards.  
All data lives in the browser (localStorage) – no backend required.

---  

## 📖 Overview  

You have a long list of files, but they’re in no discernible order and you can’t remember which ones you actually created. Tagging lets you group files by any semantic criteria you choose (project, status, type, etc.).  

This repository provides a **JSON‑driven** interface that:

* Generates a list of file cards from a JSON source.  
* Lets you assign **tags** via interactive dropdowns (pre‑defined + user‑created categories).  
* Persists categories and tag assignments in **localStorage** so your work is saved across sessions.  
* Shows tags directly on each card.  
* Offers **Clear** and **Show** controls to hide/show tags.  
* Supports **Import / Export** of the entire localStorage payload, making it easy to back up or share your tagging schema.

---  

## ✨ Features  

| Feature | Description |
|---------|-------------|
| **JSON‑driven list generation** | Provide a simple JSON file (or inline object) describing your files – the UI builds cards automatically. |
| **Interactive dropdowns** | Choose from built‑in categories or create your own on the fly. |
| **Persistent categories** | All categories and tag assignments are saved in `localStorage`. |
| **Tag display on cards** | Tags appear as badges on each file card for instant visual grouping. |
| **Clear & Show buttons** | Quickly hide all tags (`Clear`) or reveal them again (`Show`). |
| **Import / Export** | Download the current `localStorage` data as a JSON file, or upload a previously exported file to restore a workspace. |
| **Zero backend** | Pure front‑end – works offline and can be hosted on any static site (GitHub Pages, Netlify, etc.). |

---  

## 🚀 Getting Started  

### 1. Clone the repo  

```bash
git clone https://github.com/your‑username/taggable-file-list.git
cd taggable-file-list
```

### 2. Open the app  

Just open `index.html` in a browser (or serve the folder with any static server, e.g., `npx serve`). No build step is required.

### 3. Provide your file list  

Edit `data/files.json` (or replace the inline `files` array in `script.js`) with a structure like:

```json
[
  {
    "id": "file-001",
    "name": "Report Q1.pdf",
    "url": "files/Report%20Q1.pdf"
  },
  {
    "id": "file-002",
    "name": "Design Mockup.png",
    "url": "files/Design%20Mockup.png"
  }
]
```

Each object must contain a unique `id`. Additional fields are ignored by the UI but can be used for custom rendering.

### 4. Tag your files  

* Click the **Add Tag** dropdown on any card.  
* Choose an existing category or type a new one and press **Enter** to create it.  
* The tag appears as a badge on the card and is saved automatically.

### 5. Use the controls  

| Control | Action |
|---------|--------|
| **Clear** | Removes all tag badges from the view (data stays in `localStorage`). |
| **Show** | Restores the tag badges. |
| **Export** | Downloads a `taggable-data.json` containing all categories and tag assignments. |
| **Import** | Upload a previously exported JSON to replace the current workspace. |

---  

## 🛠️ Development  

If you want to extend the UI or change the data handling:

1. **Install dependencies (optional)** – the project uses only vanilla JS, but you may want a dev server:  

   ```bash
   npm install -g serve   # or any static server you prefer
   ```

2. **Run a live server**  

   ```bash
   serve .
   ```

3. Edit the following files:  

   * `index.html` – layout and markup.  
   * `style.css` – visual styling.  
   * `script.js` – core logic (JSON loading, dropdown handling, localStorage API).  

4. **Build / Deploy** – because it’s static, you can push the repo to GitHub and enable **GitHub Pages** (Settings → Pages → source: `main` branch / `root`).  

---  

## 📦 Export / Import Format  

The exported JSON looks like:

```json
{
  "categories": ["Project A", "Urgent", "Design"],
  "tags": {
    "file-001": ["Project A", "Urgent"],
    "file-002": ["Design"]
  }
}
```

- `categories` – the master list of all tag names.  
- `tags` – a map of file IDs to an array of assigned tags.

Importing a file with this structure will replace the current `localStorage` data, allowing you to share a fully‑tagged workspace with teammates.

---  

## 🤝 Contributing  

Contributions are welcome! Feel free to:

* Open an issue for bugs or feature requests.  
* Submit a pull request with improvements (e.g., better UI, drag‑and‑drop tagging, dark mode).  

Please follow the standard GitHub flow:

```bash
git checkout -b feature/your-feature
# make changes
git commit -m "Add feature ..."
git push origin feature/your-feature
# open PR
```

---  

## 📜 License  

This project is licensed under the **MIT License** – see the `LICENSE` file for details.

---  

## 🙏 Acknowledgments  

* Inspired by the need for quick, client‑side organization tools.  
* Built with vanilla JavaScript, HTML5, and CSS3 – no external libraries required.  

---  

**Happy tagging!** 🎉  You've gathered a long list of files but they are in no discernible order and there are files you don't even remember having created.
Tagging is one way to create groups of files according to semantic criteria.

This repo offers:

* JSON-driven list generation
* Interactive dropdowns with predefined + user-created categories
* Persistent categories in localStorage
* Tag display on cards
* Clear & Show buttons
* Import & Export of the full localStorage
