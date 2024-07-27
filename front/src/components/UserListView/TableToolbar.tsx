import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Toolbar,
} from "@mui/material"

import SearchField from "@src/components/UserListView/SearchField"

import { IUserSearch } from "@src/types/user.type"

const filterOptions: {
  label: string
  value: string
}[] = [
  {
    label: "Nom",
    value: "name",
  },
  {
    label: "Email",
    value: "email",
  },
]

interface ITableToolbar {
  setPerPage: (value: number) => void
  setRole: (value: IUserSearch["role"]) => void
  perPage: number
  role: string
  search: IUserSearch
  updateSearch: (key: keyof IUserSearch, value: unknown) => void
}
const TableToolbar = ({
  setPerPage,
  setRole,
  perPage,
  role,
  search,
  updateSearch,
}: ITableToolbar) => {
  const handleChangePerPage = (e: SelectChangeEvent) => {
    setPerPage(Number(e.target.value))
  }
  const handleChangeRole = (e: SelectChangeEvent) => {
    setRole(e.target.value as IUserSearch["role"])
  }

  return (
    <Toolbar
      sx={{
        minHeight: 75,
        py: 2,
        pl: 1,
      }}
    >
      <Stack direction="row" alignItems="center" flexWrap="wrap" gap={2}>
        <SearchField
          filterOptions={filterOptions}
          search={search}
          setSearch={updateSearch}
        />
        <FormControl size="small">
          <InputLabel id="perPageId">Par page</InputLabel>
          <Select
            labelId="perPageId"
            id="perPageId"
            value={String(perPage)}
            label="Par page"
            onChange={handleChangePerPage}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 125 }} size="small">
          <InputLabel id="RoleId">Rôle</InputLabel>
          <Select
            labelId="RoleId"
            id="RoleId"
            value={role}
            label="Rôle"
            onChange={handleChangeRole}
          >
            <MenuItem value={"all"}>Tous les utilisateurs</MenuItem>
            <MenuItem value={"admin"}>Admins</MenuItem>
            <MenuItem value={"editor"}>Éditeurs</MenuItem>
            <MenuItem value={"player"}>Joueurs</MenuItem>
          </Select>
        </FormControl>
      </Stack>
    </Toolbar>
  )
}

export default TableToolbar
