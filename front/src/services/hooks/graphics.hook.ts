import { useSnackBarStore } from "@src/stores/snackbar.store"
import { useState } from "react"

export const useGraphics = () => {
  const { showSnackBar } = useSnackBarStore()
  const [selectedButtonId, setSelectedButtonId] = useState<string | null>(null)

  const onSelectedButtonId = (id: string) => {
    setSelectedButtonId(id)
  }
  
  return {
    selectedButtonId,
    onSelectedButtonId
  }
}
