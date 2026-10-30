import { Project, SkillNode, JourneyMilestone, CrudItem, Testimonial } from '../types';

export const PERSONAL_INFO = {
  name: 'Lakshmi Kumari',
  title: 'Creative Full Stack Engineer & Systems Architect',
  subtitle: 'Bridging High-Concurrency MERN Platforms, PHP Backends & Relational / NoSQL Architecture',
  email: '760lakshmi@gmail.com',
  phone: '+91 7602369308',
  location: 'Kolkata / Remote Worldwide',
  status: 'Open for Senior Full Stack & Architectural Opportunities',
  github: 'https://github.com/760lakshmi-create',
  linkedin: 'https://www.linkedin.com/in/lakshmi-kumari-45b892343/',
  bio: `I engineer resilient, high-speed full-stack applications with an uncompromising focus on clean architecture, scalable database schemas, and pristine editorial user interfaces. Proficient across the entire modern Web stack — React, Node.js, Express, PHP, MongoDB, and MySQL — I build digital products that feel effortless to end users while delivering solid engineering under high concurrency.`,
  stats: [
    { label: 'Core Tech Stacks', value: 'MERN + PHP' },
    { label: 'Database Engines', value: 'MongoDB & MySQL' },
    { label: 'API Response Time', value: '< 45ms Avg' },
    { label: 'CRUD Reliability', value: '99.9% Uptime' },
  ],
};

export const PERSONAL_DATA = PERSONAL_INFO;

