import { useState, useEffect } from "react";
import { Container, Stack, Typography } from "@mui/material";
import ExpenseAdd from "./Components/ExpenseAdd";
import ExpenseHistory from "./Components/ExpenseHistory";

type Expense = {
  id: string;
  details: string;
  amount: number;
  createdAt: string;
}

function App() {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    try {
      const storedExpenses = localStorage.getItem("expenses");
      return storedExpenses ? JSON.parse(storedExpenses) : [];
    } catch (error) {
      return [];
    }
  });

  const [totalAmount, setTotalAmount] = useState<number>(() => {
    const storedTotalAmount = localStorage.getItem("totalAmount");
    return storedTotalAmount ? parseFloat(storedTotalAmount) : 0;
  });

  useEffect(() => {
    localStorage.setItem("totalAmount", totalAmount.toString());
  }, [totalAmount]);

  const handleSetExpense = (expense: Expense) => {
    setExpenses(prevExpenses => {
      const newExpenses = [expense, ...prevExpenses];
      setTotalAmount(prevTotal => prevTotal + expense.amount);
      localStorage.setItem('expenses', JSON.stringify(newExpenses));
      return newExpenses;
    });
  };

  const handleDeleteExpense = (id: string, amount: number) => {
    setExpenses(prevExpenses => {
      const updatedExpenses = prevExpenses.filter(exp => exp.id !== id);
      setTotalAmount(prevTotal => prevTotal - amount);
      localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
      return updatedExpenses;
    });
  }

  return (
    <Container>
      <Stack justifyContent='center' alignItems='center' py={2}>
        <Typography variant="h5">Total Amount
          <Stack justifyContent='center' alignItems='center'>
            <Typography variant="h5" px={2} py={0.5} borderRadius='0.5rem' sx={{ color: "white", backgroundColor: totalAmount > 0 ? "green" : totalAmount < 0 ? "red": "" }}> &#x20b9; {totalAmount}</Typography>
          </Stack>
        </Typography>
      </Stack>
      <Stack justifyContent='center' alignItems='center' sx={{ flexDirection: { xs: 'column', md: 'row', lg: 'row' }, gap: '1rem' }}>
        <ExpenseAdd handleSetExpense={handleSetExpense} />
        <ExpenseHistory expenses={expenses} handleDeleteExpense={handleDeleteExpense} />
      </Stack>
    </Container>
  );
}

export default App;
