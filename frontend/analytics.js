/* ============================================================
   ANALYTICS PAGE - LOAD CHARTS
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
    if (!document.getElementById("categoryChart")) return;

    fetch(`${API_BASE_URL}/api/transactions`, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token") // ✅ HERE
        }
    })
        .then(res => res.json())
        .then(data => {
            let categoryTotals = {};
            let monthlyTotal = 0;

            const today = new Date();
            const currentMonth = String(today.getMonth() + 1).padStart(2, "0");
            const currentYear = today.getFullYear();

            data.forEach(tx => {
                if (!categoryTotals[tx.category]) {
                    categoryTotals[tx.category] = 0;
                }
                categoryTotals[tx.category] += Number(tx.amount);

                const [year, month] = tx.date.split("-");
                if (year == currentYear && month == currentMonth) {
                    monthlyTotal += Number(tx.amount);
                }
            });

            drawAnalyticsCharts(categoryTotals, monthlyTotal);
        });
});


/* ============================================================
   DRAW CHARTS FOR ANALYTICS PAGE
   ============================================================ */
function drawAnalyticsCharts(categoryTotals, monthlyTotal) {
    const ctx1 = document.getElementById("categoryChart");
    const ctx2 = document.getElementById("monthlyChart");

    if (!ctx1 || !ctx2) return;

    new Chart(ctx1, {
        type: "pie",
        data: {
            labels: Object.keys(categoryTotals),
            datasets: [{
                data: Object.values(categoryTotals),
                backgroundColor: ["#3b82f6", "#10b981", "#f97316", "#ef4444", "#8b5cf6"]
            }]
        }
    });

    new Chart(ctx2, {
        type: "bar",
        data: {
            labels: ["This Month"],
            datasets: [{
                label: "Amount (₹)",
                data: [monthlyTotal],
                backgroundColor: "#3b82f6"
            }]
        },
        options: {
            scales: { y: { beginAtZero: true } }
        }
    });
}

