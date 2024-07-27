import { Alert, Stack } from "@mui/material"

import { Robot } from "@phosphor-icons/react"

const TableListNotFound = ({ message }: { message: string }) => {
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
      <Alert severity="warning">{message}</Alert>
    </Stack>
  )
}

export default TableListNotFound
