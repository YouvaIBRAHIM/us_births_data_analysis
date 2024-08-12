
import TableBody from "@mui/material/TableBody"
import { TableCellProps } from '@mui/material/TableCell';
import { TableRowProps } from '@mui/material/TableRow';

interface StatsTableBodyProps {
  StyledTableCell: React.ComponentType<TableCellProps>;
  StyledTableRow: React.ComponentType<TableRowProps>;
}

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const StatsTableBody: React.FC<StatsTableBodyProps> = ({ StyledTableCell, StyledTableRow }) => {
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];
    return (
      <TableBody>
      {rows.map((row) => (
        <StyledTableRow key={row.name}>
          <StyledTableCell component="th" scope="row">
            {row.name}
          </StyledTableCell>
          <StyledTableCell align="right">{row.calories}</StyledTableCell>
          <StyledTableCell align="right">{row.fat}</StyledTableCell>
          <StyledTableCell align="right">{row.carbs}</StyledTableCell>
          <StyledTableCell align="right">{row.protein}</StyledTableCell>
        </StyledTableRow>
      ))}
    </TableBody>
    )

}

export default StatsTableBody
