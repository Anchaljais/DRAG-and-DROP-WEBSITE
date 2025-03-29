// prebuiltComponents.js
export const prebuiltComponents = [
    {
        name: "Basic Card",
        type: "card",
        component: {
            type: "card",
            content: "<h3>Card Title</h3><p>Card content goes here</p>",
            width: 300,
            height: 200,
            backgroundColor: "#ffffff",
            borderColor: "#e0e0e0",
            borderWidth: 1,
            borderRadius: 8,
            padding: 16
        }
    },
    {
        name: "Image Card",
        type: "card",
        component: {
            type: "card",
            content: `
        <img src="" alt="Card Image" style="width:100%;height:120px;object-fit:cover;border-radius:8px 8px 0 0;"/>
        <div style="padding:16px;">
          <h3>Image Card</h3>
          <p>This card has an image header</p>
        </div>
      `,
            width: 300,
            height: 250,
            backgroundColor: "#ffffff",
            borderColor: "#e0e0e0",
            borderWidth: 1,
            borderRadius: 8
        }
    },
    {
        name: "Testimonial",
        type: "testimonial",
        component: {
            type: "testimonial",
            content: `
        <div style="text-align:center;">
          <p style="font-style:italic;">"This is an amazing product that changed my life!"</p>
          <div style="margin-top:16px;">
            <div style="width:50px;height:50px;border-radius:50%;background:#ddd;margin:0 auto;"></div>
            <h4 style="margin-bottom:0;">John Doe</h4>
            <p style="margin-top:4px;color:#666;">Customer</p>
          </div>
        </div>
      `,
            width: 350,
            height: 200,
            backgroundColor: "#f8f9fa",
            borderColor: "#e0e0e0",
            borderWidth: 1,
            borderRadius: 8,
            padding: 20
        }
    },
    {
        name: "Feature Card",
        type: "card",
        component: {
            type: "card",
            content: `
        <div style="text-align:center;padding:20px;">
          <div style="width:60px;height:60px;border-radius:50%;background:#3498db;margin:0 auto 16px;display:flex;align-items:center;justify-content:center;color:white;font-size:24px;">✨</div>
          <h3>Feature</h3>
          <p>Description of this great feature</p>
        </div>
      `,
            width: 250,
            height: 220,
            backgroundColor: "#ffffff",
            borderColor: "#e0e0e0",
            borderWidth: 1,
            borderRadius: 8
        }
    },
    {
        name: "Pricing Card",
        type: "card",
        component: {
            type: "card",
            content: `
        <div style="text-align:center;padding:20px;">
          <h3>Premium Plan</h3>
          <div style="font-size:32px;font-weight:bold;margin:10px 0;">$29.99</div>
          <ul style="text-align:left;padding-left:20px;">
            <li>Feature 1</li>
            <li>Feature 2</li>
            <li>Feature 3</li>
          </ul>
          <button style="margin-top:20px;padding:8px 16px;background:#3498db;color:white;border:none;border-radius:4px;">Sign Up</button>
        </div>
      `,
            width: 280,
            height: 320,
            backgroundColor: "#ffffff",
            borderColor: "#e0e0e0",
            borderWidth: 1,
            borderRadius: 8
        }
    }
];