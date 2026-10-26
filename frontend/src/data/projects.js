/**
 * Static Portfolio Projects Data
 * 
 * Completely decoupled from backend APIs for instant, zero-latency rendering.
 * All project metadata, links, tech stacks, and features are stored locally.
 */

export const projects = [
  {
    id: "we-design-smiles",
    slug: "we-design-smiles",
    name: "We Design Smiles",
    title: "We Design Smiles",
    category: "Dental Clinic Web App",
    short_desc:
      "A modern dental clinic website focused on premium visual design, interactive animations, treatment information, and appointment booking.",
    description:
      "We Design Smiles is a modern dental clinic website designed to provide a premium and professional online experience for patients. The website focuses on visual storytelling, smooth interactions, responsive design, clinic information, treatment services, location details, and appointment booking.",
    overview:
      "The project was built as a modern dental clinic website with an emphasis on visual presentation, smooth interactions, responsive design, and user-friendly appointment booking.",
    tech_stack: [
      "React",
      "Tailwind CSS",
      "JavaScript",
      "Responsive Web Design",
    ],
    key_features: [
      "Modern dental clinic landing page with full-width visual hero sections",
      "Scroll-based video and frame-scrubbing animations for high-engagement storytelling",
      "Interactive treatment and services catalog detailing procedures and care",
      "Before-and-after smile transformation presentation for visual patient results",
      "Clinic information, location details, interactive map, and About section",
      "User-friendly appointment booking form tailored for patient convenience",
      "Fully responsive design optimized for desktop, tablet, and mobile devices",
      "Smooth scrolling, micro-interactions, and reusable React components",
    ],
    highlights: [
      "Interactive frame-scrubbing hero animations",
      "Responsive clinic website layout",
      "Reusable React components",
      "Appointment booking interface",
      "Treatment/services presentation",
      "Location and clinic information",
      "Mobile-friendly design",
      "Optimized visual experience",
    ],
    live_url: "https://we-design-smiles-seven.vercel.app/",
    frontend_url: "https://we-design-smiles-seven.vercel.app/",
    github_url: "https://github.com/niranjanreddy18/we-design-smiles",
    image: "/projects/we-design-smiles.svg",
    status: "Live Demo",
    is_featured: true,
    order: 1,
  },
  {
    id: "shopsphere",
    slug: "shopsphere",
    name: "ShopSphere",
    title: "ShopSphere",
    category: "Full Stack E-Commerce",
    short_desc: "Full-Stack E-Commerce Platform",
    description:
      "A production-grade full-stack e-commerce web application featuring a rich product catalog, responsive search & multi-attribute filtering, secure JWT authentication, persistent cart and wishlist states, Stripe payment processing, and comprehensive order management.",
    overview:
      "A complete full-stack e-commerce architecture connecting a React single-page frontend with a Django REST Framework backend and PostgreSQL database, integrating Stripe payments and token-based authentication.",
    tech_stack: [
      "Django",
      "Django REST Framework",
      "React",
      "PostgreSQL",
      "Stripe",
      "Tailwind CSS",
    ],
    key_features: [
      "Dynamic product catalog with instant keyword search, category navigation, and price filters",
      "Secure user authentication powered by JWT with access and refresh token lifecycle",
      "Persistent cart and wishlist management with real-time price calculations",
      "Seamless Stripe Checkout integration with order confirmation workflows",
      "Modular Django REST API architecture with PostgreSQL persistence and schema validation",
    ],
    highlights: [
      "Complete end-to-end checkout and payment lifecycle",
      "JWT authentication and secure token rotation",
      "Persistent cart and wishlist across sessions",
      "Normalized PostgreSQL database schema",
      "RESTful API endpoints with filtering and search",
    ],
    github_url: "https://github.com/niranjanreddy18/shopsphere",
    live_url: "https://shopsphere-gamma-puce.vercel.app/",
    frontend_url: "https://shopsphere-gamma-puce.vercel.app/",
    backend_url: "https://github.com/niranjanreddy18/shopsphere",
    backend_note:
      "Backend is hosted on Render free tier. If dormant, the server spins up automatically on the first request (takes ~30-50s to wake up).",
    image: "/projects/shopsphere.svg",
    status: "Live Demo",
    is_featured: true,
    order: 2,
  },
  {
    id: "chatapp",
    slug: "chatapp",
    name: "ChatApp",
    title: "ChatApp",
    category: "Real-Time Systems",
    short_desc: "Real-Time Messaging Platform",
    description:
      "A scalable real-time messaging application engineered with Django Channels and WebSockets. Implements Redis channel layers for distributed pub/sub messaging, live user presence indicators, instant typing alerts, and persistent message history.",
    overview:
      "An asynchronous full-stack communication system leveraging WebSockets, Redis pub/sub broker channels, and Django Channels for low-latency messaging with persistent PostgreSQL storage.",
    tech_stack: [
      "Django",
      "Django Channels",
      "React",
      "WebSockets",
      "Redis",
      "PostgreSQL",
    ],
    key_features: [
      "Full-duplex bidirectional communication with low-latency WebSocket connections",
      "Scalable Redis channel layer broadcasting messages across independent worker processes",
      "Live typing notifications, instant deliverability, and online user presence detection",
      "Structured message persistence and relational chat history in PostgreSQL",
      "Authenticated WebSocket handshake securing room subscriptions and user identity",
    ],
    highlights: [
      "Bi-directional WebSocket streaming architecture",
      "Distributed Redis pub/sub message broadcasting",
      "Real-time typing detection and user presence tracking",
      "Relational chat history persisted in PostgreSQL",
      "Custom JWT authentication over WebSocket protocol",
    ],
    github_url: "https://github.com/niranjanreddy18/chatapp",
    live_url: "https://chatapp-one-neon.vercel.app/",
    frontend_url: "https://chatapp-one-neon.vercel.app/",
    backend_url: "https://github.com/niranjanreddy18/chatapp",
    backend_note:
      "Real-time WebSocket backend is hosted on Render free tier. Please allow a few seconds for the instance to spin up if idle.",
    image: "/projects/chatapp.svg",
    status: "Live Demo",
    is_featured: true,
    order: 3,
  },
];

export default projects;
