# Weather Forecasting Web App

## 🌍 Overview
This web application provides an interactive weather forecasting platform using **React** and **Mapbox**. It allows users to visualize weather data, overlay model outputs, and manually draw annotations for weather events such as storms or typhoons.

## 🚀 Features
- **Interactive Map** (Mapbox integration)
- **Weather Model Overlay** (Future implementation)
- **User Annotations** (Draw on the map with customizable tools)
- **Sidebar Navigation** (Access various tools & settings)
- **Drawing Controls** (Start, Stop, and Clear drawings)
- **Responsive UI** (Optimized for different screen sizes)

## 📂 Project Structure
```
📦 project-root
 ┣ 📂 public
 ┃ ┗ 📜 index.html
 ┣ 📂 src
 ┃ ┣ 📂 components
 ┃ ┃ ┣ 📜 Navbar.jsx
 ┃ ┃ ┣ 📜 Sidebar.jsx
 ┃ ┃ ┣ 📜 MapContainer.jsx
 ┃ ┃ ┗ 📜 DrawingOverlay.jsx
 ┃ ┣ 📂 styles
 ┃ ┃ ┗ 📜 styles.css
 ┃ ┣ 📜 App.jsx
 ┃ ┗ 📜 main.jsx
 ┣ 📜 package.json
 ┣ 📜 README.md
 ┗ 📜 vite.config.js
```

## 🛠 Installation & Setup
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/weather-forecasting-app.git
cd weather-forecasting-app
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Add Mapbox Access Token
1. Create a `.env` file in the root directory.
2. Add your **Mapbox Token**:
   ```sh
   VITE_MAPBOX_ACCESS_TOKEN=your_mapbox_token_here
   ```

### 4️⃣ Start the Development Server
```sh
npm run dev
```

## 🎨 Usage
1. Navigate to the **Sidebar** to select different tools.
2. Use the **Map** to interact with weather models and overlays.
3. Click **Start Drawing** to annotate potential storm areas.
4. Click **Clear All** to remove all annotations.

## 🛠 Technologies Used
- **React** (Frontend Framework)
- **Mapbox GL JS** (Interactive Mapping)
- **Tailwind CSS** (Styling)
- **Vite** (Bundler)

## 📝 To-Do List
- [ ] Integrate live weather model data
- [ ] Improve drawing tools (e.g., different colors, shapes)
- [ ] Add export/save functionality for drawings

## 📜 License
This project is licensed under the **MIT License**.

## 🙌 Contributing
Feel free to submit issues or pull requests to improve the app!
