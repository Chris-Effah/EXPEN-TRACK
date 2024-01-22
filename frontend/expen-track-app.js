#initializing expenses array to store entered expenses
let expenses = [];

#adding expenses functionality
document.getElementById("expensesForm").addEventListener("submit", function(event) {
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
		date: new Date().toLocaleDateString() // Today's date
	};
	expenses.push(newExpense);
	displayExpenses();
}

// Function to delete expense
function deleteExpense(index) {
	expenses.splice(index, 1);
	displayExpenses();
}

// Function to edit expense
function editExpense(index, updatedExpense) {
	expenses[index] = updatedExpense;
	displayExpenses();
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
			const updatedAmount = prompt("Enter updated amount:", expense.amount);
			const updatedDescription = prompt("Enter updated description:", expense.description);
			const updatedCategory = prompt("Enter updated category:", expense.category);

			if (updatedAmount && updatedDescription && updatedCategory) {
				editExpense(index, {
					amount: parseFloat(updatedAmount),
					description: updatedDescription,
					category: updatedCategory,
					date: expense.date
				});
			} else {
				alert("Please fill in all fields!");
			}
		});

		expenseItem.appendChild(deleteButton);
		expenseItem.appendChild(editButton);
		expensesList.appendChild(expenseItem);
	});
}

// Function to add category
document.getElementById("categoryForm").addEventListener("submit", function(event) {
	event.preventDefault();

	const newCategoryInput = document.getElementById("newCategory");
	const newCategory = newCategoryInput.value.trim();

	if (newCategory) {
		if (!expenses.some(expense => expense.category === newCategory)) {
			const categoriesList = document.getElementById("categoriesList");
			const categoryItem = document.createElement("li");
			categoryItem.textContent = newCategory;
			categoriesList.appendChild(categoryItem);

			newCategoryInput.value = "";
		} else {
			alert("Category already exists!");
		}
	} else {
		alert("Please enter a category!");
	}
});

// Initial display of expenses
displayExpenses();

