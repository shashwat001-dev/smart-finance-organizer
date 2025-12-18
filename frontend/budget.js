/* ============================================================
   BUDGET PAGE - SAVE BUDGET
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("budgetInput");
    const saveBtn = document.getElementById("saveBudgetBtn");
    const currentBudget = document.getElementById("currentBudget");

    if (!input || !saveBtn) return;
    fetch("http://localhost:3000/api/budget", {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    })
        .then(res => res.json())
        .then(data => {
            if (data.amount) currentBudget.innerText = data.amount;
        });



    saveBtn.addEventListener("click", () => {
        const val = input.value.trim();

        if (!val || val <= 0) {
            alert("Enter a valid budget amount");
            return;
        }


        fetch("http://localhost:3000/api/budget", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify({ amount: val })
        })
            .then(() => {
                currentBudget.innerText = val;
                alert("Monthly budget saved!");
            });

    });
});
