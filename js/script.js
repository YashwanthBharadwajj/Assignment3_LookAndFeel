$(document).ready(function() {
    // Load categories and display them
    initializeCategories();
    // Load and display income and expenses
    displayIncome();
    displayExpenses();

    // Add event listeners for buttons and other interactive elements
    setUpEventListeners();
});

function setUpEventListeners() {
    // Event listeners for buttons and forms
    $('#addIncomeButton').click(function() {
        // Code to show add income modal
    });

    $('#addExpenseButton').click(function() {
        // Code to show add expense modal
    });

    $('#saveIncome').click(function() {
        // Code to save income
    });

    $('#saveExpense').click(function() {
        // Code to save expense
    });

    // Repeat for other interactive elements
}

function initializeCategories() {
    // Retrieve or default initialize categories
    var categories = JSON.parse(localStorage.getItem('categories')) || ["Groceries", "Rent", "Entertainment", "Transport", "Miscellaneous"];
    populateCategoryOptions(categories);
}

function displayIncome() {
    var incomeList = $('#incomeTable tbody');
    incomeList.empty();
    var income = JSON.parse(localStorage.getItem('income')) || [];
    income.forEach(function(entry) {
        incomeList.append(createIncomeRow(entry));
    });
}

function displayExpenses() {
    var expenseList = $('#expensesTable tbody');
    expenseList.empty();
    var expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.forEach(function(entry) {
        expenseList.append(createExpenseRow(entry));
    });
}

function populateCategoryOptions(categories) {
    var categorySelect = $('#category');
    categorySelect.empty();
    categories.forEach(function(category) {
        categorySelect.append(new Option(category, category));
    });
}

function createIncomeRow(entry) {
    return `<tr>
                <td>${entry.detail}</td>
                <td>$${entry.amount}</td>
                <td><button type="button" class="btn btn-danger deleteIncome" data-id="${entry.id}">Delete</button></td>
            </tr>`;
}

function createExpenseRow(entry) {
    return `<tr>
                <td>${entry.category}</td>
                <td>${entry.item}</td>
                <td>$${entry.amount}</td>
                <td><button type="button" class="btn btn-danger deleteExpense" data-id="${entry.id}">Delete</button></td>
            </tr>`;
}

function saveIncome(detail, amount) {
    var income = JSON.parse(localStorage.getItem('income')) || [];
    var newId = income.length + 1;
    income.push({ id: newId, detail, amount });
    localStorage.setItem('income', JSON.stringify(income));
    displayIncome();
}

function saveExpense(category, item, amount) {
    var expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    var newId = expenses.length + 1;
    expenses.push({ id: newId, category, item, amount });
    localStorage.setItem('expenses', JSON.stringify(expenses));
    displayExpenses();
}

$(document).on('click', '.deleteIncome', function() {
    var id = $(this).data('id');
    deleteIncome(id);
});

$(document).on('click', '.deleteExpense', function() {
    var id = $(this).data('id');
    deleteExpense(id);
});

function deleteIncome(id) {
    var income = JSON.parse(localStorage.getItem('income')) || [];
    var index = income.findIndex(function(entry) {
        return entry.id === id;
    });
    if (index !== -1) {
        income.splice(index, 1);
        localStorage.setItem('income', JSON.stringify(income));
        displayIncome();
    }
}

function deleteExpense(id) {
    var expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    var index = expenses.findIndex(function(entry) {
        return entry.id === id;
    });
    if (index !== -1) {
        expenses.splice(index, 1);
        localStorage.setItem('expenses', JSON.stringify(expenses));
        displayExpenses();
    }
}
















$(document).ready(function() {
    // Load and display income and expenses
    displayIncome();
    displayExpenses();

    // Bind the form submission to a handler function
    $('#subscriptionForm').submit(function(event) {
        // Prevent the default form submission
        event.preventDefault();

        // Capture the input values
        var details = $('#Details').val();
        var amount = $('#amount').val();

        // Call the function to save the new income entry
        saveIncome(details, amount);

        // Reset the form fields
        $('#Details').val('');
        $('#amount').val('');
    });

    // Other event handlers...
});

