# Naresh Kumar – Portfolio

Plain HTML, CSS and JavaScript. No build step.

## Edit content
Open `js/script.js`. The top of the file has lists for **education, skills, projects and certificates**. Change the text, save, and refresh.
- Add a certificate: copy one `{ ... }` block inside `certificates` and edit it.
- Source code button: paste your repo link in `code:` of the project. Empty = hidden.
- Contact details are in `index.html` (Contact section and the hero icons).

## Replace files
| File | What |
|---|---|
| `assets/images/profile.jpg` | Your photo (keep the same name) |
| `assets/images/smartdoc.jpg` | **Add:** SmartDoc AI screenshot |
| `assets/documents/resume.pdf` | Your resume |
| `assets/documents/SMARTDOC_AI_Project_Documentation.pdf` | **Add:** project documentation |

If you do not add the documentation PDF, set `docs: ""` in `script.js` so the button is hidden.

## Change colours
Edit the variables at the top of `css/style.css` (`--accent`, `--hero`, etc.).

## Deploy on GitHub Pages
1. Create a new public repository on GitHub (for example `portfolio`).
2. Upload everything inside this folder (not the folder itself) so `index.html` is at the top level.
3. Go to **Settings > Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**, select **main** and **/ (root)**, then Save.
5. After a minute your site is live at `https://rjnareshkumar.github.io/portfolio/`.
