# Nguyen Tran Minh Tri — Portfolio

A responsive React portfolio with a code editor inspired interface. Profile content lives in `src/data.js`; the page renders project cards, work history, education, honors, skills, and contact links from that data.

## Interactions

- Search projects with the search field or `Ctrl/Cmd + K`.
- Filter by project category or click a research focus tag.
- Open project details in a dialog and follow the repository link.
- Switch between dark and light themes; the choice is saved in the browser.
- Use the file explorer or tabs to navigate sections. On small screens, the explorer opens from the menu button.
- Copy the email address or use the call and email links.

## Run locally

Install Node.js, then run:

```sh
npm install
npm run dev
```

Vite prints a local URL to open in your browser.

## Build and deploy

Create the production bundle with:

```sh
npm run build
```

Upload the generated `dist/` directory to a static host such as Netlify or Cloudflare Pages. For GitHub Pages, use a Vite GitHub Actions workflow to build the app and publish `dist/`. If deploying to a repository subpath rather than a user site, set Vite's `base` to that repository path in `vite.config.js`.

## Update the content

Edit the profile, projects, experience, education, honors, and skill groups in `src/data.js`. The UI updates from those data arrays. Add project detail fields in the same project object shape to populate its detail dialog.

## Before publishing

- Confirm your personal details and contact email.
- Add a LinkedIn URL if you want one shown; the resume listed LinkedIn but did not include its address.
- Add a project-specific repository or live demo link for the automatic grading project if you want to feature it directly.
- The HUST share page lists GPA 3.55/4.0, while the resume lists 3.71/4.0. Confirm the current GPA before publishing.
- Student ID, date of birth, and detailed address are not included in this public-facing version.
