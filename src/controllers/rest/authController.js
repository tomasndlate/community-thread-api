const authService = require('../../services/authService');
const authTokenUtils = require('../../utils/authTokenUtils');

exports.signup = async (req, res) => {
    try {
        const { username, password } = req.body;
        const userId = await authService.createUser(username, password);
        const accessToken = authTokenUtils.generateAuthToken(userId);
        
        res.status(200).json({accessToken: accessToken});

    } catch (error) {
        if (error.statusCode != null) {
            res.status(error.statusCode).json({ message: error.message });
            console.error(error.name, error.message);
        } else {
            res.status(500).send('Internal Error');
            console.error('Internal Error', error.message)
        }
    }
}

exports.login = (req, res) => {
    console.log(req.user);
    console.log(req.body)
    try {
        res.status(201).json('Success');
    } catch (error) {
        res.status(500).send('Error creating user');
    }
}