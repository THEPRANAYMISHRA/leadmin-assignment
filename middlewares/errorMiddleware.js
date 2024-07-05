const errorHandler = (err, _, res,) => {
    console.error(err);
    res.status(500).send('Server Error');
};

module.exports = errorHandler;
