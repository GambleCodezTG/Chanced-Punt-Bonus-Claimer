
async function claim(site) {
    const input = document.getElementById('codeInput');
    const tooltipFallback = document.getElementById('tooltip-fallback');
    tooltipFallback.classList.add('hidden');
    let code = input.value.trim();

    if (!code) {
        try {
            const permission = await navigator.permissions.query({ name: "clipboard-read" });
            if (permission.state === "granted" || permission.state === "prompt") {
                const text = await navigator.clipboard.readText();
                if (text) {
                    code = text.trim();
                    localStorage.setItem("lastBonusCode", code);
                }
            } else {
                tooltipFallback.classList.remove('hidden');
                return;
            }
        } catch (e) {
            tooltipFallback.classList.remove('hidden');
            return;
        }
    }

    if (code) {
        const base = site === "chanced" ? "https://www.chanced.com/?rbc=" : "https://www.punt.com/?rbc=";
        window.location.href = base + encodeURIComponent(code);
    }
}

// Autofill last used code
window.addEventListener("DOMContentLoaded", () => {
    const lastCode = localStorage.getItem("lastBonusCode");
    if (lastCode) {
        document.getElementById("codeInput").value = lastCode;
    }
});
