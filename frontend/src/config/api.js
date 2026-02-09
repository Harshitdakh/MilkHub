// This dynamically chooses between your Render backend or Localhost
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default API_URL;