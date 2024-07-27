import { alpha, styled } from "@mui/material/styles"

import { FormControl, InputLabel, MenuItem, Select, Stack } from "@mui/material"
import InputBase from "@mui/material/InputBase"

import { MagnifyingGlass } from "@phosphor-icons/react"

import { IUserSearch } from "@src/types/user.type"

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor:
    theme.palette.mode === "dark"
      ? alpha(theme.palette.common.white, 0.15)
      : alpha(theme.palette.common.black, 0.15),
  "&:hover": {
    backgroundColor:
      theme.palette.mode === "dark"
        ? alpha(theme.palette.common.white, 0.25)
        : alpha(theme.palette.common.black, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
}))

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}))

interface ISearchField {
  setSearch: (key: keyof IUserSearch, value: unknown) => void
  search: IUserSearch
  filterOptions: {
    label: string
    value: string
  }[]
}

const SearchField = ({ setSearch, search, filterOptions }: ISearchField) => {
  return (
    <Stack direction="row" spacing={2}>
      <Search>
        <SearchIconWrapper>
          <MagnifyingGlass />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Rechercher"
          inputProps={{ "aria-label": "search" }}
          onChange={(e) => setSearch("value", e.target.value)}
        />
      </Search>
      <FormControl sx={{ width: 120 }} size="small">
        <InputLabel id="RoleId">Par</InputLabel>
        <Select
          labelId="RoleId"
          id="RoleId"
          value={search.searchBy}
          label="Par"
          onChange={(e) => setSearch("searchBy", e.target.value)}
        >
          {filterOptions.map((option, index) => {
            return (
              <MenuItem key={index} value={option.value}>
                {option.label}
              </MenuItem>
            )
          })}
        </Select>
      </FormControl>
    </Stack>
  )
}

export default SearchField
