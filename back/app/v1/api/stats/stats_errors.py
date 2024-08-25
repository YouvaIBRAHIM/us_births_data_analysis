class StatsNotFound(RuntimeError):
    message = 'ERROR_STATS_NOT_FOUND'

class InvalidConditionFormat(RuntimeError):
    message = 'ERROR_INVALID_CONDITION_FORMAT'

class DatabaseConnectionError(RuntimeError):
    message = 'ERROR_DATABASE_CONNECTION'

class DataFrameProcessingError(RuntimeError):
    message = 'ERROR_DATAFRAME_PROCESSING'

class FilterApplicationError(RuntimeError):
    message = 'ERROR_FILTER_APPLICATION'


class ChartDataProcessingError(RuntimeError):
    message = 'ERROR_CHART_DATA_PROCESSING'

class InvalidChartType(RuntimeError):
    message = 'ERROR_INVALID_CHART_TYPE'
