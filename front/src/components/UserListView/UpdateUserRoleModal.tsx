import { useState } from "react"

import { Autocomplete, TextField } from "@mui/material"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"

import { IRole } from "@src/types/user.type"

interface IUserRole {
  label: string
}

const userRoles: IUserRole[] = [
  {
    label: "admin",
  },
  {
    label: "editor",
  },
  {
    label: "player",
  },
]

interface IUpdateUserRoleModal {
  open: boolean
  title: string
  onConfirmation: (userId: string, roles: IRole["role"][]) => void
  onCancelation: () => void
  roles: IRole["role"][]
  userId: string
}

const UpdateUserRoleModal = ({
  open,
  title,
  onCancelation,
  onConfirmation,
  roles,
  userId,
}: IUpdateUserRoleModal) => {
  const [selectRoles, setSelectedRoles] = useState(roles)

  return (
    <Dialog
      open={open}
      onClose={() => onCancelation()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent
        sx={{
          minHeight: "20vh",
        }}
      >
        <Autocomplete
          sx={{
            my: 2,
          }}
          multiple
          disablePortal
          id="roles"
          options={userRoles}
          value={userRoles.filter((el) =>
            selectRoles.includes(el.label as IRole["role"]),
          )}
          onChange={(_, newValue) =>
            newValue &&
            setSelectedRoles(newValue.map((el) => el.label as IRole["role"]))
          }
          renderInput={(params) => <TextField {...params} label="Rôles" />}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={() => onCancelation()}>
          Annuler
        </Button>
        <Button
          disabled={selectRoles.length === 0}
          variant="contained"
          onClick={() => onConfirmation(userId, selectRoles)}
          autoFocus
        >
          Confirmer
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default UpdateUserRoleModal
