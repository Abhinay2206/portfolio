
export const projects = [
    {
      title: "SafeStreets - Road Damage Detection and Management System",
      description: "AI-powered system for detecting and managing road damages using Vision Transformer models, mobile applications, and comprehensive dashboards.",
      tech: ["React", "Material UI", "Node.js", "Express.js", "MongoDB", "Vision Transformer", "Mapbox/Leaflet", "JWT"],
      features: ["AI damage classification", "GPS-tagged image capture", "Severity assessment", "Interactive map view", "Task assignment", "Field worker management", "Role-based access control"],
      demo: "https://safestreets.vercel.app/",
      github: "https://github.com/safestreets-g408/safestreets",
      projectDetails: {
        overview: "A comprehensive road maintenance solution that combines mobile applications, AI-powered damage detection, and administrative dashboards to streamline the identification, classification, and repair of road damages.",
        images: [
          {
            url: "road-damage/dashboard.png",
            caption: "Administrative dashboard with damage analytics and interactive heatmap visualization"
          },
          {
            url: "road-damage/mobile-app.png",
            caption: "Mobile application interface for field workers with GPS-tagged image capture"
          },
          {
            url: "road-damage/damage-detection.png",
            caption: "AI-powered damage detection showing classification results with severity assessment"
          },
          {
            url: "road-damage/task-management.png",
            caption: "Task assignment and field worker management interface with status tracking"
          }
        ],
        challenges: [
          "Training Vision Transformer models with limited road damage datasets",
          "Building a reliable offline-first mobile application for field workers",
          "Implementing accurate GPS tagging in various environmental conditions",
          "Designing an efficient task assignment system based on geographic proximity"
        ],
        solutions: [
          "Utilized transfer learning and data augmentation techniques for ViT model training",
          "Implemented IndexedDB for offline storage and synchronization in the mobile app",
          "Developed a custom GPS accuracy algorithm with fallback mechanisms",
          "Created an optimized task routing system using geospatial indexing"
        ],
        impact: "Reduced road repair response time by 60% and improved damage classification accuracy to 92%, leading to more efficient maintenance operations and safer road conditions"
      }
    },
    {
      title: "BonkBot",
      description: "An automated trading and utility bot built on the Solana blockchain, designed to streamline trading and interaction with the $BONK token ecosystem.",
      tech: ["React.js", "Node.js", "Express.js", "Solana Web3.js", "PostgreSQL", "TypeScript", "JWT"],
      features: [
        "Phantom & Solflare wallet authentication",
        "BONK price tracking and portfolio value visualization",
        "Secure API with rate limiting and encryption",
        "Clean and responsive React dashboard",
        "Basic trading automation (coming soon)",
        "AI-powered trading strategies (coming soon)"
      ],
      github: "https://github.com/Abhinay2206/BonkBot",
      projectDetails: {
        overview: "A comprehensive trading and utility bot for the Solana blockchain that offers secure wallet integration, real-time portfolio tracking, and advanced trading features for the $BONK token ecosystem.",
        images: [
          {
            url: "bonkbot/dashboard.png",
            caption: "User-friendly dashboard with comprehensive portfolio tracking and value visualization"
          },
          {
            url: "bonkbot/wallet-integration.png",
            caption: "Secure wallet integration with Phantom and Solflare authentication flow"
          },
          {
            url: "bonkbot/price-tracking.png",
            caption: "Real-time BONK price tracking with historical data and trend analysis"
          },
          {
            url: "bonkbot/trading-interface.png",
            caption: "Advanced trading interface with automation options and strategy configuration"
          }
        ],
        challenges: [
          "Ensuring secure wallet integration and transaction signing",
          "Building reliable real-time price tracking for Solana tokens",
          "Implementing efficient trading automation within blockchain constraints",
          "Designing a scalable architecture for future AI trading strategies"
        ],
        solutions: [
          "Leveraged Solana Wallet Adapter for secure wallet connections",
          "Implemented WebSocket connections to multiple price oracles for redundancy",
          "Developed optimized transaction batching for efficient trading operations",
          "Created modular architecture to support future AI strategy integration"
        ],
        impact: "Simplified $BONK token trading experience with secure, user-friendly tools that reduce complexity and improve portfolio management for Solana users"
      }
    },
    {
      title: "Real-Time Inventory Management System",
      description: "Enterprise-grade inventory management system with real-time tracking, AI-powered analytics, and comprehensive business intelligence.",
      tech: ["React", "Material UI", "Node.js", "Express.js", "MongoDB", "Socket.io", "TensorFlow", "scikit-learn"],
      features: ["Role-based access control", "Real-time inventory tracking", "Predictive stock analytics", "Automated low-stock alerts", "AI-powered inventory optimization", "Customer behavior analytics", "Supplier performance tracking"],
      github: "https://github.com/Abhinay2206/ims",
      projectDetails: {
        overview: "A full-stack inventory management solution that leverages real-time data and machine learning to optimize stock levels, reduce costs, and improve operational efficiency for businesses of all sizes.",
        images: [
          {
            url: "ims-img/landing.png",
            caption: "Modern landing page with intuitive navigation and key performance metrics dashboard"
          },
          {
            url: "ims-img/dashboard.png",
            caption: "Real-time inventory dashboard with actionable insights and interactive KPIs"
          },
          {
            url: "ims-img/charts.png",
            caption: "Interactive data visualization with predictive analytics and trend forecasting"
          },
          {
            url: "ims-img/customer-analysis.png",
            caption: "Advanced customer segmentation with behavior analysis and purchasing patterns"
          },
          {
            url: "ims-img/supplier-analysis.png",
            caption: "Comprehensive supplier performance metrics with reliability scoring system"
          },
          {
            url: "ims-img/stock-recommendation.png",
            caption: "ML-powered inventory optimization with automated stock level recommendations"
          }
        ],
        challenges: [
          "Scaling real-time updates across thousands of concurrent users",
          "Complex data modeling for multi-dimensional inventory analysis",
          "Ensuring sub-second response times with large datasets"
        ],
        solutions: [
          "Implemented WebSocket clustering with Redis pub/sub for scalable real-time updates",
          "Designed efficient MongoDB schemas with compound indexing",
          "Utilized caching strategies and query optimization for 10x performance improvement"
        ],
        impact: "Reducing inventory costs by 40% and improving stock accuracy to 99.9%"
      }
    },
    {
      title: "CNN Based Lake Water Quality Classification",
      description: "Advanced computer vision system for automated water quality assessment using deep learning and real-time analysis.",
      tech: ["Python", "PyTorch", "Flask", "React", "Node.js", "MongoDB", "Redis"],
      features: ["Multi-class water quality detection", "Real-time image processing", "Historical trend analysis", "RESTful API integration", "Automated reporting"],
      demo: "https://project2.demo",
      github: "https://github.com/Abhinay2206/lake-water-quality",
      projectDetails: {
        overview: "A state-of-the-art machine learning solution that combines CNN architecture with distributed computing to deliver accurate, real-time water quality assessments from image data.",
        images: [
          {
            url: "cnn/dashboard.png",
            caption: "Real-time monitoring dashboard with comprehensive water quality metrics and alerts"
          },
          {
            url: "cnn/main.png",
            caption: "Intuitive image upload interface with instant analysis and classification results"
          },
          {
            url: "cnn/history.png",
            caption: "Comprehensive historical analysis with interactive trend visualization and reporting"
          },
          {
            url: "cnn/result.png",
            caption: "Detailed classification results with confidence scores and quality parameters"
          }
        ],
        challenges: [
          "Training robust models with limited and imbalanced dataset",
          "Achieving real-time processing for high-resolution images",
          "Handling varying environmental conditions in images"
        ],
        solutions: [
          "Implemented advanced data augmentation and transfer learning from ResNet50",
          "Built distributed processing pipeline with Redis for parallel inference",
          "Developed custom image preprocessing for environmental normalization"
        ],
        impact: "Achieved 95% classification accuracy, enabling automated monitoring of 100+ water bodies with 24/7 quality assessment"
      }
    },
    {
      title: "EventMaster",
      description: "A comprehensive event management platform that revolutionizes the way events are planned, organized, and executed.",
      tech: ["React", "Node.js", "Express.js", "MongoDB", "QR Code", "Socket.io"],
      features: [
        "Event creation and management",
        "Real-time seat selection",
        "Secure payment processing",
        "QR code ticket generation",
        "Admin dashboard analytics",
        "Order tracking system"
      ],
      demo: "https://eventmaster.demo",
      github: "https://github.com/Abhinay2206/EventMaster",
      projectDetails: {
        overview: "A full-stack event management solution that provides event organizers and attendees with a seamless, user-friendly experience for creating and participating in unforgettable events.",
        images: [
          {
            url: "eventmaster/landing.png",
            caption: "Modern and intuitive landing page with featured events and search functionality"
          },
          {
            url: "eventmaster/admin-dashboard.png",
            caption: "Comprehensive admin dashboard with real-time analytics and event management"
          },
          {
            url: "eventmaster/event-management.png",
            caption: "Event creation and management interface with customization options"
          },
          {
            url: "eventmaster/seat-selection.png",
            caption: "Interactive seat selection system with real-time availability updates"
          },
          {
            url: "eventmaster/user-orders-page.png",
            caption: "User order history with detailed tracking and ticket management"
          },
          {
            url: "eventmaster/qr-ticket.png",
            caption: "Digital QR code ticket generation with event details and verification"
          }
        ],
        challenges: [
          "Implementing real-time seat selection with conflict resolution",
          "Managing concurrent ticket purchases",
          "Ensuring secure payment processing",
          "Handling high traffic during popular event sales"
        ],
        solutions: [
          "Built real-time seat reservation system using Socket.io",
          "Implemented distributed locking for ticket purchases",
          "Integrated Stripe payment gateway with robust error handling",
          "Developed scalable architecture with load balancing"
        ],
        impact: "The system worked reliably to handle ticket sales for many events, making sure no tickets were sold twice and staying online consistently for users"
      }
    },
  ];  
