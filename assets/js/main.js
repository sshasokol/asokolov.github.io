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

const themeIcons = {
    dark: `
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="4"></circle>
            <path d="M12 2v2"></path>
            <path d="M12 20v2"></path>
            <path d="m4.93 4.93 1.41 1.41"></path>
            <path d="m17.66 17.66 1.41 1.41"></path>
            <path d="M2 12h2"></path>
            <path d="M20 12h2"></path>
            <path d="m6.34 17.66-1.41 1.41"></path>
            <path d="m19.07 4.93-1.41 1.41"></path>
        </svg>
    `,
    light: `
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20.98 12.72A8.5 8.5 0 0 1 11.28 3.02 7.8 7.8 0 1 0 20.98 12.72Z"></path>
        </svg>
    `
};

function setTheme(theme) {
    document.body.classList.toggle("dark-mode", theme === "dark");
    localStorage.setItem("theme", theme);

    if (themeToggle) {
        themeToggle.innerHTML = themeIcons[theme];
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