export const PROJECTS: Project[] = [
  {
    id: 'aura-ecommerce',
    title: 'AURA / Flipkart Next',
    subtitle: 'High-Concurrency Full-Stack E-Commerce Platform',
    category: 'MERN Stack & Real-Time Commerce',
    tagline: 'An enterprise-grade shopping ecosystem featuring instant multi-faceted filtering, reactive shopping cart state, real-time inventory management, and custom database sync.',
    year: '2026',
    featured: true,
    heroImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80',
    mockupImages: {
      desktop: 'https://images.unsplash.com/photo-1556742049-0a67e72153eb?auto=format&fit=crop&w=1200&q=80',
      mobile: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=600&q=80',
      tablet: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
      architecture: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    },
    overview: 'Aura is a bespoke implementation inspired by top-tier marketplace portals like Flipkart. Engineered with a React 19 frontend and Node.js/Express backend, it incorporates atomic state updates for shopping carts, MongoDB query optimizations with compound indexing, and PHP micro-services for legacy inventory synchronization.',
    clientTarget: 'E-Commerce Retailers & High-Traffic Marketplaces',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'PHP', 'Tailwind CSS', 'JWT Auth'],
    metrics: [
      { label: 'Sub-second Filter Latency', value: '18ms' },
      { label: 'Concurrent Database Reads', value: '10K/s' },
      { label: 'Cart State Synchronization', value: '100% Atomic' },
    ],
    architectureNodes: [
      { id: '1', label: 'React SPA Client', type: 'client', tech: 'React 19 + State Hooks', description: 'Optimistic UI rendering with instant cart feedback' },
      { id: '2', label: 'Express API Gateway', type: 'gateway', tech: 'Node.js + Express Router', description: 'JWT Validation, Rate Limiting, CORS & Middleware' },
      { id: '3', label: 'MongoDB Cluster', type: 'database', tech: 'Mongoose ORM + Indexing', description: 'Catalog items, user profiles, and order histories' },
      { id: '4', label: 'PHP Inventory Service', type: 'service', tech: 'PHP 8 + MySQL PDO', description: 'Legacy warehouse stock queries and relational audits' },
    ],
    codeComparison: {
      beforeTitle: 'Naive Monolithic Endpoint (Blocking DB Queries)',
      beforeCode: `// Slow sequential queries causing thread blocking
app.get('/api/products', async (req, res) => {
  const products = await Product.find({});
  for (let p of products) {
    p.stock = await StockService.check(p.id); // Blocking loop!
  }
  res.json(products);
});`,
      afterTitle: 'Optimized Scalable Pipeline (Aggregated & Cached)',
      afterCode: `// High-concurrency aggregation with indexed pipeline & Redis/PHP sync
export const getCatalog = async (req: Request, res: Response) => {
  const { category, minPrice, maxPrice, page = 1 } = req.query;
  const pipeline: PipelineStage[] = [
    { $match: { isPublished: true, price: { $gte: Number(minPrice || 0) } } },
    { $lookup: { from: 'reviews', localField: '_id', foreignField: 'productId', as: 'ratings' } },
    { $project: { name: 1, price: 1, stock: 1, avgRating: { $avg: '$ratings.stars' } } }
  ];
  const items = await Product.aggregate(pipeline).hint('category_price_idx');
  return res.status(200).json({ success: true, count: items.length, data: items });
};`,
      explanation: 'Replaced N+1 synchronous database calls with MongoDB aggregation pipelines indexed on category and price, reducing catalog load duration from 1,200ms to 24ms.',
    },
    features: [
      'Full CRUD Product Lifecycle Management (Create, Read, Update, Soft-Delete)',
      'Multi-tier Dynamic Category & Attribute Filtering Matrix',
      'Atomic Shopping Cart State Machine with Local & Server Persistent Sync',
      'Dual Authentication Gateway with JWT Access & Refresh Tokens',
      'Custom Admin Panel with Live Revenue Analytics and Stock Health Alerts',
    ],
    challenges: 'Ensuring seamless data synchronization between legacy MySQL stock records and MongoDB product catalogs without causing race conditions during flash sales.',
    solution: 'Designed an event-driven webhook channel in Node.js that consumes stock updates from the PHP/MySQL backend and updates MongoDB cache instantly.',
    githubUrl: 'https://github.com/760lakshmi-create',
    liveUrl: '#live-crud-lab',
    accentColor: '#5B132B',
  },
  {
    id: 'luxe-joaillerie',
    title: 'LUXE CRAFT / Haute Joaillerie',
    subtitle: 'Bespoke Luxury Jewelry Platform & Custom Catalog Engine',
    category: 'Full-Stack PHP & MERN Architecture',
    tagline: 'An editorial haute joaillerie experience designed for high-value custom jewelry commissions, material matrix filters, and interactive bespoke ring/gemstone builders.',
    year: '2026',
    featured: true,
    heroImage: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1400&q=80',
    mockupImages: {
      desktop: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=80',
      mobile: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80',
      tablet: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
      architecture: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=1200&q=80',
    },
    overview: 'Luxe Craft bridges high-fashion editorial visual storytelling with meticulous inventory backend precision. Built with a responsive React frontend, PHP backend services, and MySQL relational schemas to manage precious metals, gem carats, certification tracking, and bespoke client wishlists.',
    clientTarget: 'High-End Artisanal Jewelry Houses & Private Collectors',
    techStack: ['PHP 8', 'MySQL', 'React', 'Tailwind CSS', 'REST API', 'PDO Prepared Statements'],
    metrics: [
      { label: 'Relational Schema Integrity', value: '100% 3NF' },
      { label: 'Bespoke Combination Matrix', value: '1.2M Variants' },
      { label: 'Asset Load Optimization', value: '98/100 Lighthouse' },
    ],
    architectureNodes: [
      { id: '1', label: 'Editorial React Frontend', type: 'client', tech: 'React 19 + Motion', description: 'Smooth fluid image sliders, zoom lenses, and bespoke gemstone builders' },
      { id: '2', label: 'PHP REST API Layer', type: 'service', tech: 'PHP OOP + Router', description: 'Clean OOP controllers with strict parameter sanitization and CORS headers' },
      { id: '3', label: 'MySQL Relational Engine', type: 'database', tech: 'MySQL 8 + InnoDB', description: 'Foreign key constraint tables for diamonds, metals, carats, and pricing matrices' },
    ],
    codeComparison: {
      beforeTitle: 'Basic Vulnerable SQL Query',
      beforeCode: `// Unsafe direct query string concatenation
$category = $_GET['cat'];
$result = mysqli_query($conn, "SELECT * FROM products WHERE category = '$category'");`,
      afterTitle: 'Secure PHP Prepared Statement PDO Controller',
      afterCode: `// Prepared Statement with strict data type binding and JSON formatting
public function getJewelryCatalog(int $categoryId, float $minCarat): array {
    $sql = "SELECT j.id, j.title, j.carat, j.price_usd, m.metal_type, g.cut_grade 
            FROM jewelry_items j
            INNER JOIN metals m ON j.metal_id = m.id
            INNER JOIN gemstones g ON j.gemstone_id = g.id
            WHERE j.category_id = :cat_id AND j.carat >= :carat AND j.is_available = 1
            ORDER BY j.price_usd DESC";
    $stmt = $this->pdo->prepare($sql);
    $stmt->execute(['cat_id' => $categoryId, 'carat' => $minCarat]);
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}`,
      explanation: 'Implemented strict PDO parameter binding preventing SQL injection attacks while optimizing JOIN queries across jewelry attributes.',
    },
    features: [
      'Interactive Custom Gemstone & Metal Combination Preview Matrix',
      'Relational MySQL Schema for Certified Diamond Weight & Clarity Tracking',
      'Wishlist State Machine with LocalStorage and MySQL Persistent Sync',
      'High-Resolution Image Lazy Loading with Blurred Canvas Blurhash Placeholders',
      'Bespoke Appointment Booking & Inquiry Request Pipeline',
    ],
    challenges: 'Handling complex relational queries across 6 joined tables (Metals, Gemstones, Cuts, Certifications, Categories, Artisans) while maintaining ultra-fast load times.',
    solution: 'Normalized database into 3NF, indexed primary join keys, and cached computed jewelry combinations in memory.',
    githubUrl: 'https://github.com/760lakshmi-create',
    liveUrl: '#live-crud-lab',
    accentColor: '#C5A0A6',
  },
  {
    id: 'nexus-api-gateway',
    title: 'NEXUS / Unified API Gateway',
    subtitle: 'Hybrid MERN & PHP Microservices Bridge',
    category: 'Backend Architecture & API Infrastructure',
    tagline: 'A robust API middleware orchestrator connecting modern Node.js/Express GraphQL/REST microservices with relational MySQL PHP legacy endpoints.',
    year: '2026',
    featured: false,
    heroImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1400&q=80',
    mockupImages: {
      desktop: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
      mobile: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
      tablet: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      architecture: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80',
    },
    overview: 'Nexus serves as the central neural network for multi-service web ecosystems. It handles JWT authentication token refresh loops, rate-limiting headers, standardized error formatting, and dual-database operations.',
    clientTarget: 'Enterprise Full-Stack Web Services & Hybrid Systems',
    techStack: ['Node.js', 'Express', 'PHP', 'MongoDB', 'MySQL', 'JWT', 'REST'],
    metrics: [
      { label: 'Token Verification Time', value: '2ms' },
      { label: 'Throughput', value: '15,000 req/min' },
      { label: 'Security Grade', value: 'A+ OWASP' },
    ],
    architectureNodes: [
      { id: '1', label: 'HTTP / HTTPS Ingress', type: 'gateway', tech: 'Express Middleware', description: 'CORS, Helmet security headers, and rate limiting' },
      { id: '2', label: 'MongoDB Session Store', type: 'database', tech: 'MongoDB', description: 'Token blacklists, user session states, and audit logs' },
      { id: '3', label: 'MySQL Relational DB', type: 'database', tech: 'MySQL PDO', description: 'User roles, permissions, and audit logs' },
    ],
    codeComparison: {
      beforeTitle: 'Unprotected Request Processing',
      beforeCode: `app.post('/api/user/update', (req, res) => {
  db.query('UPDATE users SET email="' + req.body.email + '"');
  res.send('Updated');
});`,
      afterTitle: 'Secured Express Middleware with Auth & Validation',
      afterCode: `import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const verifyJwt = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, error: 'Access token missing' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ success: false, error: 'Token expired or invalid' });
  }
};`,
      explanation: 'Implemented strict bearer token validation with early escape return guards and typed request extensions.',
    },
    features: [
      'Centralized Bearer Token Authentication & Refresh Middleware',
      'Dual Database Persistence (MongoDB for Document Caching, MySQL for Relational Security)',
      'Rate Limiting & Threat Protection Header Injection',
      'Swagger / OpenAPI Automated Endpoint Specification Generator',
    ],
    challenges: 'Handling authentication state consistently across Node.js microservices and legacy PHP backend routes.',
    solution: 'Standardized JWT verification keys and cryptographic signing mechanisms across both JavaScript and PHP runtimes.',
    githubUrl: 'https://github.com/760lakshmi-create',
    liveUrl: '#contact',
    accentColor: '#E0B0B7',
  },
  {
    id: 'velocity-frontend-ui',
    title: 'VELOCITY / Editorial UI System & Analytics Dashboard',
    subtitle: 'High-Performance Frontend React & Tailwind Component Suite',
    category: 'Frontend UI & React',
    tagline: 'A sleek, accessible frontend dashboard & design system featuring motion-driven transitions, responsive layout architecture, micro-interactions, and dark/light editorial themes.',
    year: '2026',
    featured: true,
    heroImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80',
    mockupImages: {
      desktop: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
      mobile: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=600&q=80',
      tablet: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      architecture: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    },
    overview: 'Velocity is a pure frontend React showcase crafted for ultra-fast rendering, fluid Framer Motion animations, custom SVG charts, and interactive component state. Built with TypeScript, Tailwind CSS v4, and Lucide icons without requiring complex backend servers.',
    clientTarget: 'SaaS Platforms & Modern Web Applications',
    techStack: ['React 19', 'TypeScript', 'Tailwind CSS', 'Motion', 'Recharts', 'Lucide Icons'],
    metrics: [
      { label: 'Lighthouse Performance Score', value: '100/100' },
      { label: 'Animation Frame Rate', value: '60 FPS Smooth' },
      { label: 'First Contentful Paint', value: '0.2s' },
    ],
    architectureNodes: [
      { id: '1', label: 'React 19 SPA', type: 'client', tech: 'React 19 + TypeScript', description: 'Modular component architecture with custom state hooks' },
      { id: '2', label: 'Tailwind Design System', type: 'service', tech: 'Tailwind CSS + CSS Variables', description: 'Fluid typography scale, grid layouts, and geometric spacing' },
      { id: '3', label: 'Motion Engine', type: 'client', tech: 'motion/react', description: 'Layout animations, gesture feedback, and smooth page transitions' },
    ],
    codeComparison: {
      beforeTitle: 'Bloated Unoptimized Component',
      beforeCode: `// Heavy re-renders and inline unstyled elements
function Dashboard({ data }) {
  return <div>{data.map(i => <div style={{margin:10}}>{i.title}</div>)}</div>;
}`,
      afterTitle: 'Clean Typed React Component with Memoization & Motion',
      afterCode: `import React, { useMemo } from 'react';
import { motion } from 'motion/react';

interface MetricProps { title: string; value: string | number; change: string; }

export const MetricCard: React.FC<MetricProps> = React.memo(({ title, value, change }) => {
  const isPositive = useMemo(() => change.startsWith('+'), [change]);
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="p-5 bg-[#FAF9F6] border border-[#0A0A0A]/15 rounded-xl flex flex-col justify-between"
    >
      <span className="text-xs font-mono-code uppercase text-[#0A0A0A]/60">{title}</span>
      <div className="flex items-baseline justify-between mt-2">
        <span className="text-2xl font-serif-editorial font-bold">{value}</span>
        <span className={\`text-xs font-mono-code \${isPositive ? 'text-emerald-700' : 'text-rose-700'}\`}>
          {change}
        </span>
      </div>
    </motion.div>
  );
});`,
      explanation: 'Utilizes React memoization, typed prop contracts, and GPU-accelerated motion transforms for responsive, jank-free 60FPS UI rendering.',
    },
    features: [
      'Modular Component System with Reusable Micro-Interactions',
      'Dynamic Dark/Light Editorial Theme Switcher',
      'Interactive Data Visualizations & Custom Responsive Charts',
      'Accessibility Compliant WCAG AA Color Contrast Ratios',
      'Zero-Latency Client-Side Filtering & Search Controls',
    ],
    challenges: 'Achieving complex interactive animations across multiple widgets while keeping bundle size minimal and avoiding layout shifts.',
    solution: 'Engineered lightweight CSS custom properties and leverage CSS grid with motion/react layout animations for 60fps smoothness.',
    githubUrl: 'https://github.com/760lakshmi-create',
    liveUrl: '#projects',
    accentColor: '#601212',
  },
];

