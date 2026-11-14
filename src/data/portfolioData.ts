export interface DocumentationArtifact {
  id: string;
  title: string;
  caption: string;
  date: string;
  imageUrl?: string;
  externalUrl?: string;
}

export interface WorkDocumentationItem {
  id: string;
  title: string;
  category: 'Technical & Code' | 'Design & UX' | 'Event & Media' | 'Coursework & Research';
  date: string;
  projectOrOrg: string;
  summary: string;
  highlights: string[];
  imageUrl?: string;
  externalUrl?: string;
  isCustom?: boolean;
}

export interface ProjectCaseStudy {
  id: string;
  title: string;
  category: string;
  type: 'Software & Java' | 'Web & UI' | 'Data Science & AI';
  status: 'In Progress' | 'Published' | 'Exploring' | 'Completed';
  subtitle: string;
  goal: string;
  userRole: string;
  tools: string[];
  features: string[];
  outcome: string;
  lessonsLearned: string[];
  repoUrl?: string;
  liveUrl?: string;
  demoType?: 'java-cli' | 'framer-embed' | 'interactive-tool' | 'notebook';
  codeSnippet?: {
    language: string;
    filename: string;
    code: string;
  };
  plannedImprovements?: string[];
  metrics?: { label: string; value: string }[];
  documentation?: DocumentationArtifact[];
}

export interface CreativeWorkItem {
  id: string;
  title: string;
  category: 'Event & Organization' | 'Cinematography' | 'Travel & Street' | 'Editorial & Portrait';
  year: string;
  role: string;
  collaborators?: string;
  tools: string[];
  awardOrRecognition?: string;
  description: string;
  exif: {
    camera: string;
    lens: string;
    settings: string;
  };
  aspectRatio: '16:9' | '4:3' | '3:4';
  palette: string[]; // For visual accent accents
}

export const PAST_WORK_DOCUMENTATION: WorkDocumentationItem[] = [
  {
    id: 'doc-java-oop-refactor',
    title: 'OOP Encapsulation & Inventory Valuation Refactor Log',
    category: 'Technical & Code',
    date: '2025',
    projectOrOrg: 'Product Manager System (Java)',
    summary: 'Technical documentation outlining the transition from procedural Scanner variables to an encapsulated Product class with defensive validation and dynamic discount calculation.',
    highlights: [
      'Isolated private fields (name, price, stockQuantity) behind validated setters',
      'Prevented negative inventory or pricing corruption via IllegalArgumentException guards',
      'Documented ArrayList<Product> migration path for multi-SKU CRUD operations'
    ]
  },
  {
    id: 'doc-tedx-web-ia',
    title: 'TEDxSISC Youth Site Architecture & Responsive Layout Notes',
    category: 'Design & UX',
    date: '2024',
    projectOrOrg: 'TEDxSISC Youth',
    summary: 'Design documentation detailing the sitemap hierarchy, mobile conference-day navigation flow, speaker bio layout, and venue guide shipped in Framer.',
    highlights: [
      'Prioritized venue location, event schedule, and speaker roster above secondary sections',
      'Verified mobile breakpoint legibility for attendees checking schedules on-site',
      'Published live responsive site without custom backend overhead'
    ],
    externalUrl: 'https://tedxsisc.framer.website/'
  },
  {
    id: 'doc-tedx-stage-media',
    title: 'Keynote Stage Lighting & Live Event Coverage Runbook',
    category: 'Event & Media',
    date: '2024',
    projectOrOrg: 'TEDxSISC Media Team',
    summary: 'Field production documentation covering camera settings, lens selection for theatrical spotlights, and rapid Lightroom culling workflows for same-day event highlights.',
    highlights: [
      'Balanced fast shutter speeds (1/320s) against dynamic stage projection backdrops',
      'Delivered curated press and social highlight stills within 24 hours of conference wrap',
      'Coordinated shot lists with organizing committee and speaker stage managers'
    ]
  },
  {
    id: 'doc-gci-eda-notes',
    title: 'Consumer Dataset Cleaning & EDA Methodology Notes',
    category: 'Coursework & Research',
    date: '2024 - 2025',
    projectOrOrg: 'Matsuo Labs GCI Program',
    summary: 'Structured Python notebook notes documenting missing-value handling, summary distribution metrics, and baseline model evaluation steps from GCI coursework.',
    highlights: [
      'Standardized tabular null-handling checks prior to statistical aggregation',
      'Generated clear distribution charts in Matplotlib/Seaborn to communicate findings',
      'Logged feature engineering experiments and accuracy trade-offs across baseline models'
    ]
  }
];

