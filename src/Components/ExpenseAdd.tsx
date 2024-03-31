import React from "react";
import { Box, Button, FormControl, Stack, TextField, Typography } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import Alert from '@mui/material/Alert';


type ExpenseType = {
    details: string;
    amount: number;
}

type Expense = {
    id: string;
    details: string;
    amount: number;
    createdAt: string;
}

type Props = {
    handleSetExpense: (expense: Expense) => void;
}

export default function ExpenseAdd({ handleSetExpense }: Props) {
    const [expense, setExpense] = React.useState<ExpenseType>({
        details: "",
        amount: 0,
    });
    const [showWarning, setShowWarning] = React.useState<boolean>(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setExpense(prevExpense => ({
            ...prevExpense,
            [name]: name === 'amount' ? parseFloat(value) : value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (expense.amount !== 0 && expense.details !== "") {
            const newExpense = {
                ...expense,
                id: new Date().getTime().toString(),
                createdAt: new Date().toLocaleString()
            };
            handleSetExpense(newExpense);
        } else {
            setShowWarning(true);
            setTimeout(() => {
                setShowWarning(false);
            }, 2000);
        }
    };

    return (
        <Box sx={{ width: { xs: '100%', md: '100%', lg: '50%' } }} border='1px solid white' p={2} borderRadius='0.5rem' height='80vh'>
            <FormControl fullWidth >
                <Stack justifyContent='center' alignItems='center' gap={2}>
                    <Typography variant="h6"> Add Expense</Typography>
                    <TextField
                        id="outlined-basic"
                        label="Expense Details"
                        variant="outlined"
                        name='details'
                        value={expense.details}
                        onChange={handleInputChange}
                        sx={{ paddingBottom: '1rem', width: '100%' }}
                    />
                    <TextField
                        id="outlined-number"
                        label="Amount"
                        type="number"
                        name='amount'
                        variant="outlined"
                        value={expense.amount}
                        onChange={handleInputChange}
                        sx={{ paddingBottom: '1rem', width: '100%' }}
                    />
                    <Button variant="contained" endIcon={<SendIcon />} sx={{ width: '50%' }} onClick={handleSubmit}>
                        Send
                    </Button>
                </Stack>
            </FormControl>
            {showWarning && <Box pt={4}>
                <Alert variant="outlined" severity="warning">
                    Please fill all the fields and amount should not be zero.
                </Alert>
            </Box>}
        </Box>
    );
}
