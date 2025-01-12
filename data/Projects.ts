
export const projects = [
    {
      title: "Inventory Management System",
      description: "A full-stack web application built with MERN Stack",
      tech: ["React.ks","Material UI", "Node.js", "Express.js", "MongoDB"],
      features: ["Authentication", "Real-time updates", "Responsive design"],
      demo: "https://project1.demo",
      github: "https://github.com/Abhinay2206/ims",
      projectDetails: {
        overview: "A comprehensive inventory management system that helps businesses track and manage their inventory in real-time. Built with the MERN stack, it provides a robust and scalable solution for inventory tracking, order management, and reporting.",
        images: [
          {
            url: "/images/ims/dashboard.png",
            caption: "Main dashboard showing inventory overview and key metrics"
          },
          {
            url: "/images/ims/inventory.png", 
            caption: "Inventory management interface with real-time stock updates"
          },
          {
            url: "/images/ims/charts.png",
            caption: "Analytics charts showing inventory trends and statistics"
          }
        ],
        challenges: [
          "Implementing real-time updates using WebSocket",
          "Designing an intuitive user interface for complex inventory operations",
          "Optimizing database queries for large inventory datasets"
        ],
        solutions: [
          "Used Socket.io for real-time communication",
          "Implemented Material UI components with custom styling",
          "Added MongoDB indexing and query optimization"
        ],
        impact: "Reduced inventory management time by 40% and improved accuracy by 60% for client businesses"
      }
    },
    {
      title: "CNN Based Lake Water Quality Classification",
      description: "A CNN based model to classify the water quality of a lake",
      tech: ["Python", "Pytorch", "Flask", "MERN Stack"],
      features: ["Image classification", "Real-time processing", "API endpoints"],
      demo: "https://project2.demo",
      github: "https://github.com/Abhinay2206/lake-water-quality",
      projectDetails: {
        overview: "An innovative machine learning solution that uses Convolutional Neural Networks to analyze and classify lake water quality from images. The system provides real-time analysis through a web interface built with the MERN stack.",
        images: [
          {
            url: "/images/cnn/dashboard.png",
            caption: "Analytics dashboard with historical classification data"
          },
          {
            url: "/images/cnn/main.png",
            caption: "Upload your image to classify water quality"
          },
          {
            url: "/images/cnn/history.png",
            caption: "Historical data overview for water quality analysis"
          },
          {
            url: "/images/cnn/result.png",
            caption: "Final results of water quality classification"
          }
        ],
        challenges: [
          "Building an accurate CNN model with limited training data",
          "Implementing real-time image processing pipeline",
          "Creating an efficient API for model inference"
        ],
        solutions: [
          "Used data augmentation and transfer learning to improve model accuracy",
          "Implemented async processing with Redis queue",
          "Optimized API endpoints with caching and batch processing"
        ],
        impact: "Achieved 95% accuracy in water quality classification, enabling faster and more reliable water quality monitoring"
      }
    }
  ];  
