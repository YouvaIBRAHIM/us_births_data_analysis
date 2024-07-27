import { Alert, Button, Stack } from "@mui/material"

import { ArrowClockwise, Robot } from "@phosphor-icons/react"

const ErrorView = ({
  message,
  refetch,
}: {
  message: string
  refetch: () => void
}) => {
  return (
    <Stack
      direction="column"
      gap={4}
      alignItems="center"
      justifyContent="center"
      sx={{
        width: "100%",
        minHeight: "50vh",
      }}
    >
      <Robot size={96} weight="duotone" />
      <Alert severity="error">{message}</Alert>
      <Button
        startIcon={<ArrowClockwise size={24} weight="duotone" />}
        onClick={refetch}
        variant="contained"
      >
        Réessayer
      </Button>
    </Stack>
  )
}

export default ErrorView
