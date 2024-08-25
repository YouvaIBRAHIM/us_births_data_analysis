class NameNotFound(RuntimeError):
    message = 'ERROR_NAME_NOT_FOUND'

class NameNotCreated(RuntimeError):
    message = 'ERROR_NAME_NOT_CREATED'

class DataNotFound(RuntimeError):
    message = 'ERROR_DATA_NOT_FOUND'

class InvalidChartType(RuntimeError):
    message = 'ERROR_INVALID_CHART_TYPE'

class UnsupportedYAxisField(RuntimeError):
    message = 'ERROR_UNSUPPORTED_YAXIS_FIELD'

class UnsupportedXAxisField(RuntimeError):
    message = 'ERROR_UNSUPPORTED_XAXIS_FIELD'

class InvalidConditionFormat(RuntimeError):
    message = 'ERROR_INVALID_CONDITION_FORMAT'

class DatabaseConnectionError(RuntimeError):
    message = 'ERROR_DATABASE_CONNECTION'

class DataProcessingError(RuntimeError):
    message = 'ERROR_DATA_PROCESSING'

class DataFrameProcessingError(RuntimeError):
    message = 'ERROR_DATAFRAME_PROCESSING'

class FilterApplicationError(RuntimeError):
    message = 'ERROR_FILTER_APPLICATION'


class ChartDataProcessingError(RuntimeError):
    message = 'ERROR_CHART_DATA_PROCESSING'
