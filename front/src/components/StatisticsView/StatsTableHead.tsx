import { TableCell, TableRow } from "@mui/material"
import TableHead from "@mui/material/TableHead"
import TableSortLabel from "@mui/material/TableSortLabel"

interface IStatsTableHead {
  headCells: string[]
}
const StatsTableHead = ({headCells}: IStatsTableHead) => {

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell, i) => (
          <TableCell
            key={i}
            align={"left"}
          >
            <TableSortLabel
              hideSortIcon

            >
              {headCell}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export default StatsTableHead
