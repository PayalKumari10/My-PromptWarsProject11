# 🚀 AI Study Planner for DSA (PromptWars Project)

An AI-powered full-stack web application built for **PromptWars Virtual**, designed to help students create personalized, structured Data Structures & Algorithms (DSA) study roadmaps using AI.

It removes confusion in learning by guiding students on **what to study next, based on their goals and time availability.**

---

# 🧠 Problem Statement

Students learning Data Structures and Algorithms often struggle with:

- Not knowing what topic to study next  
- Following random and inconsistent roadmaps  
- Switching between multiple resources without structure  
- Lack of a clear, goal-based learning path  

This leads to wasted time and slow preparation.

---

# 💡 Solution

This project solves the problem by generating a **personalized, structured, day-by-day DSA roadmap** based on:

- Selected time duration (15 / 60 / 90 days)  
- Chosen topics or full DSA coverage  
- Learning progression logic powered by AI  

👉 The system acts as a **decision-making assistant** that tells students exactly what to study next.

---

# ✨ Key Features

- 🎯 Goal-based roadmap generation (15 / 60 / 90 days)  
- 🧠 AI-generated structured learning plan using Gemini API  
- 🗂️ Custom topic selection or full DSA roadmap  
- 📅 Day-wise breakdown (concepts + practice problems)  
- 🔐 JWT-based authentication (Login/Signup)  
- 📱 Responsive and clean UI  
- ⚡ Fast AI-powered roadmap generation  

---

# 🛠️ Tech Stack

## Frontend
- React  
- Tailwind CSS  
- Vite  

## Backend
- Node.js  
- Express.js  

## Database
- MongoDB (Mongoose)  

## AI Integration
- Google Gemini API (Generative AI)  

## Deployment
- Docker  
- Google Cloud Run  

---

# 🧩 System Architecture

Frontend → Backend → Gemini API → Structured AI Response → UI Display  

---

# ⚙️ How It Works

1. User selects:
   - Study duration (15 / 60 / 90 days)
   - Topics (custom or full DSA)

2. Backend processes input and builds a structured prompt  

3. Gemini AI generates:
   - Day-wise roadmap
   - Topics + concepts
   - Practice problem suggestions  

4. Response is stored and displayed in the UI  

---

# 🧠 AI Integration (Prompt Engineering)

The system uses dynamic prompt engineering based on:

- Selected topics  
- Duration of study plan  
- Learning flow structure  

This ensures:

- No random outputs  
- Logical topic progression  
- Structured and usable study plans  

---

# 🧪 Testing

- API endpoints tested using Postman  
- Authentication flow verified (Login/Signup)  
- Roadmap generation tested with multiple inputs  
- Edge cases handled for invalid or empty input  

---

# ♿ Accessibility

- Semantic HTML structure used  
- Responsive design for mobile and desktop  
- Clear labels and accessible buttons  
- Simple and readable UI flow  

---

# 🐳 Run Locally

## Clone Repository

```bash
git clone https://github.com/PayalKumari10/My-PromptWarsProject11.git
cd My-PromptWarsProject11

---

# Backend Setup
cd backend
npm install

---

Create .env file:

PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret
GEMINI_API_KEY=your_api_key

---

Run backend:

npm run dev

---
Frontend Setup
cd frontend
npm install
npm run dev

---

🐳 Docker
docker build -t ai-study-planner .
docker run -p 5000:5000 ai-study-planner
---

🌐 Deployment

Deployed using Google Cloud Run
---

👉 Live Link: Add here

---

📈 Impact
Reduces confusion in DSA preparation
Provides structured learning paths
Improves consistency in practice
Saves time in planning study schedules
Demonstrates real-world AI integration

---

🏆 PromptWars Submission

This project is part of PromptWars Virtual Hackathon organized by Hack2Skill (H2S) with support from Google for Developers.

It demonstrates:

AI-powered application development
Real-world problem solving
Intent-driven development using Google Gemini
Full-stack deployment on Google Cloud

---

👩‍💻 Author

Payal Kumari
Software Developer | Open Source Enthusiast

GitHub: https://github.com/PayalKumari10

---

📄 License

MIT License

---

⭐ If you like this project
Give a ⭐ on GitHub
Share feedback
Connect on LinkedIn