export const SKILL_NODES: SkillNode[] = [
  {
    id: 'react',
    name: 'React 19',
    category: 'frontend',
    level: 95,
    experienceYears: '2+ Yrs',
    iconName: 'Code2',
    description: 'Component architecture, custom hooks, context state management, server components, and performance memoization.',
    relatedIds: ['node', 'express', 'tailwind', 'typescript'],
    orbitRadius: 110,
    speed: 0.8,
    color: '#E0B0B7',
  },
  {
    id: 'node',
    name: 'Node.js',
    category: 'backend',
    level: 90,
    experienceYears: '2+ Yrs',
    iconName: 'Server',
    description: 'Event-driven asynchronous architecture, RESTful API design, stream processing, and NPM package ecosystem.',
    relatedIds: ['express', 'mongodb', 'react'],
    orbitRadius: 180,
    speed: 0.6,
    color: '#C5A0A6',
  },
  {
    id: 'express',
    name: 'Express.js',
    category: 'backend',
    level: 92,
    experienceYears: '2+ Yrs',
    iconName: 'Cpu',
    description: 'Middleware pipelines, routing, JWT auth, input validation, rate limiting, and error handling.',
    relatedIds: ['node', 'mongodb', 'jwt'],
    orbitRadius: 240,
    speed: 0.5,
    color: '#832040',
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'database',
    level: 90,
    experienceYears: '2+ Yrs',
    iconName: 'Database',
    description: 'BSON document modeling, Mongoose schemas, compound indexes, aggregation pipelines, and CRUD performance.',
    relatedIds: ['express', 'node', 'react'],
    orbitRadius: 290,
    speed: 0.4,
    color: '#5B132B',
  },
  {
    id: 'mysql',
    name: 'MySQL',
    category: 'database',
    level: 88,
    experienceYears: '2+ Yrs',
    iconName: 'HardDrive',
    description: 'Relational 3NF database design, foreign keys, complex JOIN queries, PDO prepared statements, and transaction locks.',
    relatedIds: ['php', 'node', 'express'],
    orbitRadius: 210,
    speed: 0.7,
    color: '#EAD5D7',
  },
  {
    id: 'php',
    name: 'PHP 8',
    category: 'backend',
    level: 85,
    experienceYears: '2+ Yrs',
    iconName: 'Code',
    description: 'Object-Oriented PHP, PDO database interaction, session management, REST endpoints, and security best practices.',
    relatedIds: ['mysql', 'express'],
    orbitRadius: 150,
    speed: 0.9,
    color: '#C5A0A6',
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'frontend',
    level: 94,
    experienceYears: '2+ Yrs',
    iconName: 'Palette',
    description: 'Utility-first styling, custom theme variables, responsive design breakpoints, and typography scales.',
    relatedIds: ['react'],
    orbitRadius: 320,
    speed: 0.35,
    color: '#E0B0B7',
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'frontend',
    level: 88,
    experienceYears: '2+ Yrs',
    iconName: 'FileCode',
    description: 'Static typing, interface definitions, generics, union types, and strict mode compilation.',
    relatedIds: ['react', 'node', 'express'],
    orbitRadius: 130,
    speed: 0.75,
    color: '#FBF8F6',
  },
  {
    id: 'rest-api',
    name: 'RESTful APIs',
    category: 'architecture',
    level: 92,
    experienceYears: '2+ Yrs',
    iconName: 'Network',
    description: 'HTTP verb semantics, status code standards, JSON payload contracts, and error handling.',
    relatedIds: ['express', 'php', 'node'],
    orbitRadius: 260,
    speed: 0.45,
    color: '#C5A0A6',
  },
  {
    id: 'git',
    name: 'Git & GitHub',
    category: 'tools',
    level: 90,
    experienceYears: '2+ Yrs',
    iconName: 'GitBranch',
    description: 'Version control workflows, feature branching, pull request code reviews, and commit hygiene.',
    relatedIds: ['react', 'node'],
    orbitRadius: 340,
    speed: 0.3,
    color: '#EAD5D7',
  },
];

