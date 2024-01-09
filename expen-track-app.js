#initializing expenses array to store entered expenses
let expenses = [];

#adding expenses functionality
docu.getElementById("expensesForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const amount = doc.getElementById("amount").value.trim();
    const description =
