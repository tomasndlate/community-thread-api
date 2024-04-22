exports.login = (req, res) => {
    try {
        res.status(201).json('Success');
    } catch (error) {
        res.status(500).send('Error creating user');
    }
}

exports.signup = (req, res) => {
    try {
        res.status(201).json('Success');
    } catch (error) {
        res.status(500).send('Error creating user');
    }
}