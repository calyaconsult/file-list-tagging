# File Tagging System

A web-based tool to organize and manage your files using semantic tags. Perfect for when you have a long list of files in no discernible order and need to create meaningful groups.

## Features

- **JSON-driven list generation**: Easily generate file lists from JSON data
- **Interactive dropdowns**: 
  - Predefined categories for quick tagging
  - Support for custom user-created categories
- **Persistent storage**: Categories are saved in localStorage for future sessions
- **Visual tag display**: Tags appear on file cards for quick identification
- **Management controls**:
  - Clear button to reset all tags
  - Show button to display all tags at once
- **Data portability**:
  - Export your entire localStorage data as JSON
  - Import previously exported data to restore your setup

## How It Works

1. **Load your files**: Provide a JSON file containing your file list
2. **Add tags**: 
   - Use predefined tags from the dropdown
   - Create custom tags by typing and pressing Enter
3. **Organize**: Tags appear on file cards and are saved automatically
4. **Manage your data**:
   - Use "Clear" to remove all tags
   - Use "Show" to display all tags
   - Export your data for backup or sharing
   - Import previously exported data

## Getting Started

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/file-tagging-system.git
   ```

2. Open `index.html` in your web browser

3. Prepare a JSON file with your file list (example format):
   ```json
   [
     {"name": "document1.pdf", "path": "/docs/"},
     {"name": "image.png", "path": "/images/"},
     {"name": "notes.txt", "path": "/notes/"}
   ]
   ```

4. Upload your JSON file using the interface

5. Start tagging your files!

## Technical Details

- Built with HTML, CSS, and vanilla JavaScript
- Uses localStorage for persistent data storage
- No external dependencies
- Works in all modern browsers

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Note**: This tool runs entirely in your browser. No data is sent to any server - everything stays local to your machine.
