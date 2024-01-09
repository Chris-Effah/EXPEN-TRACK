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
    
