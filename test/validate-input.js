var test = require("tape");
var _ = require("lodash");

var testInput = require("./util/test-input");
var validateDataInput = require("../src/js/util/validate-data-input");
var parseDataBySeries = require("../src/js/util/parse-data-by-series");

test("validate data input", function(t) {
	t.plan(8);

	var validateResult;
	var parsed;

	parsed = parseDataBySeries(testInput.init_data_ordinal, { checkForDate: true} );
	validateResult = validateDataInput(testInput.init_data_ordinal, parsed.series, parsed.hasDate);
	t.deepEqual(validateResult, [], "valid input returns empty array");

	validateResult = validateDataInput("", "", false);
	t.deepEqual(validateResult, ["EMPTY"], "empty input returns EMPTY");

	parsed = parseDataBySeries(testInput.uneven_series, { checkForDate: true} );
	validateResult = validateDataInput(testInput.uneven_series, parsed.series, parsed.hasDate);
	t.deepEqual(validateResult, ["UNEVEN_SERIES", "NAN_VALUES"], "uneven series return UNEVEN_SERIES and NAN_VALUES");

	parsed = parseDataBySeries(testInput.too_many_series, { checkForDate: true} );
	validateResult = validateDataInput(testInput.too_many_series, parsed.series, parsed.hasDate);
	t.deepEqual(validateResult, ["TOO_MANY_SERIES"], "12+ columns returns TOO_MANY_SERIES");

	parsed = parseDataBySeries(testInput.too_few_series, { checkForDate: true} );
	validateResult = validateDataInput(testInput.too_few_series, parsed.series, parsed.hasDate);
	t.deepEqual(validateResult, ["TOO_FEW_SERIES"], "one column returns TOO_FEW_SERIES");

	parsed = parseDataBySeries(testInput.nan_values, { checkForDate: true} );
	validateResult = validateDataInput(testInput.nan_values, parsed.series, parsed.hasDate);
	t.deepEqual(validateResult, ["NAN_VALUES"], "column with NaN value returns NAN_VALUES");

	parsed = parseDataBySeries(testInput.not_dates, { checkForDate: true} );
	validateResult = validateDataInput(testInput.not_dates, parsed.series, parsed.hasDate);
	t.deepEqual(validateResult, ["NOT_DATES"], "date column with non-date returns NOT_DATES");

	parsed = parseDataBySeries(testInput.multiple_errors, { checkForDate: true} );
	validateResult = validateDataInput(testInput.multiple_errors, parsed.series, parsed.hasDate);
	t.deepEqual(validateResult, ["UNEVEN_SERIES", "NAN_VALUES", "NOT_DATES"], "input with several errors returns them all");
});
