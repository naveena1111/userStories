module.exports = {
    constructErrorMessage(error) {
        var errMessage = '';
        if (error.message) {
            errMessage = error.message;
        }
        if (error.errors && error.errors.length > 0) {
            errMessage = error.errors.map(function (err) {
                return err.message;
            }).join(',\n');
        }
        return errMessage;
    }
}