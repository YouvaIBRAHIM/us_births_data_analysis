import { Skeleton, TableBody, TableCell, TableRow } from "@mui/material"

const TableSkeleton = ({ rows, cells }: { rows: number; cells: number }) => {
  return (
    <TableBody>
      {[...Array(rows)].map((_, index) => (
        <TableRow
          key={index}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          {[...Array(cells)].map((_, cellIndex) => (
            <TableCell align="right" key={cellIndex}>
              <Skeleton variant="rectangular" height={25} />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  )
}

export default TableSkeleton
