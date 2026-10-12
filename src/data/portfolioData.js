/**
 * ALL portfolio content lives in this one object.
 * Edit text here and every section updates automatically.
 *
 * Values wrapped in [SQUARE BRACKETS] are placeholders for details that
 * were not in the CV. Replace them with real values when you have them.
 * Placeholder links are never rendered as broken links on the site.
 */
const portfolioData = {
  personal: {
    name: 'Suraj N',
    initials: 'SN',
    title: 'Frontend Developer (React.js)',
    // Rotating text for the hero typing effect
    roles: [
      'Frontend Developer',
      'React.js Developer',
      'Responsive UI Builder',
      'REST API Integrator',
    ],
    tagline:
      'I build responsive, component-based React interfaces and connect them to REST APIs that respond faster.',
    availability: 'Open to frontend developer roles',
    // Four short labels that float around the hero monogram
    heroHighlights: ['React.js', 'JavaScript (ES6+)', 'Node.js', 'REST APIs'],
    // Character shown in the middle of the hero frame. Put the image in /public
    // (a square PNG with a transparent background works best) and set its path,
    // e.g. '/character.png'. Until then the initials are shown instead.
    character: '/character.png',
    // Lines the character says: shown in its speech bubble, and read aloud
    // when a visitor presses the "Hear my intro" button
    introLines: [
      "Hi, I'm Suraj!",
      "I'm a Frontend Developer based in Bengaluru.",
      'I build responsive interfaces with React.js.',
      "I've completed 2 internships and 4 independent projects.",
      'Take a look at my work below.',
    ],
    location: 'Bengaluru, Karnataka',
    email: 'surajnr2001@gmail.com',
    phone: '9611808850',
    phoneHref: 'tel:+919611808850',
    // File inside /public. Swap for a PDF export of your CV if you prefer.
    cvFile: '/Suraj_N_CV.docx',
    cvDownloadName: 'Suraj_N_CV.docx',
    // Put a photo in /public (e.g. /suraj.jpg) and set its path here.
    photo: '/suraj.png',
    spokenLanguages: ['English (Native Proficiency)', 'Kannada (Fluent)'],
  },

  social: [
    { label: 'LinkedIn', icon: 'linkedin', url: 'https://linkedin.com/in/suraj-n-1114141a3' },
    { label: 'GitHub', icon: 'github', url: 'https://github.com/suraj-nr-dev' },
  ],

  about: {
    paragraphs: [
      "I'm a Frontend Developer with 6 months of combined internship experience building responsive, component-based web interfaces using React.js, JavaScript, HTML5, and CSS3, plus 4 independent full-stack and front-end projects.",
      'I work across REST API integration, JWT authentication, Node.js/Express back ends, and Git-based version control, shipping cross-browser UIs within Agile, project-based teams. Through front-end/back-end integration work, I reduced API response time by 30%.',
      "Right now I'm deepening my TypeScript and Redux/Context API skills through self-paced study to complement a strong React.js foundation.",
    ],
    // Numbers are taken exactly from the CV
    stats: [
      { value: 6, decimals: 0, suffix: '', label: 'Months of internship experience' },
      { value: 4, decimals: 0, suffix: '', label: 'Independent projects built' },
      { value: 30, decimals: 0, suffix: '%', label: 'Reduction in API response time' },
      { value: 9.19, decimals: 2, suffix: '', label: 'MCA CGPA out of 10.00' },
    ],
  },

  skills: [
    {
      title: 'Core',
      note: 'What I build with every day',
      icon: 'code',
      items: [
        'JavaScript (ES6+)',
        'React.js',
        'React Router',
        'Vite',
        'HTML5',
        'CSS3',
        'Responsive Web Design',
        'Bootstrap',
      ],
    },
    {
      title: 'Currently Learning',
      note: 'Actively building proficiency',
      icon: 'zap',
      items: ['TypeScript', 'Redux', 'React Context API'],
    },
    {
      title: 'Integration & Tools',
      note: 'APIs, back end, and data',
      icon: 'layers',
      items: [
        'REST API Integration',
        'Node.js',
        'Express.js',
        'JWT Authentication',
        'Git',
        'GitHub',
        'Firebase',
        'MySQL',
        'DBMS',
      ],
    },
    {
      title: 'Practices & Soft Skills',
      note: 'How I work with a team',
      icon: 'users',
      items: [
        'Agile/Scrum-style delivery',
        'Cross-browser compatibility',
        'Client-side validation',
        'Debugging',
        'Team collaboration',
        'Time management',
        'Leadership',
      ],
    },
    {
      title: 'Programming Languages',
      note: 'Beyond JavaScript',
      icon: 'terminal',
      items: ['Java', 'Python', 'PHP'],
    },
  ],

  experience: [
    {
      role: 'Web Development Intern (Virtual)',
      company: 'PAT Technologies Pvt. Ltd. (Edutainer)',
      period: 'Feb 2026 - May 2026',
      duration: '4 months',
      points: [
        'Completed a 4-month structured virtual training program, delivering 100% of assigned front-end modules on schedule using HTML, CSS, JavaScript, and React.js.',
        'Built multiple responsive, reusable UI components across program assignments, collaborating with mentors and peers in a project-based, Agile-style curriculum.',
        'Strengthened debugging, problem-solving, and communication skills through applied, real-time use of modern front-end technologies.',
      ],
    },
    {
      role: 'Full-Stack Web Developer Intern',
      company: 'Inventeron Technologies',
      period: 'Apr 2024 - May 2024',
      duration: '2 months',
      points: [
        'Completed a 2-month full-stack internship building responsive, component-based UIs with HTML, CSS, JavaScript, and Bootstrap, focusing on clean layout and consistent cross-browser rendering.',
        'Integrated front-end interfaces with REST APIs and Firebase/MySQL databases, reducing API response time by 30% and improving data synchronization and application reliability.',
        'Used Git for version control and collaborated with peers to ship features within a full-stack development workflow.',
      ],
    },
  ],

  projects: [
    {
      title: 'WhatsApp WABA Panel',
      featured: true,
      description:
        'A WhatsApp Business (WABA) campaign panel with a React 19 + Vite front end, plain CSS, and a Node.js/Express 5 REST API.',
      highlights: [
        'Implemented JWT authentication with bcrypt password hashing, protected routes, and token-expiry handling.',
        'Developed a dashboard (consumption cards, day-wise bar chart) and a two-step push campaign form with template selection, audience targeting, media upload, scheduling, and a live message preview.',
        'Added in-browser Excel (.xlsx) parsing to auto-detect mobile number columns from uploaded files.',
      ],
      tech: ['React 19', 'Vite', 'Node.js', 'Express', 'JWT'],
      links: { github: '[ADD GITHUB REPO URL]', live: '[ADD LIVE DEMO URL]' },
    },
    {
      title: 'Smart AI Resume Analyzer',
      description:
        'A resume analyzer that uses NLP to parse resumes, extract skills, score candidate profiles, and recommend suitable job roles through a Streamlit interface.',
      highlights: [],
      tech: ['Python', 'NLP', 'Streamlit'],
      links: { github: '[ADD GITHUB REPO URL]', live: '[ADD LIVE DEMO URL]' },
    },
    {
      title: 'Learning Language by Quiz',
      description:
        'An interactive language-learning platform featuring adaptive quizzes, real-time feedback, performance tracking, and separate user/admin modules.',
      highlights: [],
      tech: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
      links: { github: '[ADD GITHUB REPO URL]', live: '[ADD LIVE DEMO URL]' },
    },
    {
      title: 'Personal Portfolio Website',
      description:
        'A responsive personal portfolio website with dynamic resume downloads from a database, a project/skill showcase, and a working contact form.',
      highlights: [],
      tech: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'PHP'],
      links: { github: '[ADD GITHUB REPO URL]', live: '[ADD LIVE DEMO URL]' },
    },
  ],

  education: [
    {
      degree: 'Master of Computer Applications',
      school: 'Sri Venkateshwara College of Engineering',
      year: '2026',
      score: 'CGPA: 9.19/10.00',
    },
    {
      degree: 'Bachelor of Computer Applications',
      school: 'Bishop Cotton Academy of Professional Management',
      year: '2024',
      score: 'CGPA: 8.3/10.00',
    },
  ],

  coursework: [
    'Object-Oriented Programming',
    'Database Management Systems (DBMS)',
    'Web Technologies',
    'Software Engineering',
    'Cloud Computing',
  ],

  certifications: [
    { name: 'Cloud Computing', issuer: 'VTU, Belagavi' },
    { name: 'Full-Stack Web Development', issuer: 'Inventeron Technologies' },
    { name: 'Front-End Development Foundation', issuer: 'Infosys Springboard' },
    { name: 'Python Foundation Certificate', issuer: '' },
    { name: 'IoT Workshop', issuer: '' },
  ],

  leadership: [
    {
      title: 'Media Team Lead, MCA Dept.',
      org: 'Sri Venkateshwara College of Engineering',
      period: '2024 - 2025',
      description:
        'Directed social media strategy and event-promotion campaigns, driving audience engagement.',
    },
    {
      title: 'Participant, Microsoft Industrial Visit',
      org: '',
      period: 'Feb 2025',
      description: 'Engaged with industry professionals on corporate technology practices.',
    },
  ],

  contact: {
    heading: "Let's build something together",
    text: "I'm looking for a frontend developer role where I can ship clean, responsive React interfaces. Send me a message and I'll get back to you.",
  },

  // Section links shown in the navbar and footer (ids must match the sections)
  nav: [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' },
  ],

  // JavaScript-driven animation timings, in milliseconds.
  // CSS-driven timings live in src/styles/global.css (--speed-* variables).
  animation: {
    loaderHold: 1200, // how long the intro screen stays up
    loaderExit: 500, // intro fade-out (hold + exit stays under 2 seconds)
    typeSpeed: 70, // per character typed
    deleteSpeed: 38, // per character deleted
    typePause: 1600, // pause on a finished word
    countUpDuration: 1600, // stats count-up
    staggerStep: 90, // delay between staggered reveal items
    introInterval: 3200, // how long each speech-bubble line stays up
    speechRate: 1, // voice speed for the spoken intro (0.5 slow, 2 fast)
  },
};

export default portfolioData;
