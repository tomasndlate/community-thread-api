const express = require('express');
const router = express.Router();
const authController = require('../../controllers/rest/authController');
const loginMiddleware = require('../../middleware/loginMiddleware');
const googleMiddleware = require('../../middleware/googleMidleware');
const passport = require('../../configs/passportConfig');
const { GET, createParameter, createBodyContent } = require('../../openapi/openapi-builder');

// POST({
//     path: "/auth/login",
//     specification: {
//         tags: ["Auth"],
//         description: "Normal authentication with credentials",
//         summary: "Credentials authentication",
//         operationId: "idCredentialsLogin",
//         responses: {
//             "200": createResponseSpec("Ok", "application/json", {$ref: "#/components/schemas/User"}),
//             "201": createResponseSpec(
//                 "Success", 
//                 "application/json", 
//                 {type: "object", 
//                 properties: { 
//                     accessToken: {
//                         type: "string",
//                         example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJz..."
//                     }
//                 }})
//         }
//     }
// })
router.post('/login', loginMiddleware, authController.login);

GET({
    path: "/auth/google/{paramTest}",
    summary: "Summary",
    description: "aaaaa description",
    operationId: "idGoogleAuth",
    tags: ["A"],
    parameters: [
        createParameter({
            name:"paramTest",
            in:"path",
            description:"Description for paramTest",
            required:true,
            type: "string",
            format: "",
            $ref:""
        }),
    ],
    requestBody:{
        description: "Create a new pet in the store",
        required: true,
        content: createBodyContent([
            {
                contentType: "application/json",
                type: "array",
                itemsRef: "#/components/schemas/Community"
            }
        ])
    },
    responses: {
        "200": {
            description: "successful operation",
            content: createBodyContent([
                {
                    contentType: "application/json",
                    $ref: "#/components/schemas/Community"
                }
            ])
        }
    }
});
router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));
router.get('/google/callback', googleMiddleware, authController.login);

router.post('/signup', authController.signup);

module.exports = router;