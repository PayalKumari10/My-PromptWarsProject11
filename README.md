# My-PromptWarsProject11
# My-PromptWarsProject11
# 🚀 AI Study Planner for DSA

AI-powered web app that generates personalized DSA study roadmaps based on your goal, duration, and selected topics.

---


## ✨ Features

* 🎯 Goal-based planning (15 / 60 / 90 days)
* 🧠 AI-generated daily roadmap (Gemini API)
* 🗂️ Custom topic selection (or full DSA)
* 📅 Day-wise learning + practice problems
* 🔐 JWT authentication (login/signup)
* 📱 Clean and responsive UI

---

## 🛠️ Tech Stack

**Frontend:** React, Tailwind CSS, Vite
**Backend:** Node.js, Express
**Database:** MongoDB (Mongoose)
**AI:** Gemini API
**Deployment:** Docker, Google Cloud Run

---

## 📦 Project Structure

```
frontend/
backend/
```

---

## 🚀 Run Locally

### Clone repo

```
git clone https://github.com/PayalKumari10/My-PromptWarsProject11.git
cd My-PromptWarsProject11
```

### Backend

```
cd backend
npm install
```

Create `.env`:

```
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret
GEMINI_API_KEY=your_api_key
```

Run:

```
npm run dev
```

### Frontend

```
cd ../frontend
npm install
npm run dev
```

---

## 🐳 Docker

```
docker build -t ai-study-planner .
docker run -p 5000:5000 ai-study-planner
```

---

## 🌐 Live Demo

(Add your Cloud Run link)

---

## 📈 Impact

* Structured DSA learning
* Saves planning time
* Encourages consistency
* Real-world AI application

---

## 👩‍💻 Author

Payal Kumari
https://github.com/PayalKumari10

---

## 📄 License

MIT License
