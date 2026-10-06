// 更新年份，并提供浅色 / 深色模式切换。
const year = document.querySelector("#year");
if (year) year.textContent = String(new Date().getFullYear());

const themeButton = document.querySelector("#theme-toggle");
const themeKey = "personal-site-theme";

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  if (themeButton) {
    themeButton.setAttribute("aria-pressed", String(theme === "dark"));
    const label = theme === "dark" ? "切换到浅色模式" : "切换到深色模式";
    themeButton.setAttribute("aria-label", label);
    themeButton.title = label;
  }
}

// 浏览器禁止本地存储时，仍然可以正常切换。
let savedTheme = null;
try {
  savedTheme = localStorage.getItem(themeKey);
} catch {
  savedTheme = null;
}

applyTheme(savedTheme === "dark" ? "dark" : "light");

if (themeButton) {
  themeButton.hidden = false;
  themeButton.addEventListener("click", () => {
    const theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(theme);
    try {
      localStorage.setItem(themeKey, theme);
    } catch {
      // 本地存储不可用时，无需中断页面交互。
    }
  });
}
