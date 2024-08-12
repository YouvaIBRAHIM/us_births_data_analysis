import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { TableCellProps } from '@mui/material/TableCell';

interface StatsTableHeadProps {
  StyledTableCell: React.ComponentType<TableCellProps>;
}

const StatsTableHead: React.FC<StatsTableHeadProps> = ({ StyledTableCell }) => {


  return (
    <TableHead>
      <TableRow>
        <StyledTableCell>Dessert (100g serving)</StyledTableCell>
        <StyledTableCell align="right">Calories</StyledTableCell>
        <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
        <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
        <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
      </TableRow>
    </TableHead>
  )
}

export default StatsTableHead
