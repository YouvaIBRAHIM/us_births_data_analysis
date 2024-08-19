
import TableBody from "@mui/material/TableBody"
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';

interface IStatsTableBody{
  rows: (string | number | null)[][]
}

const StatsTableBody = ({rows}: IStatsTableBody) => {

  return (
    <TableBody>
      {rows.map((row, rowIndex) => (
        <StyledTableRow key={rowIndex}>
          {
            row.map((cell, cellIndex) => (
                <StyledTableCell key={cellIndex} component={cellIndex === 0 ? "th" : "td"} scope="row">
                  {cell}
                </StyledTableCell>
            ))
          }
        </StyledTableRow>
      ))}
    </TableBody>
  )
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  '& th': {
    fontWeight: 700,
    backgroundColor: theme.palette.primary.light,
    color : theme.palette.getContrastText(theme.palette.primary.light)
  },
}));

export default StatsTableBody
