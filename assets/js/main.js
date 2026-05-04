const themeToggle = document.querySelector("[data-theme-toggle]");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
const savedTheme = localStorage.getItem("theme");
const pageLanguage = document.documentElement.lang || "en";

const themeLabels = {
    en: {
        dark: "Switch to light theme",
        light: "Switch to dark theme"
    },
    ru: {
        dark: "Переключить на светлую тему",
        light: "Переключить на темную тему"
    }
};

function setTheme(theme) {
    document.body.classList.toggle("dark-mode", theme === "dark");
    localStorage.setItem("theme", theme);

    if (themeToggle) {
        themeToggle.textContent = theme === "dark" ? "☀" : "☾";
        themeToggle.setAttribute("aria-label", themeLabels[pageLanguage]?.[theme] || themeLabels.en[theme]);
    }
}

setTheme(savedTheme || (prefersDark.matches ? "dark" : "light"));

themeToggle?.addEventListener("click", () => {
    const nextTheme = document.body.classList.contains("dark-mode") ? "light" : "dark";
    setTheme(nextTheme);
});

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.12 }
);

document.querySelectorAll(".fade-in").forEach((element) => revealObserver.observe(element));
