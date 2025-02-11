
export const projects = [
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
            caption: "Modern landing page with intuitive navigation and key metrics"
          },
          {
            url: "ims-img/dashboard.png",
            caption: "Real-time dashboard with actionable insights and KPIs"
          },
          {
            url: "ims-img/charts.png",
            caption: "Interactive data visualization with predictive analytics"
          },
          {
            url: "ims-img/customer-analysis.png",
            caption: "Advanced customer segmentation and behavior analysis"
          },
          {
            url: "ims-img/supplier-analysis.png",
            caption: "Comprehensive supplier performance metrics and scoring"
          },
          {
            url: "ims-img/stock-recommendation.png",
            caption: "ML-powered inventory optimization recommendations"
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
            caption: "Real-time monitoring dashboard with quality metrics"
          },
          {
            url: "cnn/main.png",
            caption: "Intuitive image upload interface with instant analysis"
          },
          {
            url: "cnn/history.png",
            caption: "Comprehensive historical analysis with trend visualization"
          },
          {
            url: "cnn/result.png",
            caption: "Detailed classification results with confidence scores"
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
            caption: "Modern and intuitive landing page"
          },
          {
            url: "eventmaster/admin-dashboard.png",
            caption: "Comprehensive admin dashboard with analytics"
          },
          {
            url: "eventmaster/event-management.png",
            caption: "Event creation and management interface"
          },
          {
            url: "eventmaster/seat-selection.png",
            caption: "Interactive seat selection system"
          },
          {
            url: "eventmaster/user-orders-page.png",
            caption: "User order history and tracking"
          },
          {
            url: "eventmaster/qr-ticket.png",
            caption: "Digital QR code ticket generation"
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
    {
      title: "Attendance Bot for NGIT and KMEC Colleges",
      description: "Intelligent Telegram bot that automates attendance tracking with real-time notifications and analytics for educational institutions.",
      tech: ["Node.js", "Telegraf", "Puppeteer", "MongoDB", "Express.js"],
      features: [
        "Automated multi-platform attendance tracking",
        "Real-time attendance notifications",
        "Advanced analytics and reporting",
        "Seamless LMS integration",
        "Custom attendance policies support"
      ],
      demo: "https://project3.demo",
      github: "https://github.com/Abhinay2206/attendence_bot",
      projectDetails: {
        overview: "A sophisticated automation solution that transforms attendance management through intelligent bot technology, real-time tracking, and comprehensive analytics.",
        images: [],
        challenges: [
          "Handling complex authentication flows across multiple platforms",
          "Managing concurrent requests from thousands of users",
          "Ensuring 24/7 reliability with minimal maintenance"
        ],
        solutions: [
          "Implemented robust session management with JWT authentication",
          "Developed queue-based architecture for request handling",
          "Created automated health checks and self-healing mechanisms",
          "Built comprehensive logging and monitoring system"
        ],
        impact: "Deployed across 2 institutions, reducing administrative time by 80% and improving attendance tracking accuracy to 99%"
      }
    }
  ];  