// Other functions...

function saveIncome(detail, amount) {
    // Check if the amount is a number and not empty
    if (!amount || isNaN(amount)) {
        alert("Please enter a valid number for the amount.");
        return;
    }
    
    var income = JSON.parse(localStorage.getItem('income')) || [];
    var newId = income.length > 0 ? Math.max(...income.map(i => i.id)) + 1 : 1; // Ensure a unique ID is assigned
    income.push({ id: newId, detail, amount: parseFloat(amount) });
    localStorage.setItem('income', JSON.stringify(income));
    displayIncome();
}

// Other functions...










function createIncomeRow(entry) {
    return `<tr>
                <td>${entry.detail}</td>
                <td>$${parseFloat(entry.amount).toFixed(2)}</td>
                <td>
                    <button type="button" class="btn btn-info btn-sm editIncome" data-id="${entry.id}">Edit</button>
                    <button type="button" class="btn btn-danger btn-sm deleteIncome" data-id="${entry.id}">Delete</button>
                </td>
            </tr>`;
}
function saveExpense() {
    var expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    var category = $('#category').val();
    var item = $('#item').val();
    var amount = parseFloat($('#amount').val());

    if (!category || !item || isNaN(amount)) {
        alert("Please enter valid expense details.");
        return;
    }

    var newId = expenses.length > 0 ? Math.max(...expenses.map(e => e.id)) + 1 : 1;
    expenses.push({ id: newId, category: category, item: item, amount: amount });
    localStorage.setItem('expenses', JSON.stringify(expenses));
    displayExpenses();
}

function createExpenseRow(expense) {
    if (!expense || typeof expense !== 'object' || isNaN(expense.amount)) {
        // Log the incorrect expense object to the console for debugging
        console.error('Invalid expense object:', expense);
        return ''; // Return an empty string to avoid creating a faulty table row
    }
    
    return `<tr>
                <td>${expense.category}</td>
                <td>${expense.item}</td>
                <td>$${expense.amount.toFixed(2)}</td>
                <td>
                    <button type="button" class="btn btn-info btn-sm editExpense" data-id="${expense.id}">Edit</button>
                    <button type="button" class="btn btn-danger btn-sm deleteExpense" data-id="${expense.id}">Delete</button>
                </td>
            </tr>`;
}

// Event listener for the save button
$('#saveExpense').click(function() {
    saveExpense();
});




$(document).ready(function() {
    // Other initializations...

    // Event delegation for the edit buttons
    $('#expensesTable').on('click', '.editExpense', function() {
        var id = $(this).data('id');
        editExpense(id);
    });

    $('#incomeTable').on('click', '.editIncome', function() {
        var id = $(this).data('id');
        editIncome(id);
    });

    // Other event listeners...
});

function editExpense(id) {
    var expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    var expenseToEdit = expenses.find(function(expense) {
        return expense.id === id;
    });

    if (expenseToEdit) {
        $('#category').val(expenseToEdit.category);
        $('#item').val(expenseToEdit.item);
        $('#amount').val(expenseToEdit.amount);
        $('#expenseId').val(expenseToEdit.id); // Assuming you have a hidden input for expenseId
        $('#expenseModal').modal('show');
    }
}

function editIncome(id) {
    var income = JSON.parse(localStorage.getItem('income')) || [];
    var incomeToEdit = income.find(function(entry) {
        return entry.id === id;
    });

    if (incomeToEdit) {
        $('#Details').val(incomeToEdit.detail); // Assuming Details is the id of your input for income details
        $('#amount').val(incomeToEdit.amount);
        $('#incomeId').val(incomeToEdit.id); // Assuming you have a hidden input for incomeId
        // Here you should show the modal or form for editing income
    }
}

// Add save/edit functions here...