export const JOURNEY_MILESTONES: JourneyMilestone[] = [
  {
    id: 'milestone-4',
    year: '2026',
    period: 'Current Focus',
    title: 'Senior Full Stack & Systems Mastery',
    organization: 'Independent Engineering & Architecture',
    role: 'Full Stack Engineer (MERN + PHP)',
    description: 'Advanced development of enterprise full-stack platforms, optimizing MongoDB aggregation pipelines, engineering PHP REST APIs, and crafting editorial web applications.',
    keyAchievements: [
      'Architected Aura e-commerce platform with sub-20ms query latency',
      'Engineered Luxe Craft luxury jewelry catalog with 3NF MySQL schemas',
      'Integrated dual Node.js & PHP API gateways with standardized JWT authentication',
    ],
    techUsed: ['React 19', 'Node.js', 'Express', 'MongoDB', 'PHP 8', 'MySQL', 'Tailwind CSS'],
    codeSnippet: {
      language: 'typescript',
      filename: 'architecture.ts',
      code: `// Full Stack Dual-Database Controller
export class DatabaseManager {
  static async queryMongo<T>(model: Model<T>, filter: FilterQuery<T>): Promise<T[]> {
    return await model.find(filter).lean().exec();
  }
  static async queryMySQL(sql: string, params: any[]): Promise<any> {
    return await mysqlPool.execute(sql, params);
  }
}`,
    },
  },
  {
    id: 'milestone-3',
    year: '2025',
    period: 'MERN & CRUD Depth',
    title: 'Full Stack Development Expansion',
    organization: 'Specialized Full Stack Engineering Program',
    role: 'MERN Stack & Database Developer',
    description: 'Focused deeply on building production-ready CRUD web applications with React, Express, and MongoDB. Mastered state management, REST APIs, and database indexing.',
    keyAchievements: [
      'Built 5+ complete CRUD web apps with full authentication and error handling',
      'Implemented responsive React interfaces with custom hooks and motion transitions',
      'Configured MongoDB database schemas and indexing for fast retrieval',
    ],
    techUsed: ['React', 'Node.js', 'Express', 'MongoDB', 'JavaScript ES6+', 'REST APIs'],
    codeSnippet: {
      language: 'javascript',
      filename: 'crudController.js',
      code: `// MERN CRUD Controller Template
exports.createItem = async (req, res) => {
  try {
    const newItem = await Item.create(req.body);
    res.status(201).json({ success: true, data: newItem });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};`,
    },
  },
  {
    id: 'milestone-2',
    year: '2024 - 2025',
    period: 'Backend & PHP Foundation',
    title: 'Backend Systems & PHP Mastery',
    organization: 'Web Architecture Practice',
    role: 'Backend PHP & MySQL Developer',
    description: 'Mastered Object-Oriented PHP, relational database normalization, SQL queries, JOINs, PDO security, and session authentication.',
    keyAchievements: [
      'Designed relational MySQL databases with 3rd Normal Form compliance',
      'Created secure PHP backends with PDO prepared statements preventing SQL injections',
      'Built e-commerce inventory backends with MySQL foreign key constraints',
    ],
    techUsed: ['PHP 8', 'MySQL', 'PDO', 'Apache/Nginx', 'HTML5/CSS3'],
    codeSnippet: {
      language: 'php',
      filename: 'pdoDatabase.php',
      code: `<?php
class Database {
    private $pdo;
    public function __construct() {
        $this->pdo = new PDO("mysql:host=localhost;dbname=jewelry_db", "user", "pass", [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]);
    }
}`,
    },
  },
  {
    id: 'milestone-1',
    year: '2024',
    period: 'Inception',
    title: 'Frontend & Web Fundamentals',
    organization: 'Self-Directed & Technical Studies',
    role: 'Frontend Web Developer',
    description: 'Mastered core Web technologies: HTML5, CSS3, modern JavaScript (ES6+), DOM manipulation, and responsive web design.',
    keyAchievements: [
      'Built 10+ responsive web interfaces from scratch',
      'Mastered CSS flexbox, grid, and animations',
      'Established disciplined version control habits on GitHub',
    ],
    techUsed: ['HTML5', 'CSS3', 'JavaScript', 'Git', 'GitHub'],
  },
];

