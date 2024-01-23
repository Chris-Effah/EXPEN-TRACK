// initializing expenses array to store entered expenses
let expenses = [];

// Function to fetch expenses from the backend
function fetchExpenses() {
    fetch("/get_expenses")
        .then(response => response.json())
        .then(data => {
            expenses = data.expenses;
            displayExpenses();
        })
        .catch(error => console.error("Error fetching expenses:", error));
}

// Adding expenses functionality
document.getElementById("expensesForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const amount = document.getElementById("amount").value.trim();
    const description = document.getElementById("description").value.trim();
    const category = document.getElementById("category").value.trim();

    if (amount && description && category) {
        addExpense(amount, description, category);
        document.getElementById("amount").value = "";
        document.getElementById("description").value = "";
        document.getElementById("category").value = "";
    } else {
        alert("Please fill in all fields!");
    }
});

// Function to add a new expense
function addExpense(amount, description, category) {
    const newExpense = {
        amount: parseFloat(amount),
        description,
        category,
    };

    fetch("/add_expense", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newExpense),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
            fetchExpenses();  // Refresh the expenses list after adding
        })
        .catch(error => console.error("Error adding expense:", error));
}

// Function to delete expense
function deleteExpense(index) {
    fetch(`/delete_expense/${index}`, {
        method: "DELETE",
    })
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
            fetchExpenses();  // Refresh the expenses list after deleting
        })
        .catch(error => console.error("Error deleting expense:", error));
}

// Function to edit expense
function editExpense(index, updatedExpense) {
    fetch(`/edit_expense/${index}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedExpense),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
            fetchExpenses();  // Refresh the expenses list after editing
        })
        .catch(error => console.error("Error editing expense:", error));
}

// Function to display expenses with delete and edit buttons
function displayExpenses() {
    const expensesList = document.getElementById("expensesList");
    expensesList.innerHTML = "";

    expenses.forEach((expense, index) => {
        const expenseItem = document.createElement("div");
        expenseItem.classList.add("expense-item");
        expenseItem.innerHTML = `
            <p><strong>Amount:</strong> $${expense.amount}</p>
            <p><strong>Description:</strong> ${expense.description}</p>
            <p><strong>Category:</strong> ${expense.category}</p>
            <p><strong>Date:</strong> ${expense.date}</p>
        `;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => deleteExpense(index));

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", () => {
            // Your edit logic here
        });

        expenseItem.appendChild(deleteButton);
        expenseItem.appendChild(editButton);
        expensesList.appendChild(expenseItem);
    });
}

// Initial display of expenses
fetchExpenses();

