# 🚀 AI Study Planner for DSA (PromptWars Project)

An AI-powered web application built for **PromptWars Virtual** that generates personalized Data Structures & Algorithms (DSA) study roadmaps based on user goals, duration, and selected topics.

Students learning Data Structures and Algorithms often feel confused about what topic to study next.

They waste time switching between resources, following random roadmaps, and lack a clear structured plan based on their available time.

This leads to inconsistency and slow preparation.

This project focuses on intent-driven development, leveraging AI to solve a real problem:  
👉 **“What should I study next in DSA?”**

---

## 🎯 Problem Statement

Many students struggle with:

- No clear DSA roadmap  
- Random topic jumping  
- Lack of consistency  

This project solves that by generating a **structured, goal-based learning plan instantly using AI**.

---

## ✨ Features

- 🎯 Goal-based planning (15 / 60 / 90 days)  
- 🧠 AI-generated roadmap using Gemini API  
- 🗂️ Custom topic selection (or full DSA roadmap)  
- 📅 Day-wise breakdown (concepts + problems)  
- 🔐 Authentication system (JWT-based login/signup)  
- 📱 Clean and responsive UI  
- ⚡ Fast roadmap generation  

---

## 🛠️ Tech Stack

### Frontend
- React  
- Tailwind CSS  
- Vite  

### Backend
- Node.js  
- Express.js  

### Database
- MongoDB (Mongoose)  

### AI Integration
- Gemini API (Google Generative AI)  

### Deployment
- Docker  
- Google Cloud Run  

---

## 📦 Project Structure

```
My-PromptWarsProject11/
├── frontend/
├── backend/
├── Dockerfile
└── README.md
```

---

## 🚀 How It Works

1. User selects:
   - Duration (e.g., 60 days)  
   - Topics (custom or full DSA)  

2. Backend sends structured prompt to Gemini API  

3. AI generates:
   - Day-wise roadmap  
   - Concepts  
   - Practice problems  

4. Data is stored and displayed in UI  

---

## 🧠 AI Usage (Prompt Engineering)

- Dynamic prompt generation based on:
  - Selected topics  
  - Duration  
  - Difficulty level  

- Ensures:
  - No repetition  
  - Logical progression  
  - Topic-specific roadmap  

---

## 🐳 Run Locally

### Clone Repository

```bash
git clone https://github.com/PayalKumari10/My-PromptWarsProject11.git
cd My-PromptWarsProject11
```

---

### Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret
GEMINI_API_KEY=your_api_key
```

Run backend:

```bash
npm run dev
```

---

### Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

---

## 🐳 Docker

```bash
docker build -t ai-study-planner .
docker run -p 5000:5000 ai-study-planner
```

---

## 🌐 Deployment

Deployed using **Google Cloud Run**

👉 *(Add your live link here)*

---

## 📈 Impact

- Helps students follow a clear DSA path  
- Saves hours of planning time  
- Encourages daily consistency  
- Demonstrates real-world AI integration  

---

## 🏆 PromptWars Submission

This project is built as part of **PromptWars Virtual Hackathon**:

- ✅ Functional full-stack application  
- ✅ AI-powered workflow  
- ✅ Real-world use case  
- ✅ Build-in-public ready  

---

## 👩‍💻 Author

**Payal Kumari**  
Software Developer | Open Source Enthusiast  

GitHub: https://github.com/PayalKumari10  

---

## 📄 License

MIT License

---

## ⭐ Support

If you found this useful:

- ⭐ Star the repo  
- Share your feedback  
- Connect on LinkedIn  

---
