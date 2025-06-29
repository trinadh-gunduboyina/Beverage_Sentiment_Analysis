# 🧠 Customer Sentiment Analyzer

A full-stack AI-powered web app to **analyze and visualize customer sentiment** across beverage brands like Coca-Cola and Pepsi. Upload CSV reviews, get instant sentiment analysis, and download actionable insights in CSV/PDF format.

---

## ✨ Features

✅ **CSV Upload**
- Upload customer reviews in bulk using a simple drag-and-drop interface

✅ **Azure AI Sentiment Analysis**
- Automatically detect positive, negative, and neutral sentiments with Azure Cognitive Services

✅ **Brand-wise Summary**
- Interactive pie charts and tabular breakdown of sentiments per brand

✅ **Data Exports**
- Download sentiment reports in CSV and PDF

✅ **CI/CD**
- Automated GitHub Actions pipeline for build and deploy to Azure App Service

---

## 🛠 Tech Stack

**Frontend:**
- React.js
- Tailwind CSS
- Chart.js
- react-csv
- jsPDF

**Backend:**
- ASP.NET Core Web API (.NET 8)
- CsvHelper

**AI Integration:**
- Azure AI Language Service

**CI/CD:**
- GitHub Actions

**Cloud Hosting:**
- Azure App Service

---

## 📂 Project Structure

```
/sentiment-frontend      # React.js frontend
/Beverage_Customer_Sentiment_Analysis_API  # .NET 8 Web API backend
.github/workflows        # GitHub Actions workflows
```

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/trinadh-gunduboyina/Beverage_Sentiment_Analysis.git
cd Beverage_Sentiment_Analysis
```

---

### 2️⃣ Backend Setup (.NET API)

- Install .NET 8 SDK
- Create `appsettings.json` if needed (for Azure credentials)
- Build & Run:

```bash
cd Beverage_Customer_Sentiment_Analysis_API
dotnet restore
dotnet build
dotnet run
```

API will be available at:
```
https://localhost:5001/api/upload/reviews
```

---

### 3️⃣ Frontend Setup (React)

```bash
cd sentiment-frontend
npm install
npm start
```

Frontend runs on:
```
http://localhost:3000
```

---

## 📄 Example CSV Format

```
Id,Text,Brand
1,I love Pepsi Zero!,Pepsi
2,Coke is too sweet for me,Coca-Cola
3,Not a fan of Diet Pepsi,Pepsi
```

**Note:** `Text` column is required.

---

## 🌐 Live Demo

🔗 [Coming Soon](#)

---

## 🧩 How It Works

1. User uploads a `.csv` file via the React frontend
2. File is sent to ASP.NET Web API endpoint `/api/upload/reviews`
3. API parses CSV using CsvHelper
4. Azure AI Language Service analyzes sentiment
5. Processed records with sentiment labels returned
6. React displays summary charts and tables
7. Reports downloadable as CSV/PDF

---

## ⚙️ Deployment Pipeline

- **GitHub Actions:** Build & deploy backend to Azure App Service
- **Azure AI Integration:** Secured via environment variables
- **Frontend Deployment:** Host static React build (optional)

---

## 👨‍💻 Author

**Trinadh Gunduboyina**

## ⭐ Why This Project Matters

In today’s world, brands must **understand customer sentiment in real time**. This project demonstrates:
- Practical **AI Integration** for sentiment analysis
- Modern **full-stack development** in .NET & React
- Reusable **cloud deployment pipeline**

---

## 📘 License

MIT
