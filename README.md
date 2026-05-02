# 🔗 URL Shortener Project

A simple and efficient **URL Shortener** built using **Node.js, Express, and MongoDB**. This project allows users to convert long URLs into short, shareable links and track how many times each link is accessed.

---

## 🚀 Features

* 🔹 Shorten long URLs into unique short links
* 🔹 Redirect users to the original URL using short link
* 🔹 Track number of visits (access count)
* 🔹 Update existing URLs and access count
* 🔹 RESTful API structure

---

## 🛠️ Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose)
* **Utilities:** shortid

---

## ⚙️ Installation & Setup

1. Clone the repository:

```
git clone <your-repo-link>
cd url-shortener
```

2. Install dependencies:

```
npm install
```

3. Start MongoDB (make sure it's running locally):

```
mongodb://localhost:27017/urlshortener
```

4. Run the server:

```
node app.js
```

Server will start at:

```
http://localhost:3000
```

---

## 📌 API Endpoints

### 1️⃣ Create Short URL

**POST** `/shortUrl`

**Request Body:**

```json
{
  "longUrl": "https://example.com"
}
```

**Response:**

```json
{
  "shortUrl": "http://localhost:3000/abc123"
}
```

---

### 2️⃣ Redirect to Original URL

**GET** `/:shortId`

* Redirects to the original URL
* Increments access count

---

### 3️⃣ Update URL or Access Count

**PATCH** `/:shortId`

**Request Body (optional fields):**

```json
{
  "longUrl": "https://newurl.com",
  "accessCount": 10
}
```

**Response:**

```json
{
  "_id": "...",
  "longUrl": "...",
  "shortId": "...",
  "accessCount": 10
}
```

---

## 🗄️ Database Schema

```js
{
  longUrl: String,
  shortId: String,
  accessCount: Number (default: 0)
}
```

---

## 📊 How It Works

1. User sends a long URL via POST request
2. Server generates a unique `shortId` using **shortid**
3. Data is stored in MongoDB
4. Short URL is returned to the user
5. When accessed:

   * Server finds matching `shortId`
   * Increments `accessCount`
   * Redirects to original URL

---

## ❗ Error Handling

* Returns `404` if URL is not found
* Handles missing or invalid inputs

---

## 💡 Future Improvements

* Add custom short URLs
* Add expiration for links
* User authentication system
* Analytics dashboard (click stats, location, etc.)
* QR code generation

---

## 👨‍💻 Author

Developed as a simple backend project to understand:

* REST APIs
* MongoDB integration
* URL redirection logic

---

## 📜 License

This project is open-source and free to use.

---

⭐ If you found this helpful, consider giving it a star!
