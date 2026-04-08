// ⚠️ Paste URL từ Google Apps Script vào đây
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzvOYUfKyEF3w1QB0hKRsZhgUAAtUpedSiwkJADdGcly9gsKjr61AdlWPPJDQs5aVm0mw/exec";

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
        body: JSON.stringify(payload),
        headers: { "Content-Type": "text/plain" }
      });
      // Clear data after sending
      ["date", "food", "dessert", "activities"].forEach(k =>
        localStorage.removeItem("valentine_" + k)
      );
    } catch (err) {
      console.error("Lỗi gửi dữ liệu:", err);
    }
  }
};
