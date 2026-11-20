// Sample income and expense transactions; amounts are stored in cents.
const transactions = [
  {
    id: 1,
    note: 'Salary',
    category: 'Income',
    type: 'income',
    amountCents: 30000,
  },
  {
    id: 2,
    note: 'Lunch',
    category: 'Food',
    type: 'expense',
    amountCents: 450,
  },
  {
    id: 3,
    note: 'Bus',
    category: 'Transport',
    type: 'expense',
    amountCents: 150,
  },
  {
    id: 4,
    note: 'Notebook',
    category: 'Study',
    type: 'expense',
    amountCents: 300,
  },
];

// Formats an amount in cents as a dollar value with two decimal places.
function formatMoney(cents) {
  const sign = cents < 0 ? '-' : '';
  return sign + '$' + (Math.abs(cents) / 100).toFixed(2);
}

// Returns the sum of the amountCents values for all transactions in the list.
function totalCents(list) {
  return list.reduce((sum, tx) => sum + tx.amountCents, 0);
}

// Returns all transactions that match the specified category.
function fitlerByCategory(list, category) {
  return list.filter((tx) => tx.category === category);
}

// Return all transactions that match the specified type
function filterByType(list, type) {
  return list.filter((tx) => tx.type === type);
}

// Returns the total income, total expenses, remaining balance, and transaction count.
function summarize(list) {
  const incomeCents = totalCents(filterByType(list, 'income'));
  const expenseCents = totalCents(filterByType(list, 'expense'));
  return {
    incomeCents: incomeCents,
    expenseCents: expenseCents,
    balanceCents: incomeCents - expenseCents,
  };
}

// Returns a new transaction list with the transaction added.
function addTransaction(list, tx) {
  return [...list, tx];
}

// Creates a new array containing the note from each transaction.
const notes = transactions.map((tx) => tx.note);

// Returns the largest expense transaction, or undefined if there are no expenses.

// Checks whether the actual value matches the expected value and logs the result.
function check(name, actual, expected) {
  const ok = actual === expected;
  console.log(
    ok ? '✓' : '✗',
    name,
    ok ? '' : `(expected ${expected}, got ${actual})`,
  );
}

// Check that 450 cents are formatted as $4.50.
check('Format 450', formatMoney(450), '$4.50');

// Check that the total for all transactions is calculated correctly.
check('Total of all', totalCents(transactions), 30900);
// Check that an empty transaction list has a total of zero.
check('Total of empty list', totalCents([]), 0);

// Check that exactly one transaction belongs to the Food category.
check('Food count', fitlerByCategory(transactions, 'Food').length, 1);

// Check that exactly one transaction belongs to the expense type.
check('Expense Count', filterByType(transactions, 'expense').length, 3);
console.log(filterByType(transactions, 'income'));
console.log(filterByType(transactions, 'expense'));

// Check that the summary returns the correct remaining balance.
check('Balance', summarize(transactions).balanceCents, 29100);
console.log(summarize(transactions));

// Check that adding a transaction increases the list length to five.
check(
  'new length',
  addTransaction(transactions, {
    id: 5,
    note: 'Notebook',
    category: 'Study',
    type: 'expense',
    amountCents: 300,
  }).length,
  5,
);

// Check that adding a transaction does not modify the original transaction list.
check('original length', transactions.length, 4);

// Check that the notes list contains all transaction notes in the original order.
check('notes', notes.join(','), 'Salary,Lunch,Bus,Notebook');
