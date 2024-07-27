import { Skeleton, Stack } from "@mui/material"

export const UserProfileCardSkeleton = () => {
  return (
    <Stack direction="column" gap={1} alignItems="center" py={3}>
      <Stack direction="row" justifyContent="center">
        <Skeleton variant="circular" width={100} height={100} />
      </Stack>
      <Skeleton width={200} height={50} variant="text" sx={{ fontSize: "2rem" }} />
      <Skeleton width={200} height={50} variant="text" sx={{ fontSize: "2rem" }} />
      <Skeleton width={200} height={100} />
    </Stack>
  )
}

export const UserProfileFormSkeleton = () => {
  return (
    <Stack direction="column" alignItems="center" gap={1} p={3}>
      <Skeleton width="100%" height={50} variant="text" sx={{ fontSize: "2rem" }} />
      <Skeleton width="100%" height={50} variant="text" sx={{ fontSize: "3rem" }} />
      <Skeleton width="100%" height={50} variant="text" sx={{ fontSize: "3rem" }} />
      <Skeleton width="100%" height={50} variant="text" sx={{ fontSize: "2rem" }} />
      <Skeleton width={200} height={100} />
    </Stack>
  )
}

export const UserProfilePasswordFormSkeleton = () => {
  return (
    <Stack direction="column" alignItems="center" gap={1} p={3}>
      <Skeleton width="100%" height={50} variant="text" sx={{ fontSize: "2rem" }} />
      <Skeleton width="100%" height={50} variant="text" sx={{ fontSize: "3rem" }} />
      <Skeleton width="100%" height={50} variant="text" sx={{ fontSize: "3rem" }} />
      <Skeleton width={200} height={100} />
    </Stack>
  )
}
