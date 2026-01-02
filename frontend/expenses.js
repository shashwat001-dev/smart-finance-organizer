/* ============================================================
   ADD EXPENSE (Button-based, matches your HTML)
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {

    const addBtn = document.getElementById("addExpenseBtn");

    if (addBtn) {
        addBtn.addEventListener("click", function () {

            const title = document.getElementById("title").value.trim();
            const amount = document.getElementById("amount").value.trim();
            const category = document.getElementById("category").value.trim();
            const date = document.getElementById("date").value.trim();

            if (!title || !amount || !category || !date) {
                alert("Please fill all required fields.");
                return;
            }

            const payload = { title, amount, category, date };

            fetch(`${API_BASE_URL}/api/transactions`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                },
                body: JSON.stringify(payload)
            })
                .then(res => res.json())
                .then(() => {
                    alert("Expense Added");
                    loadExpensesTable();
                })
                .catch(err => console.log("Error adding expense:", err));
        });
    }
});


/* ============================================================
   LOAD TABLE (Matches your HTML table ID)
   ============================================================ */
function loadExpensesTable() {
    const tableBody = document.getElementById("expenseTableBody");
    if (!tableBody) return;

    const catFilter = document.getElementById("filterCategory").value;
    const fromFilter = document.getElementById("filterFrom").value;
    const toFilter = document.getElementById("filterTo").value;

    fetch(`${API_BASE_URL}/api/transactions`, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    })
        .then(res => res.json())
        .then(data => {

            let filtered = data;

            if (catFilter) filtered = filtered.filter(tx => tx.category === catFilter);
            if (fromFilter) filtered = filtered.filter(tx => tx.date >= fromFilter);
            if (toFilter) filtered = filtered.filter(tx => tx.date <= toFilter);

            tableBody.innerHTML = "";

            filtered.forEach(tx => {
                const tr = document.createElement("tr");

                tr.innerHTML = `
                    <td>${tx.title}</td>
                    <td>₹${tx.amount}</td>
                    <td>${tx.category}</td>
                    <td>${tx.date}</td>
                    <td><button class="delete-btn" onclick="deleteExpense(${tx.id})">Delete</button></td>
                `;

                tableBody.appendChild(tr);
            });
        });
}


/* ============================================================
   DELETE EXPENSE
   ============================================================ */
function deleteExpense(id) {
    fetch(`${API_BASE_URL}/api/transactions/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    })
        .then(res => res.json())
        .then(() => {
            alert("Deleted Successfully");
            loadExpensesTable();
        })
        .catch(err => console.log("Error deleting:", err));
}


/* ============================================================
   FILTER BUTTONS
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
    const applyBtn = document.getElementById("applyFiltersBtn");
    const clearBtn = document.getElementById("clearFiltersBtn");

    if (applyBtn) {
        applyBtn.addEventListener("click", loadExpensesTable);
    }

    if (clearBtn) {
        clearBtn.addEventListener("click", () => {
            document.getElementById("filterCategory").value = "";
            document.getElementById("filterFrom").value = "";
            document.getElementById("filterTo").value = "";
            loadExpensesTable();
        });
    }

    loadExpensesTable();
});
