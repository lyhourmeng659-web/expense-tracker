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

function formatMoney(cents) {
  const sign = cents < 0 ? '-' : '';
  return sign + '$' + (Math.abs(cents) / 100).toFixed(2);
}

console.log(formatMoney(transactions[1].amountCents));

// Returns the sum of all transaction amounts in cents.
function totalCents(transactions) {
  return transactions.reduce(
    (total, transaction) => total + transaction.amountCents,
    0,
  );
}
console.log(totalCents(transactions));

// Returns all transactions that match the specified category.
function filterByCategory(transactions, category) {
  return transactions.filter(
    (transaction) => transaction.category === category,
  );
}
console.log(filterByCategory(transactions, 'Income'));

// Returns the total income, total expenses, remaining balance, and transaction count.
function summarize(transactions) {
  const totals = transactions.reduce(
    (summary, transaction) => {
      if (transaction.type === 'income') {
        summary.totalIncome += transaction.amountCents;
      } else if (transaction.type === 'expense') {
        summary.totalExpense += transaction.amountCents;
      }

      return summary;
    },
    { totalIncome: 0, totalExpense: 0 },
  );

  return {
    ...totals,
    balance: totals.totalIncome - totals.totalExpense,
    transactionCount: transactions.length,
  };
}
console.log(summarize(transactions));

// Returns the largest expense transaction, or undefined if there are no expenses.
function biggestExpense(transactions) {
  return transactions.reduce((biggest, transaction) => {
    if (
      transaction.type === 'expense' &&
      (!biggest || transaction.amountCents > biggest.amountCents)
    ) {
      return transaction;
    }

    return biggest;
  }, undefined);
}

console.log(biggestExpense(transactions));
