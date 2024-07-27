import { useCallback } from "react"

import { Pagination } from "@mui/material"
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableContainer from "@mui/material/TableContainer"

import ConfirmationModal from "@components/ConfirmationModal"
import ListNotFound from "@components/TableListNotFound"
import ErrorView from "@components/Views/ErrorView"
import { useUserList } from "@services/hooks/users.hooks"
import { getComparator, stableSort } from "@services/utils.service"

import TableToolbar from "@src/components/UserListView/TableToolbar"
import UpdateUserRoleModal from "@src/components/UserListView/UpdateUserRoleModal"
import UserListBody from "@src/components/UserListView/UserListBody"
import UserListTableHead from "@src/components/UserListView/UserListTableHead"

import { IUserSearch } from "@src/types/user.type"

const UserListView = () => {
  const {
    page,
    perPage,
    setPerPage,
    search,
    userToUpdateRole,
    setUserToUpdateRole,
    userToDelete,
    setUserToDelete,
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
  } = useUserList()

  const renderTableBody = useCallback(() => {
    const sortedUsers = users?.data
      ? stableSort(users.data, getComparator(search.order, search.orderBy))
      : []
    return (
      <UserListBody
        users={sortedUsers}
        isFetching={isFetching}
        setUserToDelete={setUserToDelete}
        setUserToUpdateRole={setUserToUpdateRole}
      />
    )
  }, [isFetching, users, search.order, search.orderBy])

  if (isError) {
    return (
      <ErrorView
        message={error?.message ?? "Une erreur est survenue"}
        refetch={refetch}
      />
    )
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableToolbar
          perPage={perPage}
          setPerPage={(value: number) => setPerPage(value)}
          role={search.role}
          setRole={(val: IUserSearch["role"]) => updateSearch("role", val)}
          search={search}
          updateSearch={updateSearch}
        />
        <TableContainer sx={{ maxHeight: "60vh" }}>
          <Table aria-labelledby="usersTable" size={"medium"} stickyHeader>
            <UserListTableHead
              order={search.order}
              orderBy={search.orderBy}
              onRequestSort={handleRequestSort}
            />
            {renderTableBody()}
          </Table>
        </TableContainer>
        {(!users?.data || users?.data.length === 0) && (
          <ListNotFound message="Aucun utilisateur trouvé." />
        )}
      </Paper>
      {users && users.count > perPage && (
        <Pagination
          color="primary"
          count={users?.count ? Math.ceil(users.count / perPage) : 0}
          page={Number(page)}
          siblingCount={2}
          boundaryCount={1}
          onChange={handleChangePage}
        />
      )}
      {userToDelete && (
        <ConfirmationModal
          open={Boolean(userToDelete)}
          title="Voulez-vous vraiment supprimer cet utilisateur ?"
          message={`${userToDelete.first_name} ${userToDelete.last_name} (${userToDelete.email})`}
          onConfirmation={() => deleteUserMutation.mutate(userToDelete.id)}
          onCancelation={() => setUserToDelete(null)}
        />
      )}
      {userToUpdateRole && (
        <UpdateUserRoleModal
          open={Boolean(userToUpdateRole)}
          title={`Modifier les rôles de l'utilisateur : ${userToUpdateRole.first_name} ${userToUpdateRole.last_name}`}
          roles={userToUpdateRole.roles}
          onConfirmation={onUpdateUserRole}
          onCancelation={() => setUserToUpdateRole(null)}
          userId={userToUpdateRole.id}
        />
      )}
    </Box>
  )
}

export default UserListView
