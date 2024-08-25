import { useEffect, useState } from 'react';
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';

interface IStatsTableBody {
  rows: (string | number | null)[][];
}
const ROWS_BEFORE_BUTTON = 20;
const ROWS_AFTER_BUTTON = 2;

const StatsTableBody = ({ rows }: IStatsTableBody) => {
  const [showAllRows, setShowAllRows] = useState(false);

  useEffect(() => {
    setShowAllRows(false)
  }, [rows])
  const handleShowAllRows = () => {
    setShowAllRows(true);
  };

  const totalRows = rows.length;
  const shouldShowButton = totalRows > (ROWS_BEFORE_BUTTON + ROWS_AFTER_BUTTON);

  const remainingRowsCount = totalRows - (ROWS_BEFORE_BUTTON + ROWS_AFTER_BUTTON);

  const first20Rows = rows.slice(0, ROWS_BEFORE_BUTTON);
  const last2Rows = rows.slice(-ROWS_AFTER_BUTTON);
  const middleRows = rows.slice(ROWS_BEFORE_BUTTON, -ROWS_AFTER_BUTTON);
  
  return (
    <TableBody>
      {first20Rows.map((row, rowIndex) => (
        <StyledTableRow key={rowIndex}>
          {row.map((cell, cellIndex) => (
            <StyledTableCell key={cellIndex} component={cellIndex === 0 ? "th" : "td"} scope="row">
              {cell}
            </StyledTableCell>
          ))}
        </StyledTableRow>
      ))}

      {shouldShowButton && !showAllRows && (
        <StyledTableRow>
          <StyledTableCell colSpan={rows[0].length} align="center">
            <Button onClick={handleShowAllRows} variant="text" color="secondary" fullWidth>
              Afficher le reste des lignes ({remainingRowsCount})
            </Button>
          </StyledTableCell>
        </StyledTableRow>
      )}

      {showAllRows && middleRows.map((row, rowIndex) => (
        <StyledTableRow key={rowIndex + 20}>
          {row.map((cell, cellIndex) => (
            <StyledTableCell key={cellIndex} component={cellIndex === 0 ? "th" : "td"} scope="row">
              {cell}
            </StyledTableCell>
          ))}
        </StyledTableRow>
      ))}

      {shouldShowButton && last2Rows.map((row, rowIndex) => (
        <StyledTableRow key={rowIndex + rows.length - 2}>
          {row.map((cell, cellIndex) => (
            <StyledTableCell key={cellIndex} component={cellIndex === 0 ? "th" : "td"} scope="row">
              {cell}
            </StyledTableCell>
          ))}
        </StyledTableRow>
      ))}
    </TableBody>
  );
};

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
    color: theme.palette.getContrastText(theme.palette.primary.light),
  },
}));

export default StatsTableBody;
