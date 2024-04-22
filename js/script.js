$(document).ready(function() {
    // Initialize categories from localStorage or default list and display them
    initializeCategories();

    // Display existing expenses from local storage or initialization
    displayExpenses();

    // Handle opening the add expense modal with form reset
    $('#addExpenseButton').click(function() {
        $('#expenseModal').modal('show');
        $('#expenseForm')[0].reset();
        $('#expenseId').val(''); // Ensure ID is cleared for adding a new expense
    });

    // Save or update an expense
    $('#saveExpense').click(function() {
        const id = $('#expenseId').val();
        const category = $('#category').val();
        const item = $('#item').val();
        const amount = parseFloat($('#amount').val());

        if (id) {
            editExpense(parseInt(id), category, item, amount);
        } else {
            addExpense(category, item, amount);
        }

        $('#expenseModal').modal('hide');
    });

    // Handle the edit button click to populate the form and show the modal
    $(document).on('click', '.editExpense', function() {
        const id = $(this).data('id');
        const expense = expenses.find(e => e.id === parseInt(id));
        if (expense) {
            $('#category').val(expense.category);
            $('#item').val(expense.item);
            $('#amount').val(expense.amount);
            $('#expenseId').val(expense.id);
            $('#expenseModal').modal('show');
        }
    });

    // Delete an expense with confirmation
    $(document).on('click', '.deleteExpense', function() {
        const id = $(this).data('id');
        if (confirm('Are you sure you want to delete this expense?')) {
            deleteExpense(parseInt(id));
        }
    });
});

function initializeCategories() {
    var categories = JSON.parse(localStorage.getItem('categories')) || ["Groceries", "Rent", "Entertainment", "Transport", "Miscellaneous"];
    var categorySelect = $('#category');
    var categoryList = $('#categoryList');

    categorySelect.empty();
    categoryList.empty();

    categories.forEach(function(category) {
        categorySelect.append(`<option value="${category}">${category}</option>`);
        categoryList.append(`<a href="expense_details.html?category=${category}" class="list-group-item list-group-item-action">${category}</a>`);
    });
}

function displayExpenses() {
    const expenseList = $('#incomeList');
    expenseList.empty();
    expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.forEach(expense => {
        expenseList.append(`<li class="list-group-item">
            ${expense.category} - ${expense.item} - $${expense.amount}
            <button type="button" class="btn btn-info btn-sm editExpense" data-id="${expense.id}">Edit</button>
            <button type="button" class="btn btn-danger btn-sm deleteExpense" data-id="${expense.id}">Delete</button>
        </li>`);
    });
}

function addExpense(category, item, amount) {
    const newId = expenses.length + 1;
    expenses.push({ id: newId, category, item, amount });
    localStorage.setItem('expenses', JSON.stringify(expenses));
    displayExpenses();
}

function editExpense(id, category, item, amount) {
    const index = expenses.findIndex(exp => exp.id === id);
    if (index !== -1) {
        expenses[index] = { id, category, item, amount };
        localStorage.setItem('expenses', JSON.stringify(expenses));
        displayExpenses();
    }
}

function deleteExpense(id) {
    expenses = expenses.filter(exp => exp.id !== id);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    displayExpenses();
}
