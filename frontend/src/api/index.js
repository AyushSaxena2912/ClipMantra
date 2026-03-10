//export const API_BASE = "https://clipmantra-backend-production.up.railway.app/api";

export const API_BASE = import.meta.env.VITE_API_BASE;

export const getToken = () => localStorage.getItem("clipify_token");
export const saveToken = (t) => localStorage.setItem("clipify_token", t);
export const removeToken = () => localStorage.removeItem("clipify_token");
export const getUser = () => {
  try { return JSON.parse(localStorage.getItem("clipify_user") || "null"); }
  catch { return null; }
};
export const saveUser = (u) => localStorage.setItem("clipify_user", JSON.stringify(u));
export const removeUser = () => localStorage.removeItem("clipify_user");

export const api = async (path, opts = {}) => {
  const token = getToken();
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...opts,
  });
  const data = await res.json();
  return { ok: res.ok, status: res.status, data };
};
