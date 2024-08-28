class UserNotFound(RuntimeError):
    message = 'ERROR_USER_NOT_FOUND'

class UserNotCreated(RuntimeError):
    message = 'ERROR_USER_NOT_CREATED'

class InternalServerError(RuntimeError):
    message = 'INTERNAL_SERVER_ERROR'


class PasswordMismatchError(RuntimeError):
    message = 'ERROR_PASSWORD_MISMATCH'

class IncorrecPasswordError(RuntimeError):
    message = 'ERROR_INCORRECT_PASSWORD'

class InternalServerError(RuntimeError):
    message = 'INTERNAL_SERVER_ERROR'