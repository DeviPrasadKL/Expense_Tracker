import { Box, Button, Stack, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

type Expense = {
    id: string;
    details: string;
    amount: number;
    createdAt: string;
}

type Props = {
    expenses: Expense[];
    handleDeleteExpense: (id: string, amount: number) => void;
}

export default function ExpenseHistory({ expenses, handleDeleteExpense }: Props) {

    return (
        <Box sx={{width:{ xs: '100%', md: '100%', lg: '50%' }}} border='1px solid white' p={2} borderRadius='0.5rem' height='80dvh'>
            <Box display='flex' alignItems='center' justifyContent='center' mb={2}>
                <Typography variant="h6"> Expense History</Typography>
            </Box>
            <Box sx={{ overflowY: 'scroll', '&::-webkit-scrollbar': { width: '6px' }, '&::-webkit-scrollbar-thumb': { backgroundColor: '#424242' } }} height='91%'>
                <Stack justifyContent='center' alignItems='center'>
                    {expenses?.map((exp) => {
                        return (
                            <Stack key={exp.id} flexDirection='row' alignItems='center' justifyContent='space-around' border='0.5px solid' borderRadius='0.5rem' width='70%' p={1} mb={1} sx={{borderColor: exp.amount < 0 ? '#ffaeae' : '#7fe47f'}}>
                                <Stack flexDirection='row' alignItems='center' gap={2}>
                                    <Box sx={{ height: '5rem', width: '1rem', backgroundColor: exp.amount < 0 ? 'red' : 'green', borderRadius:'1rem' }}></Box>
                                    <Box>
                                        <Typography variant="h6">{exp.details}</Typography>
                                        <Typography variant="h6" sx={{ color: exp.amount < 0 ? 'red' : 'green' }}>{exp.amount}</Typography>
                                        <Typography variant="caption">{exp.createdAt}</Typography>
                                    </Box>
                                </Stack>
                                <Box>
                                    <Button variant="outlined" onClick={() => handleDeleteExpense(exp.id, exp.amount)}><DeleteIcon /></Button>
                                </Box>
                            </Stack>
                        )
                    })}
                </Stack>
            </Box>
        </Box>
    );
}
