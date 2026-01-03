"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { useState } from "react"

export default function Docs() {
  const [activeSection, setActiveSection] = useState("getting-started")

  const sections = {
    "getting-started": {
      title: "Getting Started",
      content: `
## Welcome to BuildAI

BuildAI is an AI-powered website builder that lets you create production-ready websites in minutes.

### Quick Start

1. **Sign up** for a free account
2. **Describe your website** using our AI prompt interface
3. **Customize** using our visual builder
4. **Deploy** with one click

### Your First Website

Follow these steps to build your first website:

1. Log in to your dashboard
2. Click "New Project"
3. Enter a description of your desired website
4. Review and customize the generated design
5. Click "Publish Website" to go live

That's it! Your website is now live and can be accessed by anyone.
      `,
    },
    "ai-builder": {
      title: "AI Builder",
      content: `
## Using the AI Builder

The AI Builder is where the magic happens. It uses advanced language models to understand your requirements and generate a complete website.

### Writing Effective Prompts

The better your description, the better the generated website. Here are some tips:

- **Be specific**: Instead of "a website", say "a SaaS landing page with pricing table and testimonials"
- **Mention style**: "Modern minimal design with dark theme"
- **Describe sections**: List the main sections you want (hero, features, pricing, etc.)
- **Include details**: Font preferences, color themes, special features

### Example Prompts

\`\`\`
Modern e-commerce store for selling digital products. 
Dark theme with purple and pink accents. 
Include hero section, products grid, cart functionality, 
and checkout process. Mobile-first design.
\`\`\`

\`\`\`
Professional SaaS landing page for a project management tool.
Clean minimalist design with blue and white colors.
Include hero section, 6-feature grid, pricing table,
testimonials carousel, and footer newsletter signup.
\`\`\`

### Advanced Options

- **Design Style**: Modern Minimal, Bold & Vibrant, Professional Classic, Playful Fun
- **Layout Type**: Single Page, Multi Page, Blog Site, E-commerce
- **Customization**: After generation, use the visual editor to fine-tune everything
      `,
    },
    "visual-editor": {
      title: "Visual Editor",
      content: `
## Visual Editor

After AI generation, use the visual editor to customize your website without coding.

### Components

BuildAI includes pre-built components you can drag and drop:

- **Sections**: Hero, Features, Testimonials, Pricing, CTA
- **Elements**: Buttons, Cards, Forms, Images, Text
- **Navigation**: Headers, Footers, Menus
- **Advanced**: Custom HTML blocks, Code snippets

### Editing Content

- Click any element to edit its content
- Use the properties panel to change colors, fonts, spacing
- Drag elements to rearrange layout
- Duplicate or delete elements easily

### Styling

- Change colors with the color picker
- Adjust fonts from Google Fonts library
- Set spacing, borders, shadows
- Create animations and transitions
      `,
    },
    deployment: {
      title: "Deployment & Hosting",
      content: `
## Deploying Your Website

BuildAI handles all the complexity of hosting your website.

### One-Click Deploy

1. Click "Publish Website" in the builder
2. Choose your deployment region
3. Set up your custom domain (optional)
4. Click "Deploy"

Your website is now live!

### Custom Domains

1. Go to project settings
2. Click "Add Custom Domain"
3. Follow the DNS setup instructions
4. SSL certificate is automatically provisioned

### Performance

All websites are hosted on our CDN for fast loading speeds worldwide. You get:

- Automatic caching
- Global distribution
- 99.9% uptime SLA
- Automatic SSL/TLS
- DDoS protection
      `,
    },
    api: {
      title: "API Reference",
      content: `
## BuildAI API

Integrate BuildAI with your applications using our REST API.

### Authentication

All API requests require an API key in the Authorization header:

\`\`\`
Authorization: Bearer your_api_key_here
\`\`\`

### Projects Endpoints

\`\`\`
GET /api/projects
POST /api/projects
GET /api/projects/[id]
PUT /api/projects/[id]
DELETE /api/projects/[id]
\`\`\`

### Generate Endpoint

\`\`\`
POST /api/ai/generate
\`\`\`

Request body:
\`\`\`json
{
  "prompt": "Your website description",
  "style": "Modern Minimal",
  "layoutType": "Single Page"
}
\`\`\`

### Deploy Endpoint

\`\`\`
POST /api/deploy
\`\`\`

Request body:
\`\`\`json
{
  "projectId": "project_123",
  "customDomain": "mydomain.com"
}
\`\`\`

See full API documentation at /api/docs
      `,
    },
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="flex flex-col lg:flex-row gap-8 px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto">
        {/* Sidebar Navigation */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="glass-effect p-6 rounded-xl sticky top-24">
            <h3 className="font-bold mb-4">Documentation</h3>
            <nav className="space-y-2">
              {Object.entries(sections).map(([key, section]) => (
                <button
                  key={key}
                  onClick={() => setActiveSection(key)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition ${
                    activeSection === key
                      ? "bg-primary/20 text-primary font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {section.title}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="glass-effect p-8 rounded-xl">
            <h1 className="text-4xl font-bold mb-6">{sections[activeSection as keyof typeof sections].title}</h1>
            <div className="prose prose-invert max-w-none">
              {sections[activeSection as keyof typeof sections].content.split("\n").map((line, index) => {
                if (line.startsWith("## ")) {
                  return (
                    <h2 key={index} className="text-2xl font-bold mt-8 mb-4">
                      {line.replace("## ", "")}
                    </h2>
                  )
                }
                if (line.startsWith("### ")) {
                  return (
                    <h3 key={index} className="text-lg font-semibold mt-6 mb-3">
                      {line.replace("### ", "")}
                    </h3>
                  )
                }
                if (line.startsWith("- ")) {
                  return (
                    <li key={index} className="ml-6 mb-2">
                      {line.replace("- ", "")}
                    </li>
                  )
                }
                if (line.startsWith("`")) {
                  return (
                    <code key={index} className="bg-muted/50 px-2 py-1 rounded text-sm font-mono">
                      {line.replace(/`/g, "")}
                    </code>
                  )
                }
                if (line.trim() === "") {
                  return <br key={index} />
                }
                return (
                  <p key={index} className="mb-4 leading-relaxed text-muted-foreground">
                    {line}
                  </p>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
