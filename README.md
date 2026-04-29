# 📡 Distributed Service Health Monitor

A lightweight, real-time monitoring utility designed to track the availability and latency of distributed microservices. This tool provides an automated "Pulse Check" for external APIs and internal services.

## 🛠 Advanced Features
- **Concurrent Health Checks**: Uses `Promise.all` to ping multiple endpoints simultaneously, ensuring high performance.
- **Latency Tracking**: Measures exact response times in milliseconds to identify performance bottlenecks.
- **Resilient Error Handling**: Distinguishes between HTTP errors (404, 500) and connection timeouts.
- **Auto-Refreshing Dashboard**: Implements a frontend polling mechanism to update service status every 5 seconds.

## 🚀 Setup
1. **Initialize**:
   ```bash
   npm install express axios
   ```
2. **Launch**:
   ```bash
   node server.js
   ```
3. **Access**: Navigate to `http://localhost:5050` to see the live console.

## 📑 Use Case
This tool is intended for infrastructure teams to visualize system health. It replaces the need for heavy enterprise monitoring tools for small-to-mid-sized internal projects.

## 📝 Technical Note
The core logic utilizes an `async/await` wrapper around `axios` with a strict 5000ms timeout to prevent hanging connections from stalling the monitoring loop.

## License
MIT
