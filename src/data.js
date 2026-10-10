export const profile = {
  name: 'Nguyen Tran Minh Tri',
  initials: 'NT',
  role: 'AI Engineer / Data Scientist /Bioinformatician',
  program: 'Data Science & AI · HUST · English-taught',
  email: 'nguyentri050206@gmail.com',
  github: 'https://github.com/NTMT-hust',
  facebook: 'https://www.facebook.com/ntmt.zzz',
  bio: 'Third-year Data Science and AI undergraduate studying representation learning and interpretable models for high-dimensional biomedical data. My research spans preprocessing, experimental design, baseline comparisons, and reproducible evaluation. I’m interested in explainable AI, multi-omics integration, and biomedical computer vision.',
  focus: ['Explainable AI', 'Bioinformatics', 'Multi-omics', 'Deep learning', 'Biomedical vision'],
};

export const projects = [
  {
    id: 'deepcamcs', title: 'DeepCamCS — Explainable multi-omics cancer classification',
    category: 'Research · XAI', tags: ['PyTorch', 'EfficientNet-B1', 'Grad-CAM', 'Multi-omics', 'Focal Loss'],
    description: 'Represents mRNA, DNA methylation, and copy number variation as multi-channel images for cancer subtype classification. Combines CNNs, Grad-CAM-guided training, Focal Loss, and class weighting, then maps explanations to gene-level biomarkers for biological validation.',
    role: 'Research project · Manuscript in preparation',
    detail: 'The project studies an explainable deep learning framework for cancer subtype classification. Model explanations are mapped back to gene-level biomarkers and checked against biological evidence.',
    url: 'https://github.com/NTMT-hust/DeepCamCS', search: 'cancer genomics biomarker explainability',
  },
  {
    id: 'lung-nodule', title: 'Lung nodule segmentation & detection',
    category: 'Biomedical vision', tags: ['3D U-Net', 'LUNA16', 'Tversky loss', 'Medical imaging'],
    description: 'A multi-stage pipeline for LUNA16 CT scans: a coarse 3D U-Net proposes nodules, followed by a second 3D U-Net and contextual CNN refinement to improve segmentation and reduce false positives. Uses Tversky loss for small nodule regions.',
    role: 'Technical project',
    detail: 'Implemented and compared one-stage and two-stage approaches for nodule segmentation and contextual false-positive reduction using a reproducible evaluation workflow.',
    url: 'https://github.com/NTMT-hust/LungNoduleSegmentation', search: 'CT segmentation detection',
  },
  {
    id: 'vehicle-routing', title: 'Vehicle routing optimization web app',
    category: 'Optimization', tags: ['Python', 'Flask', 'Q-Learning', 'Mapbox'],
    description: 'An interactive Flask application for constrained multi-vehicle routing, integrating Q-Learning, Simulated Annealing, local search, and Mapbox distance and travel-time matrices.',
    role: 'Technical project · Deployed on Hugging Face Spaces',
    detail: 'Explores constrained route planning through reinforcement learning and local-search methods, with an interactive map-based interface.',
    url: 'https://github.com/NTMT-hust/VehicleRouting', search: 'routing simulated annealing local search',
  },
  {
    id: 'auto-grading', title: 'Automatic grading for graduation exams',
    category: 'Computer vision', tags: ['YOLOv11', 'OpenCV', 'RANSAC'],
    description: 'Combines answer-sheet detection, perspective correction, and rule-based grading. Evaluated the pipeline across scan distortions, detection failures, and grading edge cases.',
    role: 'Technical project',
    detail: 'The system detects answer sheets, aligns scans with homography, and applies grading rules to the corrected layout.',
    url: 'https://github.com/NTMT-hust?tab=repositories', search: 'answer sheet detection',
  },
  {
    id: 'tank-game', title: 'Tank Game with AI Bot',
    category: 'Game AI', tags: ['Godot', 'GDScript', 'Game AI'],
    description: 'A tank battle game with an autonomous opponent in dynamic maze environments. Implements tank movement and steering, collision detection, projectile physics, combat mechanics, score tracking, and automated respawns.',
    role: 'Technical project',
    detail: 'Built game systems for player and bot movement, collision handling, projectile behavior, score tracking, and respawn flow.',
    url: 'https://github.com/NTMT-hust/Tank_Game_with_AI_bot', search: 'autonomous opponent maze',
  },
];

