import React, { useEffect, useMemo, useRef, useState } from 'react';
import { education, experience, files, honors, profile, projects, skillGroups } from './data.js';

const categories = ['All', ...new Set(projects.map((project) => project.category))];

function FileIcon({ ext }) {
  return <span className={`file-ext ${ext.toLowerCase()}`}>{ext}</span>;
}

function SectionHeading({ eyebrow, title, file }) {
  return (
    <div className="section-heading">
      <div><div className="eyebrow">// {eyebrow}</div><h2>{title}</h2></div>
      <span className="section-count">{file}</span>
    </div>
  );
}

function ProjectCard({ project, onOpen }) {
  return (
    <article className="project-card">
      <div className="project-top">
        <span className="project-kind">{project.category}</span>
        <a className="project-link" href={project.url} target="_blank" rel="noreferrer" onClick={(event) => event.stopPropagation()}>Repository ↗</a>
      </div>
      <button className="project-title" type="button" onClick={() => onOpen(project)}>{project.title}</button>
      <p>{project.description}</p>
      <div className="project-meta">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
      <button className="details-link" type="button" onClick={() => onOpen(project)}>Open project details <span aria-hidden="true">→</span></button>
    </article>
  );
}

function ProjectDialog({ project, onClose }) {
  useEffect(() => {
    if (!project) return undefined;
    const onKeyDown = (event) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [project, onClose]);

  if (!project) return null;
  return (
    <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="project-dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title">
        <div className="dialog-bar"><span>project details</span><button type="button" onClick={onClose} aria-label="Close project details">×</button></div>
        <div className="dialog-content">
          <div className="eyebrow">{project.category}</div>
          <h2 id="dialog-title">{project.title}</h2>
          <p className="dialog-role">{project.role}</p>
          <p>{project.detail}</p>
          <h3>Stack</h3>
          <div className="project-meta">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          <a className="dialog-repo" href={project.url} target="_blank" rel="noreferrer">Open repository ↗</a>
        </div>
      </section>
    </div>
  );
}

export default function App() {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('ntmt-theme') || 'dark'; } catch { return 'dark'; }
  });
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [activeFile, setActiveFile] = useState('about');
  const [selectedProject, setSelectedProject] = useState(null);
  const [explorerOpen, setExplorerOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [toast, setToast] = useState('');
  const searchRef = useRef(null);

  useEffect(() => {
    document.body.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    try { localStorage.setItem('ntmt-theme', theme); } catch { /* storage can be unavailable in private browsing */ }
  }, [theme]);

  useEffect(() => { document.title = `${profile.name} — Portfolio`; }, []);

  useEffect(() => {
    const targets = files.map(({ id }) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveFile(visible.target.id);
    }, { rootMargin: '-12% 0px -70% 0px', threshold: [0, 0.2, 0.5] });
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setActiveFile('projects');
        setExplorerOpen(false);
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        searchRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const filteredProjects = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return projects.filter((project) => {
      const matchesCategory = category === 'All' || project.category === category;
      const searchable = `${project.title} ${project.category} ${project.tags.join(' ')} ${project.description} ${project.search}`.toLowerCase();
      return matchesCategory && (!normalized || searchable.includes(normalized));
    });
  }, [query, category]);

  const jumpTo = (id) => {
    setActiveFile(id);
    setExplorerOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setToast('Email copied to clipboard');
    } catch {
      window.location.href = `mailto:${profile.email}`;
      setToast('Opening your email app');
    }
    window.setTimeout(() => setToast(''), 2400);
  };

  return (
    <div className="workspace" data-theme={theme}>
      <header className="titlebar">
        <div className="window-dots" aria-hidden="true"><i /><i /><i /></div>
        <button className="mobile-explorer-toggle" type="button" onClick={() => setExplorerOpen((open) => !open)} aria-expanded={explorerOpen} aria-label="Toggle file explorer">☰</button>
        <span className="titlebar-label">NTMT — Portfolio workspace</span>
        <span className="titlebar-file">{files.find((file) => file.id === activeFile)?.label || 'README.md'}</span>
      </header>

      <div className={`editor-layout ${sidebarCollapsed ? 'explorer-collapsed' : ''}`}>
        <nav className="activity-bar" aria-label="Editor tools">
          <button className={`activity-icon ${sidebarCollapsed ? '' : 'active'}`} type="button" aria-label={sidebarCollapsed ? 'Expand file explorer' : 'Collapse file explorer'} aria-expanded={!sidebarCollapsed} onClick={() => setSidebarCollapsed((collapsed) => !collapsed)}>▤</button>
          <button className="activity-icon" type="button" aria-label="Search projects" onClick={() => { jumpTo('projects'); searchRef.current?.focus(); }}>⌕</button>
          <a className="activity-icon" href={profile.github} target="_blank" rel="noreferrer" aria-label="Open GitHub">⑂</a>
          <button className="activity-icon" type="button" aria-label="View skills" onClick={() => jumpTo('skills')}>▦</button>
          <div className="activity-spacer" />
          <button className="activity-icon theme-activity" type="button" aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>{theme === 'dark' ? '☼' : '☾'}</button>
        </nav>

        {explorerOpen && <button className="explorer-scrim" type="button" aria-label="Close file explorer" onClick={() => setExplorerOpen(false)} />}
        <aside className={`explorer ${explorerOpen ? 'is-open' : ''}`} aria-label="Portfolio file explorer">
          <div className="explorer-title"><span>EXPLORER</span><span aria-hidden="true">···</span></div>
          <div className="folder-name">⌄ &nbsp; NTMT — PORTFOLIO</div>
          <div className="file-tree">
            {files.slice(0, 2).map((file) => <button className={activeFile === file.id ? 'selected' : ''} type="button" key={file.id} onClick={() => jumpTo(file.id)}><FileIcon ext={file.ext} />{file.label}</button>)}
            <div className="folder-sub">⌄ &nbsp; projects</div>
            {projects.map((project) => <button className="nested" type="button" key={project.id} onClick={() => { setSelectedProject(project); setExplorerOpen(false); }}><FileIcon ext="MD" />{project.id}.md</button>)}
            {files.slice(3).map((file) => <button className={activeFile === file.id ? 'selected' : ''} type="button" key={file.id} onClick={() => jumpTo(file.id)}><FileIcon ext={file.ext} />{file.label}</button>)}
          </div>
          <div className="explorer-focus"><div className="explorer-subtitle">RESEARCH FOCUS</div><div className="focus-tags">{profile.focus.map((tag) => <button type="button" key={tag} onClick={() => { setCategory('All'); setQuery(tag); jumpTo('projects'); }}>{tag}</button>)}</div></div>
          <div className="explorer-profile"><img className="mini-avatar" src="/profile.jpg" alt="" /><span><strong>{profile.name}</strong><small>{profile.role}</small></span></div>
        </aside>

        <main className="editor-pane">
          <div className="editor-toolbar">
            <div className="breadcrumbs"><span>portfolio</span><b>›</b><span>{files.find((file) => file.id === activeFile)?.label || 'README.md'}</span></div>
            <div className="toolbar-actions">
              <label className="search-box"><span aria-hidden="true">⌕</span><input ref={searchRef} value={query} onChange={(event) => { setQuery(event.target.value); jumpTo('projects'); }} placeholder="Search projects" aria-label="Search projects" /><kbd>Ctrl K</kbd>{query && <button type="button" onClick={() => setQuery('')} aria-label="Clear search">×</button>}</label>
              <button className="theme-toggle" type="button" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>{theme === 'dark' ? '☼' : '☾'}</button>
            </div>
          </div>
          <nav className="editor-tabs" aria-label="Open files">
            {files.map((file) => <button className={activeFile === file.id ? 'active' : ''} type="button" key={file.id} onClick={() => jumpTo(file.id)}><FileIcon ext={file.ext} />{file.label}{activeFile === file.id && <span className="tab-close">×</span>}</button>)}
          </nav>

          <section className="code-section about-section" id="about">
            <div className="profile-intro">
              <img className="profile-avatar" src="/profile.jpg" alt={`${profile.name} profile`} />
              <SectionHeading eyebrow="profile" title={profile.name} file="README.md" />
            </div>
            <div className="code-lines"><span className="line-no">1</span><p><span className="token-key">const</span> role = <span className="token-string">"{profile.role}"</span>;</p><span className="line-no">2</span><p><span className="token-key">const</span> program = <span className="token-string">"{profile.program}"</span>;</p><span className="line-no">3</span><p className="bio-line">{profile.bio}</p></div>
          </section>

          <section className="code-section" id="experience">
            <SectionHeading eyebrow="what I do" title="Experience" file="experience.md" />
            <div className="timeline">{experience.map((item) => <article className="timeline-item" key={item.title}><span className="date">{item.date}</span><div><h3>{item.title}</h3><div className="place">{item.place}</div><p>{item.description}</p></div></article>)}</div>
          </section>

          <section className="code-section" id="projects">
            <SectionHeading eyebrow="selected work" title="Projects & research" file="projects.tsx" />
            <div className="category-row" aria-label="Filter projects by category">{categories.map((item) => <button type="button" key={item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)}>{item}</button>)}</div>
            <div className="project-grid">{filteredProjects.map((project) => <ProjectCard key={project.id} project={project} onOpen={setSelectedProject} />)}</div>
            {filteredProjects.length === 0 && <div className="no-results" role="status">No projects found. Try another term or category.</div>}
          </section>

          <section className="code-section" id="education">
            <SectionHeading eyebrow="academic background" title="Education & recognition" file="education.md" />
            <div className="edu-list">{education.map((item) => <article className="edu-row" key={item.title}><div><h3>{item.title}</h3><p>{item.school}</p></div><div className="edu-right">{item.date}{item.detail && <small>{item.detail}</small>}</div></article>)}</div>
            <div className="honors-list">{honors.map((item) => <article className="edu-row" key={item.title}><div><h3>{item.title}</h3><p>{item.detail}</p></div><div className="edu-right">{item.date}</div></article>)}</div>
          </section>

          <section className="code-section" id="skills">
            <SectionHeading eyebrow="tools & methods" title="Skills" file="skills.json" />
            <div className="skill-grid">{skillGroups.map((group) => <article className="skill-card" key={group.title}><h3>{group.title}</h3><p>{group.skills}</p></article>)}</div>
          </section>

          <section className="code-section contact-section" id="contact">
            <SectionHeading eyebrow="say hello" title="Contact" file="contact.md" />
            <div className="contact-card"><div><p>Open to conversations about explainable AI, bioinformatics, and research opportunities.</p><a href={`mailto:${profile.email}`}>{profile.email}</a></div><div className="contact-buttons"><button type="button" onClick={copyEmail}>Copy email</button><a href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a><a href={profile.facebook} target="_blank" rel="noreferrer">Facebook ↗</a></div></div>
          </section>
          <footer className="statusbar"><span>● &nbsp; Ready</span><span>UTF-8 &nbsp; HTML · React &nbsp; {activeFile}</span></footer>
        </main>
      </div>
      <ProjectDialog project={selectedProject} onClose={() => setSelectedProject(null)} />
      {toast && <div className="toast" role="status">{toast}</div>}
    </div>
  );
}
