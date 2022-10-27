import authApi from "../api/authApi";

export const authUtils = {
  isAuthenticated: async() => {
    const token = localStorage.getItem('token');

    if (!token) {
      return false;
    }

    try {
      const res = await authApi.verifyToken();
      if (res.data.msg) {
        return false;
      }
      return res.data.user;
    } catch (error) {
      console.log(error);
    }
  }
}