const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzLOfvsMHYT3Nerh2sKWm6Ky0Xq6o0lLL9z9esFbAbhVzcdHowJNiqSkfRWih_Oslx8Ow/exec";

const DB = {
  save(key, value) {
    localStorage.setItem("valentine_" + key, JSON.stringify(value));
  },
  get(key) {
    const val = localStorage.getItem("valentine_" + key);
    return val ? JSON.parse(val) : null;
  },
  async sendAll() {
    const payload = {
      date: DB.get("date") || "",
      food: DB.get("food") || [],
      dessert: DB.get("dessert") || [],
      activities: DB.get("activities") || []
    };
    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "text/plain" }
      });
      ["date", "food", "dessert", "activities"].forEach(k =>
        localStorage.removeItem("valentine_" + k)
      );
    } catch (err) {
      console.error("Lỗi gửi dữ liệu:", err);
    }
  },
  async getAll() {
    const res = await fetch(SCRIPT_URL + "?action=get");
    const data = await res.json();
    return data;
  }
};
