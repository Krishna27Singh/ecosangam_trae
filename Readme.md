# 🌿 EcoSangam – AI-Powered Sustainability Platform

## 🌍 Overview

**EcoSangam** is an AI-driven sustainability platform that empowers individuals to track, manage, and offset their carbon footprint. It bridges awareness with action by helping users set eco-goals, contribute to verified offset programs, and stay consistently engaged through gamified features and AI support.

Our vision: **Make sustainability accessible, actionable, and impactful for everyone.**

---

## 💡 What EcoSangam Does

- 🌱 **Track & Visualize Carbon Footprint**  
  Input lifestyle habits and view detailed breakdowns across categories like **transportation**, **home energy**, **food**, etc.

- ⚖️ **Offset Emissions**  
  Easily contribute any amount towards **vetted carbon offset programs** and receive verifiable certificates.

- 🎯 **Set Eco Goals & Earn Streaks**  
  Gamified goal system to **build sustainable habits** and **reward consistency** with streaks and achievement badges.

- 🤖 **AI Sustainability Assistant**  
  Integrated chatbot using **Botpress + Gemini/OpenAI APIs** that gives:
  - Personalized sustainability tips
  - Weekly/monthly insights
  - Smart query responses

- 📝 **Environmental Issue Reporting**  
  Users can raise local environmental issues, which are forwarded to **official government portals** (MoEFCC, CPCB) via our AI agent.

- 📸 **Community Features**  
  Share your **eco-stories**, progress, and motivate others in the community feed.

---

## 💻 Tech Stack

### ⚙️ Backend
- **Node.js** + **Express.js**
- **OAuth 2.0** Authentication + **JWT**
- **Nodemailer** (for communication)
- **pdf-lib** (for generating eco-certificates)
- **Langchain**, **Gemini API**, **OpenAI** (for AI assistant)

### 🧠 AI Chatbot
- **Botpress** (custom AI workflows and chat flows)

### 🌐 Frontend
- **React.js**
- **TailwindCSS** (UI styling)
- **Framer Motion** (animations)

### 📦 Database
- **MongoDB Atlas**

---

## 🚀 Challenges We Faced

- 🌐 **Real-Time Carbon Calculation**  
  Mapping real-world activities to emissions data required research and normalization of various data sources.

- 🧠 **AI Personalization**  
  Building a smart and reliable assistant for sustainability queries involved prompt engineering, fallback systems, and tuning multiple APIs.

- 🎨 **Accessible & Inclusive UI**  
  Ensuring the interface is usable across all demographics, including screen-reader support, light/dark modes, and inclusive language.

- 📤 **Government Integration**  
  Automating issue escalation to official portals like **MoEFCC** and **CPCB** through APIs and email logic was tricky but impactful.

---


## 📢 Let’s Keep Building Tech That Matters