export const PORTFOLIO_PROJECTS: ProjectCaseStudy[] = [
  {
    id: 'product-manager-system',
    title: 'Product Manager System',
    category: 'Java · OOP · Command-Line Application',
    type: 'Software & Java',
    status: 'In Progress',
    subtitle: 'A Java inventory prototype developed to practice object-oriented programming fundamentals, dynamic discount algorithms, and inventory valuation.',
    goal: 'Build an extensible command-line inventory management engine to practice fundamental OOP principles (classes, objects, encapsulation, methods) and test algorithmic calculations for commerce systems.',
    userRole: 'Solo Developer — Architecture, OOP Design, Business Logic, and CLI Interface',
    tools: ['Java 21', 'Object-Oriented Programming (OOP)', 'Scanner CLI', 'Encapsulation', 'JUnit Testing'],
    features: [
      'Encapsulated Product class model with private attributes (name, price, stockQuantity)',
      'Dynamic inventory valuation calculation (price * quantity)',
      'Dynamic discount processing with threshold rule validation',
      'Robust terminal Scanner input loop with formatted tabular reporting',
      'Defensive input validation for non-negative quantities and numeric bounds'
    ],
    plannedImprovements: [
      'Support multiple products dynamically using ArrayList<Product>',
      'Assign unique UUID or sequential product IDs',
      'Full CRUD operations (Create, View, Search, Update, Delete)',
      'Stock-in and Stock-out operations with low-inventory automated threshold warnings',
      'File persistence: serialize and deserialize catalogue to text/CSV format',
      'Develop lightweight graphical or web interface in future release'
    ],
    outcome: 'Solidified core Java fundamentals and object modeling principles. Successfully demonstrated how clean encapsulation makes data mutations predictable and safe.',
    lessonsLearned: [
      'Why separation of concerns between data model (Product) and presentation (CLI Runner) prevents messy spaghetti code.',
      'How encapsulation prevents corrupted object state by validating price and quantity through explicit setter constraints.',
      'The importance of architecting models that can scale from a single prototype to an ArrayList collection without rewriting business calculations.'
    ],
    repoUrl: 'https://github.com/djgutierrez-it/java-product-manager',
    demoType: 'java-cli',
    codeSnippet: {
      language: 'java',
      filename: 'Product.java',
      code: `public class Product {
    private String name;
    private double price;
    private int stockQuantity;

    // Parameterized constructor
    public Product(String name, double price, int stockQuantity) {
        this.name = name;
        this.setPrice(price);
        this.setStockQuantity(stockQuantity);
    }

    // Dynamic valuation
    public double calculateTotalValue() {
        return this.price * this.stockQuantity;
    }

    // Dynamic discount logic
    public double applyDiscount(double percentage) {
        if (percentage < 0 || percentage > 100) {
            throw new IllegalArgumentException("Invalid percentage: " + percentage);
        }
        double discountAmount = this.price * (percentage / 100.0);
        return this.price - discountAmount;
    }

    // Encapsulated setters with defensive bounds checking
    public void setPrice(double price) {
        if (price < 0) throw new IllegalArgumentException("Price cannot be negative");
        this.price = price;
    }

    public void setStockQuantity(int qty) {
        if (qty < 0) throw new IllegalArgumentException("Stock cannot be negative");
        this.stockQuantity = qty;
    }
}`
    },
    metrics: [
      { label: 'Language', value: 'Java 21' },
      { label: 'Architecture', value: 'Encapsulated OOP' },
      { label: 'Calculations', value: 'Real-time Valuation' }
    ]
  },
  {
    id: 'tedx-sisc-youth',
    title: 'TEDxSISC Youth Website',
    category: 'Web Design · UX/UI · Event Communication',
    type: 'Web & UI',
    status: 'Published',
    subtitle: 'Designed and published a responsive event website using Framer to communicate the TEDxSISC Youth experience, organize essential event information, and help visitors understand the event and find its location.',
    goal: 'Create an engaging, mobile-optimized digital hub for TEDxSISC Youth that presents the keynote theme, organizes the speaker roster, provides venue navigation, and drives attendee registration without requiring heavy backend maintenance.',
    userRole: 'UI/UX Designer & Framer Developer — Information Architecture, Layout Design, Typography, Interactive Prototyping, and Production Deployment',
    tools: ['Framer', 'UI/UX Design', 'Information Architecture', 'Responsive Layout', 'Design Systems', 'Figma'],
    features: [
      'High-impact hero section establishing the conference theme with strict TEDx branding guidelines',
      'Curated speaker roster with expandable biographies and talk summaries',
      'Event schedule breakdown with timestamped tracks and venue milestones',
      'Interactive location & venue navigation guide to help guests reach the hall effortlessly',
      'Fully responsive breakpoints tailored for mobile attendees navigating on conference day',
      'Production deployment on Framer custom domain'
    ],
    outcome: 'Successfully launched to hundreds of prospective student attendees and guests, providing an accessible single source of truth for the entire event lifecycle.',
    lessonsLearned: [
      'Event websites require ruthlessly clear hierarchy: attendees need dates, venue location, and speakers within 5 seconds of landing.',
      'No-code / Framer systems shine when rapid iteration and visual polish are needed under tight production deadlines, while staying true to design principles.',
      'Visual storytelling (typography scale, whitespace, contrast) bridges the gap between raw information and emotional attendee excitement.'
    ],
    liveUrl: 'https://tedxsisc.framer.website/',
    demoType: 'framer-embed',
    metrics: [
      { label: 'Platform', value: 'Framer Published' },
      { label: 'Performance', value: '100% Mobile Ready' },
      { label: 'Domain', value: 'Live Production' }
    ]
  },
  {
    id: 'data-science-ai-matsuo',
    title: 'Data Science & AI Learning (Matsuo Labs GCI)',
    category: 'Python · Exploratory Data Analysis · Machine Learning',
    type: 'Data Science & AI',
    status: 'Exploring',
    subtitle: 'Exploratory data analysis notebooks, statistical visualizations, and foundational machine learning experiments developed through the Matsuo Labs GCI program.',
    goal: 'Build deep foundational knowledge in Python data science libraries (NumPy, Pandas, Matplotlib, Seaborn) and understand practical AI modeling pipelines through the prestigious Matsuo Labs Global Consumer Intelligence course.',
    userRole: 'Student Researcher & Practitioner — Data Cleaning, Visualizations, Model Benchmarks, and Documentation',
    tools: ['Python 3', 'Pandas', 'NumPy', 'Matplotlib & Seaborn', 'Scikit-Learn', 'Jupyter', 'GCI Coursework'],
    features: [
      'Exploratory Data Analysis (EDA) on structured consumer datasets to uncover behavioral trends',
      'Data cleaning pipelines addressing missing attributes, normalization, and outlier detection',
      'Supervised learning baseline evaluations using linear regression and decision trees',
      'Coursework and lectures from Matsuo Labs & The University of Tokyo on AI industry adoption'
    ],
    plannedImprovements: [
      'Deploy interactive Streamlit or web dashboard for real-time dataset exploration',
      'Implement deep learning experiments using PyTorch for image classification',
      'Package repeatable data transformation scripts as modular Python packages'
    ],
    outcome: 'Acquired strong analytical rigor in handling messy tabular data and interpreting statistical distributions rather than treating ML models as opaque black boxes.',
    lessonsLearned: [
      '80% of data science is understanding the domain, cleansing data, and feature engineering before touching any algorithms.',
      'Visual representations of data are only effective when they tell a coherent story that non-technical stakeholders can immediately grasp.'
    ],
    demoType: 'notebook',
    codeSnippet: {
      language: 'python',
      filename: 'eda_pipeline.py',
      code: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# Consumer behavior feature exploration
def analyze_consumer_patterns(df: pd.DataFrame) -> dict:
    cleaned_df = df.dropna(subset=['purchase_frequency', 'spend_amount'])
    
    # Calculate key segment metrics
    summary = {
        'total_records': len(cleaned_df),
        'mean_spend': float(cleaned_df['spend_amount'].mean()),
        'median_frequency': float(cleaned_df['purchase_frequency'].median()),
        'high_value_ratio': float((cleaned_df['spend_amount'] > 500).mean())
    }
    return summary`
    },
    metrics: [
      { label: 'Program', value: 'Matsuo Labs (Univ of Tokyo)' },
      { label: 'Duration', value: '3-Month Intensive' },
      { label: 'Toolchain', value: 'Python / Jupyter' }
    ]
  },
  {
    id: 'interactive-state-visualizer',
    title: 'Interactive Algorithm & Data Explorer',
    category: 'TypeScript · React · Frontend Architecture',
    type: 'Web & UI',
    status: 'Completed',
    subtitle: 'An interactive frontend sandbox demonstrating real-time array manipulation, state transitions, and clean algorithmic visualization.',
    goal: 'Demonstrate how modern web engineering patterns (TypeScript strict typing, immutable state, animated layout shifts) can turn abstract computational concepts into intuitive interactive UI.',
    userRole: 'Full-Stack Frontend Developer — Component Architecture, Interactive Engine, Performance Optimization',
    tools: ['React 19', 'TypeScript', 'Tailwind CSS', 'Motion', 'Vite'],
    features: [
      'Interactive array transformation and sorting step simulator',
      'Real-time state inspector showing immutable updates and time complexity',
      'Fluid micro-interactions with zero layout jitter and full keyboard accessibility',
      'Modular functional component hierarchy'
    ],
    outcome: 'Proved mastery of modern React component design patterns, strict TypeScript typing, and accessible user interaction standards.',
    lessonsLearned: [
      'Building pedagogical visual tools requires thinking deeply about mental models and cognitive load for the end user.',
      'Keeping state derivations pure and predictable simplifies debugging in complex interactive applications.'
    ],
    demoType: 'interactive-tool',
    repoUrl: 'https://github.com/djgutierrez-it',
    metrics: [
      { label: 'Stack', value: 'React + TypeScript' },
      { label: 'Bundle', value: 'Vite Optimized' },
      { label: 'Latency', value: '<16ms Render' }
    ]
  }
];

export const CREATIVE_WORKS: CreativeWorkItem[] = [
  {
    id: 'tedx-stage-coverage',
    title: 'TEDxSISC Youth Keynote & Stage Coverage',
    category: 'Event & Organization',
    year: '2024',
    role: 'Lead Event Photographer & Media Documenter',
    collaborators: 'TEDxSISC Organizing Committee',
    tools: ['Sony Alpha Camera', 'Adobe Lightroom Classic', 'Photoshop'],
    awardOrRecognition: 'Official Media Showcase',
    description: 'Captured high-impact stage moments, passionate speaker keynotes, and candid audience reactions during the live TEDx conference. Balanced challenging theatrical stage lighting with fast-paced speaker movement.',
    exif: {
      camera: 'Sony Alpha 7 IV',
      lens: 'FE 70-200mm f/2.8 GM OSS II',
      settings: '135mm · f/2.8 · 1/320s · ISO 1250'
    },
    aspectRatio: '4:3',
    palette: ['#e11d48', '#18181b', '#f43f5e']
  },
  {
    id: 'cinematic-motion-reel',
    title: 'Visual Rhythm: Creative Cinematography Reel',
    category: 'Cinematography',
    year: '2024',
    role: 'Cinematographer & Post-Production Editor',
    collaborators: 'Student Production Team',
    tools: ['Sony Alpha / Cinema Line', 'Adobe Premiere Pro', 'DaVinci Resolve', 'DJI Ronin Gimbal'],
    description: 'A curated short-form visual reel exploring human movement, atmospheric natural light, and pacing. Features custom color grading, sound design sync, and narrative tempo crafted for social and web delivery.',
    exif: {
      camera: 'Sony FX30 Cinema Camera',
      lens: 'Sigma 18-50mm f/2.8 DC DN',
      settings: '4K 60fps · S-Log3 / S-Gamut3.Cine · 180° Shutter'
    },
    aspectRatio: '16:9',
    palette: ['#3b82f6', '#09090b', '#60a5fa']
  },
  {
    id: 'ust-campus-moments',
    title: 'Venerable Grounds: UST Campus & Heritage',
    category: 'Travel & Street',
    year: '2023 - 2024',
    role: 'Street Photographer',
    tools: ['Sony Alpha', 'Adobe Lightroom'],
    description: 'Documenting the historic architecture, quadrangle afternoon light, and student life across the University of Santo Tomas campus. Highlights the timeless contrast between classical Spanish-era facades and modern university energy.',
    exif: {
      camera: 'Sony Alpha 7 III',
      lens: 'FE 35mm f/1.4 GM',
      settings: '35mm · f/2.0 · 1/800s · ISO 100'
    },
    aspectRatio: '4:3',
    palette: ['#f59e0b', '#18181b', '#d97706']
  },
  {
    id: 'editorial-portrait-series',
    title: 'Faces in Focus: Student Creative Portraits',
    category: 'Editorial & Portrait',
    year: '2024',
    role: 'Portrait Photographer & Lighting Director',
    tools: ['Off-Camera Softbox Flash', 'Adobe Lightroom', 'Photoshop'],
    description: 'An intimate portrait series highlighting young technologists, artists, and leaders. Utilized directional soft lighting and environmental framing to capture authentic character and professional poise.',
    exif: {
      camera: 'Sony Alpha 7 IV',
      lens: 'FE 85mm f/1.8',
      settings: '85mm · f/2.2 · 1/200s · ISO 200'
    },
    aspectRatio: '3:4',
    palette: ['#10b981', '#18181b', '#059669']
  },
  {
    id: 'org-summit-videography',
    title: 'Ignite & Connect: Student Tech Summit Aftermovie',
    category: 'Cinematography',
    year: '2024',
    role: 'Lead Videographer & Sound Designer',
    collaborators: 'Student Tech Council',
    tools: ['Sony FX30', 'DJI Mic Wireless', 'Premiere Pro', 'After Effects'],
    description: 'Dynamic aftermovie documenting a full-day student technology conference. Focused on quick-cut transitions, attendee networking, workshops, and high-energy sponsor showcase segments.',
    exif: {
      camera: 'Sony FX30',
      lens: 'Sony E 15mm f/1.4 G',
      settings: '4K 24fps · CineEI S-Log3 · Variable ND'
    },
    aspectRatio: '16:9',
    palette: ['#8b5cf6', '#18181b', '#a78bfa']
  },
  {
    id: 'manila-chiaroscuro',
    title: 'Shadows & Skylines: Manila Urban Exploration',
    category: 'Travel & Street',
    year: '2024',
    role: 'Solo Street Photographer',
    tools: ['35mm Prime', 'Adobe Lightroom Mobile & Desktop'],
    description: 'Exploring geometry, transit lines, and dramatic afternoon monsoons across Metro Manila. Captured through rich chiaroscuro shadows and warm golden highlights.',
    exif: {
      camera: 'Sony Alpha 7 III',
      lens: 'FE 35mm f/1.4 GM',
      settings: '35mm · f/4.0 · 1/1250s · ISO 400'
    },
    aspectRatio: '4:3',
    palette: ['#f97316', '#18181b', '#ea580c']
  }
];

export const TECHNICAL_SKILLS = [
  {
    category: 'Programming & Core Systems',
    skills: [
      { name: 'Java', level: 'Intermediate (OOP, Collections, Encapsulation)' },
      { name: 'Python', level: 'Intermediate (Data Analytics, Scripting, Automation)' },
      { name: 'TypeScript & JavaScript', level: 'Proficient (ESNext, Modern Async, Strict Typing)' },
      { name: 'Object-Oriented Programming', level: 'Strong grasp of encapsulation, inheritance, modularity' }
    ]
  },
  {
    category: 'Data Science & Artificial Intelligence',
    skills: [
      { name: 'Matsuo Labs GCI Course', level: 'University of Tokyo 3-month AI & Data Program' },
      { name: 'Pandas & NumPy', level: 'Tabular manipulation, cleaning, statistical aggregates' },
      { name: 'Matplotlib & Seaborn', level: 'Exploratory data visualization and statistical charting' },
      { name: 'ML Fundamentals', level: 'Supervised classification, regression, model metrics' }
    ]
  },
  {
    category: 'Web Development & Design',
    skills: [
      { name: 'React 19 & Next.js', level: 'Component-driven frontend, hooks, state design' },
      { name: 'Tailwind CSS', level: 'Modern responsive systems, typographic scales' },
      { name: 'Framer & Figma', level: 'Rapid responsive web publishing and high-fidelity UX prototyping' },
      { name: 'Git & Version Control', level: 'Branching, PRs, semantic commit history' }
    ]
  },
  {
    category: 'Creative Production & Media',
    skills: [
      { name: 'Adobe Premiere Pro', level: 'Video editing, multi-cam sync, pacing' },
      { name: 'DaVinci Resolve', level: 'Color grading, S-Log3 conversion, LUT management' },
      { name: 'Adobe Lightroom & Photoshop', level: 'RAW photo processing, color correction, composition' },
      { name: 'Live Event Production', level: 'Stage photography, live lighting adaptation, audio capture' }
    ]
  }
];

export const LEARNING_TIMELINE = [
  {
    year: 'Present',
    title: 'BS in Information Technology',
    institution: 'University of Santo Tomas (UST)',
    description: 'Pursuing core IT degree with focus on object-oriented programming, data structures, database management systems, and web architectures.'
  },
  {
    year: '2024 - 2025',
    title: 'Global Consumer Intelligence (GCI) Program',
    institution: 'Matsuo Labs & The University of Tokyo',
    description: 'Rigorous 3-month intensive course exploring real-world data science, machine learning models, exploratory data analysis with Python, and AI applications.'
  },
  {
    year: '2024',
    title: 'Lead Event Media & Web Designer',
    institution: 'TEDxSISC Youth',
    description: 'Designed and shipped the published event website via Framer; directed keynote stage documentation and live attendee photography.'
  }
];
