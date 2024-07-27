import { useEffect, useState } from "react"

import { deleteUser, getUsers, updateUserRole } from "@services/apis/user.api"
import { useDebounce } from "@src/services/hooks/global.hooks"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { IRole, IUser, IUserSearch } from "@src/types/user.type"

export const useUserList = () => {
  const queryClient = useQueryClient()
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [search, setSearch] = useState<IUserSearch>({
    value: "",
    searchBy: "name",
    role: "all",
    order: "asc",
    orderBy: "name",
  })
  const [userToUpdateRole, setUserToUpdateRole] = useState<IUser | null>(null)
  const [userToDelete, setUserToDelete] = useState<IUser | null>(null)

  const debouncedSearch = useDebounce(search.value, 500)

  const {
    data: users,
    isFetching,
    refetch,
    isError,
    error,
  } = useQuery({
    queryKey: ["users", page, perPage],
    queryFn: () => getUsers(page, perPage, search),
    retry: 3,
  })

  useEffect(() => {
    refetch()
  }, [page])

  useEffect(() => {
    refetch()
    .then(() => setPage(1))
  }, [perPage, debouncedSearch, search.role, search.searchBy])

  const deleteUserMutation = useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
      setUserToDelete(null)
    },
    onError: (error: Error) => {
      console.log(error)
    },
  })

  const updateUserRoleMutation = useMutation({
    mutationFn: ({ userId, roles }: { userId: string; roles: IRole["role"][] }) =>
      updateUserRole(userId, roles),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
      setUserToUpdateRole(null)
    },
    onError: (error: Error) => {
      console.log(error)
    },
  })

  const handleRequestSort = (property: IUserSearch["orderBy"]) => {
    const isAsc = search.orderBy === property && search.order === "asc"
    setSearch((prev) => ({
      ...prev,
      order: isAsc ? "desc" : "asc",
      orderBy: property,
    }))
  }

  const handleChangePage = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  const updateSearch = (key: keyof IUserSearch, value: unknown) => {
    setSearch((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const onUpdateUserRole = (userId: string, roles: IRole["role"][]) => {
    updateUserRoleMutation.mutate({ userId, roles })
  }

  return {
    page,
    perPage,
    setPerPage,
    search,
    setSearch,
    userToUpdateRole,
    setUserToUpdateRole,
    userToDelete,
    setUserToDelete,
    debouncedSearch,
    users,
    isFetching,
    refetch,
    isError,
    error,
    deleteUserMutation,
    handleRequestSort,
    handleChangePage,
    updateSearch,
    onUpdateUserRole,
  }
}
