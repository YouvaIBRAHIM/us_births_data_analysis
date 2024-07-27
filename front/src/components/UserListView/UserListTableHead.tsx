import { Box, TableCell, TableRow } from "@mui/material"
import TableHead from "@mui/material/TableHead"
import TableSortLabel from "@mui/material/TableSortLabel"

import { visuallyHidden } from "@mui/utils"

import { IUserSearch } from "@src/types/user.type"

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    disableSort: false,
    label: "Nom complet",
  },
  {
    id: "email",
    numeric: false,
    disablePadding: false,
    disableSort: false,
    label: "Email",
  },
  {
    id: "role",
    numeric: false,
    disablePadding: false,
    disableSort: true,
    label: "Rôle",
  },
  {
    id: "actions",
    numeric: false,
    disablePadding: false,
    disableSort: true,
    label: "Actions",
  },
]

interface IUserListTableHead {
  order: "asc" | "desc"
  orderBy: string
  onRequestSort: (property: IUserSearch["orderBy"]) => void
}
const UserListTableHead = ({
  order,
  orderBy,
  onRequestSort,
}: IUserListTableHead) => {
  const createSortHandler = (
    property: IUserSearch["orderBy"],
    disableSort: boolean,
  ) => {
    if (!disableSort) {
      onRequestSort(property)
    }
  }

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={"left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              hideSortIcon={headCell.disableSort}
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={() =>
                createSortHandler(
                  headCell.id as IUserSearch["orderBy"],
                  headCell.disableSort,
                )
              }
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export default UserListTableHead
