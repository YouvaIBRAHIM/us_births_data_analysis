import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"

interface IConfirmationModal {
  open: boolean
  title: string
  message?: string
  onConfirmation: () => void
  onCancelation: () => void
}
const ConfirmationModal = ({
  open,
  title,
  message,
  onCancelation,
  onConfirmation,
}: IConfirmationModal) => {
  return (
    <Dialog
      open={open}
      onClose={() => onCancelation()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        {message && (
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        )}
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={() => onCancelation()}>
          Annuler
        </Button>
        <Button variant="contained" onClick={() => onConfirmation()} autoFocus>
          Confirmer
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmationModal
