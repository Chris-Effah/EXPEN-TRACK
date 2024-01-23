from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

expenses = []

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/add_expense", methods=["POST"])
def add_expense():
    data = request.get_json()

    amount = data["amount"]
    description = data["description"]
    category = data["category"]

    new_expense = {
        "amount": amount,
        "description": description,
        "category": category,
        "date": "Today's date"
    }

    expenses.append(new_expense)

    return jsonify({"message": "Expense added successfully"})

@app.route("/get_expenses")
def get_expenses():
    return jsonify({"expenses": expenses})

@app.route("/delete_expense/<int:index>", methods=["DELETE"])
def delete_expense(index):
    if 0 <= index < len(expenses):
        expenses.pop(index)
        return jsonify({"message": "Expense deleted successfully"})
    else:
        return jsonify({"error": "Invalid index"}), 400

if __name__ == "__main__":
    app.run(debug=True)

