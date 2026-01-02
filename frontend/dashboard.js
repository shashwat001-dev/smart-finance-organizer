/* ============================================================
   FILTERS (needed for dashboard too because loadTransactions uses them)
   ============================================================ */
let filterCategory = "";
let filterFrom = "";
let filterTo = "";
let monthlyBudget = 0;

fetch(`${API_BASE_URL}/api/budget`, {
    headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
    }
})
    .then(res => res.json())
    .then(data => {
        monthlyBudget = Number(data.amount || 0);
        checkBudgetAlert();
    });

/* ============================================================
   LOAD TRANSACTIONS + DASHBOARD TOTALS + CHARTS
   ============================================================ */
function loadTransactions() {
    fetch(`${API_BASE_URL}/api/transactions`, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token") // ✅ HERE
        }
    })
        .then(res => res.json())
        .then(data => {

            let filteredData = data;

            if (filterCategory !== "")
                filteredData = filteredData.filter(tx => tx.category === filterCategory);

            if (filterFrom !== "")
                filteredData = filteredData.filter(tx => tx.date >= filterFrom);

            if (filterTo !== "")
                filteredData = filteredData.filter(tx => tx.date <= filterTo);

            let totalExpense = 0;
            let categoryTotals = {};
            let monthlyTotal = 0;

            const today = new Date();
            const currentMonth = String(today.getMonth() + 1).padStart(2, "0");
            const currentYear = today.getFullYear();

            filteredData.forEach(tx => {
                totalExpense += Number(tx.amount);

                if (!categoryTotals[tx.category]) {
                    categoryTotals[tx.category] = 0;
                }
                categoryTotals[tx.category] += Number(tx.amount);

                const [year, month] = tx.date.split("-");
                if (year == currentYear && month == currentMonth) {
                    monthlyTotal += Number(tx.amount);
                }
            });

            document.getElementById("totalExpense").innerText = "₹" + totalExpense;
            document.getElementById("foodTotal").innerText = "₹" + (categoryTotals["Food"] || 0);
            document.getElementById("travelTotal").innerText = "₹" + (categoryTotals["Travel"] || 0);
            document.getElementById("shoppingTotal").innerText = "₹" + (categoryTotals["Shopping"] || 0);
            document.getElementById("utilitiesTotal").innerText = "₹" + (categoryTotals["Utilities"] || 0);
            document.getElementById("monthlyTotal").innerText = "₹" + monthlyTotal;

            // Delay budget calculation to allow DOM updates
            setTimeout(checkBudgetAlert, 20);

            updateCharts(categoryTotals, monthlyTotal);
        })
        .catch(err => console.log("Backend fetch error:", err));
}

loadTransactions();

/* ============================================================
   CHARTS (Dashboard Only)
   ============================================================ */
let categoryChart;
let monthlyChart;

function updateCharts(categoryTotals, monthlyTotal) {
    if (categoryChart) categoryChart.destroy();
    if (monthlyChart) monthlyChart.destroy();

    const ctx1 = document.getElementById("categoryChart");
    const ctx2 = document.getElementById("monthlyChart");

    if (!ctx1 || !ctx2) return;

    categoryChart = new Chart(ctx1, {
        type: "pie",
        data: {
            labels: Object.keys(categoryTotals),
            datasets: [{
                data: Object.values(categoryTotals),
                backgroundColor: ["#3b82f6", "#10b981", "#f97316", "#ef4444", "#8b5cf6"]
            }]
        }
    });

    monthlyChart = new Chart(ctx2, {
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

/* ============================================================
   BUDGET ALERT (Dashboard version - only updates small card)
   ============================================================ */
function checkBudgetAlert() {

    const dashTitle = document.getElementById("dashAlertTitle");
    const dashMsg = document.getElementById("dashAlertMessage");
    const statusBox = document.getElementById("budgetStatusBox");

    // RESET styles (white neutral)
    statusBox.style.background = "#fff";
    statusBox.style.borderLeft = "6px solid #ddd";
    dashTitle.style.color = "#000";
    dashMsg.style.color = "#555";

    // No budget?
    if (!monthlyBudget || monthlyBudget <= 0) {
        dashTitle.innerText = "Budget Status";
        dashMsg.innerText = "No budget set";
        return;
    }

    const currentMonthTotal = Number(
        document.getElementById("monthlyTotal").innerText.replace("₹", "")
    );

    const safeLimit = monthlyBudget * 0.6;

    // 🟢 WITHIN BUDGET (GREEN)
    if (currentMonthTotal <= safeLimit) {
        dashTitle.innerText = "Within Budget";
        dashMsg.innerText = `₹${currentMonthTotal} / ₹${monthlyBudget}`;

        statusBox.style.background = "#e6f8ed";
        statusBox.style.borderLeft = "6px solid #22c55e";
        dashTitle.style.color = "#15803d";
    }

    // 🟡 WARNING (YELLOW)
    else if (currentMonthTotal <= monthlyBudget) {
        dashTitle.innerText = "Warning";
        dashMsg.innerText = `₹${currentMonthTotal} / ₹${monthlyBudget}`;

        statusBox.style.background = "#fff7d6";
        statusBox.style.borderLeft = "6px solid #facc15";
        dashTitle.style.color = "#b45309";
    }

    // 🔴 EXCEEDED (RED)
    else {
        const exceeded = currentMonthTotal - monthlyBudget;
        dashTitle.innerText = "Budget Exceeded";
        dashMsg.innerText = `Exceeded by ₹${exceeded}`;

        statusBox.style.background = "#ffe4e6";
        statusBox.style.borderLeft = "6px solid #ef4444";
        dashTitle.style.color = "#b91c1c";
    }
}