export const INITIAL_CRUD_ITEMS: CrudItem[] = [
  { id: 'prod_101', name: 'Aura Silk Luxe Hoodie', category: 'E-Commerce', price: 149.00, stock: 42, dbSource: 'MongoDB', status: 'In Stock', createdAt: '2026-07-20' },
  { id: 'prod_102', name: 'Solitaire Rose Gold Ring', category: 'Jewelry', price: 1250.00, stock: 8, dbSource: 'MySQL', status: 'In Stock', createdAt: '2026-07-21' },
  { id: 'prod_103', name: 'Emerald Cut Diamond Pendant', category: 'Jewelry', price: 2400.00, stock: 3, dbSource: 'MySQL', status: 'Low Stock', createdAt: '2026-07-22' },
  { id: 'prod_104', name: 'Flipkart Next Smartwatch', category: 'E-Commerce', price: 199.00, stock: 120, dbSource: 'MongoDB', status: 'In Stock', createdAt: '2026-07-23' },
  { id: 'prod_105', name: 'Auth Bearer JWT Spec Endpoint', category: 'API Spec', price: 0.00, stock: 999, dbSource: 'MongoDB', status: 'In Stock', createdAt: '2026-07-24' },
];

export const TESTIMONIALS: Testimonial[] = [

];
