React Power Plants Map Frontend
A React TypeScript web application providing an interactive map view of U.S. power plants, integrating with a backend API for plant data. Uses LeafletJS for map rendering and visualizes top plants and state-specific data.

Features
Fetches plant data and state lists from backend REST API

Displays power plants as markers on a Leaflet map

Supports filtering plants by state

Zooms map to selected state or nationwide view

Handles API authentication via Bearer token in headers


Getting Started
Prerequisites
Node.js (v22 recommended)
npm 

Access to backend API (running separately)

Setup
Clone the frontend repo

bash
git clone https://github.com/munshinuwed/power-plant-map.git
cd power-plant-map

Install dependencies

bash
npm install

Configure environment variables( you can skip this step, all env vars are set to defaults.)


Run the development server

bash
npm start

Open http://localhost:5174 in your browser.

Available Scripts

npm run build — Bundles the app for production into /build

npm run dev — Starts the app in development mode with hot reloading

Deployment

Build the image using

docker build -t power-plants-map .

Run the container using

docker run -p 80:80 power-plants-map