export const experience = [
  {
    date: 'Aug 2026 — Present', title: 'Development Lead', place: 'HUST Digital Youth Club',
    description: 'Lead development of an activity management hub for planning, task assignment, progress tracking, and team collaboration. Coordinate workflows, shape system architecture, implement core features, and guide the team toward a scalable, maintainable platform.',
  },
  {
    date: 'Jul 2025 — Present', title: 'Research Assistant', place: 'Bioinformatics Lab, BKAI · HUST',
    description: 'Develop machine learning and deep learning models for multi-omics cancer subtype classification, biomarker discovery, and medical image analysis. Design preprocessing and training pipelines, run experiments, evaluate performance, and apply explainable AI to support biological interpretation and precision medicine research.',
  },
  {
    date: 'IT1140 · LT + BT', title: 'Teaching Assistant', place: 'Hanoi University of Science and Technology (HUST)',
    description: 'Support the Introduction to Informatics course, assisting with lecture and practical class sessions.',
  },
  {
    date: 'May 2023 — Sep 2025', title: 'Student Research Member', place: 'Center for Materials Science · VNU University of Science',
    description: 'Conducted measurements, calculated physical parameters, and documented results for fluorescent magnetic microsphere research in virus detection.',
  },
];

export const education = [
  { title: 'B.S. in Data Science and Artificial Intelligence', school: 'School of Information and Communication Technology · Hanoi University of Science and Technology · English-taught program', date: '2024 — 2028', detail: 'GPA 3.55 / 4.0 ' },
  { title: 'High School Diploma, Physics Specialization', school: 'HUS High School for Gifted Students, VNU', date: 'Sep 2021 — May 2024', detail: 'Grade 9.9 / 10.0' },
  { title: 'IELTS', school: 'English language certificate · Overall band 6.5', date: 'Dec 2023', detail: '' },
];

export const honors = [
  { title: 'Silver Medal', detail: 'Vietnam National Physics Olympiad', date: '2024' },
  { title: 'Top 9', detail: 'Vietnam National Physics Team Selection Test', date: '2024' },
];

export const skillGroups = [
  { title: 'AI & machine learning', skills: 'PyTorch, PyTorch Geometric, scikit-learn, CNNs, GNNs, Transformers, deep learning, model evaluation, representation learning' },
  { title: 'Vision & interpretability', skills: 'OpenCV, YOLO, image processing, Grad-CAM, biomedical computer vision' },
  { title: 'Programming & data', skills: 'Python, C/C++, Java, R, SQL, MySQL, NumPy, Pandas, SciPy, data processing' },
  { title: 'Leadership & optimization', skills: 'Technical leadership, team coordination, task management, code review, constraint optimization, local search, Q-Learning' },
  { title: 'Backend & databases', skills: 'FastAPI, REST APIs, PostgreSQL, MySQL, database design, authentication' },
  { title: 'DevOps & engineering', skills: 'Git, GitHub, Docker, Linux, CI/CD, software architecture, software development lifecycle' },
];

export const files = [
  { id: 'about', label: 'README.md', ext: 'MD' },
  { id: 'experience', label: 'experience.md', ext: 'MD' },
  { id: 'projects', label: 'projects.tsx', ext: 'TSX' },
  { id: 'education', label: 'education.md', ext: 'MD' },
  { id: 'skills', label: 'skills.json', ext: '{}' },
  { id: 'contact', label: 'contact.md', ext: 'MD' },
];
