import { IconButton, Tooltip, alpha, styled } from "@mui/material"
import Box from "@mui/material/Box"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableRow from "@mui/material/TableRow"

import TableSkeleton from "@components/Skeletons/TableSkeletons"
import { PencilSimpleLine, Trash } from "@phosphor-icons/react"
import { formatRoles } from "@src/services/roles.mapper.service"

import { IUser } from "@src/types/user.type"

interface IUserListBody {
  users: IUser[]
  isFetching: boolean
  setUserToUpdateRole: (user: IUser) => void
  setUserToDelete: (user: IUser) => void
}

const UserListBody = ({
  users,
  isFetching,
  setUserToUpdateRole,
  setUserToDelete,
}: IUserListBody) => {
  if (isFetching) {
    return <TableSkeleton rows={10} cells={5} />
  } else if (users) {
    return (
      <TableBody>
        {users.map((user: IUser, index: number) => {
          const labelId = `enhanced-table-checkbox-${index}`
          return (
            <StyledTableRow role="checkbox" tabIndex={-1} key={user.id}>
              <TableCell component="th" id={labelId} scope="user">
                {user.first_name} {user.last_name?.toUpperCase()}
              </TableCell>
              <TableCell align="left">{user.email}</TableCell>
              <TableCell align="left">{formatRoles(user.roles)}</TableCell>
              <TableCell align="left">
                <Box>
                  <Tooltip title="Éditer" onClick={() => setUserToUpdateRole(user)}>
                    <IconButton aria-label="action" size="small">
                      <PencilSimpleLine fontSize="inherit" weight="duotone" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Supprimer">
                    <IconButton
                      aria-label="action"
                      size="small"
                      onClick={() => setUserToDelete(user)}
                    >
                      <Trash fontSize="inherit" weight="duotone" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </TableCell>
            </StyledTableRow>
          )
        })}
      </TableBody>
    )
  }
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  "&:hover": {
    backgroundColor:
      theme.palette.mode === "dark"
        ? alpha(theme.palette.primary.main, 0.35)
        : alpha(theme.palette.primary.main, 0.75),
  },
}))

export default UserListBody
