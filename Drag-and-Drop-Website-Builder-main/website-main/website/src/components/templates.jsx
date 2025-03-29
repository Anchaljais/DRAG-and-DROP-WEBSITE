// templates.js
export const templates = [
    {
        name: "Business Website",
        description: "Professional business website with hero section and services",
        elements: [
            {
                type: "navbar",
                x: 0,
                y: 0,
                width: "100%",
                height: 60,
                content: `
          <div class="nav-logo">My Business</div>
          <div class="nav-links">
            <a href="#">Home</a>
            <a href="#">Services</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
          </div>
        `,
                backgroundColor: "#2c3e50",
                color: "#ffffff"
            },
            {
                type: "hero",
                x: 0,
                y: 70,
                width: "100%",
                height: 400,
                content: "<h1>Welcome to Our Business</h1><p>Quality services you can trust</p>",
                backgroundColor: "#3498db",
                color: "#ffffff",
                textAlign: "center",
                fontSize: 48
            },
            {
                type: "container",
                x: 50,
                y: 500,
                width: "90%",
                height: 300,
                backgroundColor: "#f8f9fa",
                content: "<h2>Our Services</h2>",
                children: [
                    {
                        type: "card",
                        x: 20,
                        y: 60,
                        width: 250,
                        height: 200,
                        content: "<h3>Service 1</h3><p>Description of service 1</p>",
                        backgroundColor: "#ffffff"
                    },
                    {
                        type: "card",
                        x: 290,
                        y: 60,
                        width: 250,
                        height: 200,
                        content: "<h3>Service 2</h3><p>Description of service 2</p>",
                        backgroundColor: "#ffffff"
                    }
                ]
            }
        ]
    },
    {
        name: "E-commerce Store",
        description: "Online store template with product grid and featured section",
        elements: [
            {
                type: "navbar",
                x: 0,
                y: 0,
                width: "100%",
                height: 70,
                content: `
          <div class="nav-logo">ShopName</div>
          <div class="nav-links">
            <a href="#">Home</a>
            <a href="#">Products</a>
            <a href="#">Sale</a>
            <a href="#">Cart (0)</a>
          </div>
        `,
                backgroundColor: "#e74c3c",
                color: "#ffffff"
            },
            {
                type: "hero",
                x: 0,
                y: 80,
                width: "100%",
                height: 400,
                content: "<h1>Summer Sale</h1><p>Up to 50% off selected items</p><button>Shop Now</button>",
                backgroundColor: "#f39c12",
                color: "#ffffff",
                textAlign: "center"
            },
            {
                type: "product-grid",
                x: 50,
                y: 500,
                width: "90%",
                height: 600,
                backgroundColor: "#ffffff",
                columns: 3,
                products: [
                    {
                        name: "Product 1",
                        price: "$19.99",
                        image: ""
                    },
                    {
                        name: "Product 2",
                        price: "$24.99",
                        image: ""
                    }
                ]
            }
        ]
    },
    {
        name: "Portfolio",
        description: "Creative portfolio with projects showcase",
        elements: [
            {
                type: "navbar",
                x: 0,
                y: 0,
                width: "100%",
                height: 60,
                content: "My Portfolio",
                backgroundColor: "#34495e",
                color: "#ffffff"
            },
            {
                type: "hero",
                x: 0,
                y: 70,
                width: "100%",
                height: 300,
                content: "<h1>John Doe</h1><p>Web Designer & Developer</p>",
                backgroundColor: "#2c3e50",
                color: "#ffffff",
                textAlign: "center"
            },
            {
                type: "project-grid",
                x: 50,
                y: 400,
                width: "90%",
                height: 500,
                columns: 2,
                projects: [
                    {
                        title: "Project 1",
                        description: "Description of project 1",
                        image: ""
                    },
                    {
                        title: "Project 2",
                        description: "Description of project 2",
                        image: ""
                    }
                ]
            }
        ]
    },
    {
        name: "Blog",
        description: "Modern blog template with featured posts",
        elements: [
            {
                type: "navbar",
                x: 0,
                y: 0,
                width: "100%",
                height: 60,
                content: "My Blog",
                backgroundColor: "#27ae60",
                color: "#ffffff"
            },
            {
                type: "featured-post",
                x: 0,
                y: 70,
                width: "100%",
                height: 400,
                content: "<h1>Featured Post Title</h1><p>Excerpt from the featured post...</p>",
                backgroundColor: "#2ecc71",
                color: "#ffffff"
            },
            {
                type: "post-list",
                x: 50,
                y: 490,
                width: "90%",
                height: 500,
                posts: [
                    {
                        title: "Post Title 1",
                        date: "June 1, 2023",
                        excerpt: "Short excerpt from the post..."
                    },
                    {
                        title: "Post Title 2",
                        date: "May 25, 2023",
                        excerpt: "Short excerpt from the post..."
                    }
                ]
            }
        ]
    }
];