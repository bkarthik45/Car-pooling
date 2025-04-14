// src/utils/getUserIdFromToken.js
import { jwtDecode } from 'jwt-decode'; // ✅ correct

export const getUserIdFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.userID;
  } catch (error) {
    console.error("Invalid token");
    return null;
  }
};
