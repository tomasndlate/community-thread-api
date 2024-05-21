const swaggerUI = require('swagger-ui-express');
const { version } = require('../../package.json');
const { 
  setOpenApiDefinition, 
  getOpenApiDefinition, 
  setExternalDocsOpenAPI, 
  setServersOpenAPI, 
  setTagsOpenAPI, 
  REQUEST_BODY,
  SECURITY_SCHEME,
  SCHEMA
} = require('../openapi/openapi-builder');

setOpenApiDefinition({
    openapi: '3.0.0',
    info: {
      title: 'Community Thread - API',
      version: version,
      description: 'Documentation for Community Thread - API',
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Tomas Ndlate",
        url: "https://www.linkedin.com/in/tomasndlate/",
      },
    }
});

setExternalDocsOpenAPI({
  url:"", 
  description:""
});

setServersOpenAPI([
  {url:"http://localhost:3000", description:"Development Server", active:true},
  {url:"https://example.com", description:"Production Server", active:true}
]);

setTagsOpenAPI([
  {name:"", description:""}
]);

// Log in and Sign up Schemas
SCHEMA('LoginForm', {
  required: ['username', 'password'],
  type: 'object',
  properties: {
      email: { type: "string", example: "user@gmail.com" },
      password: { type: "string", example: "userpassword2024" },
  }
})
SCHEMA('SignupForm', {
  required: ['username', 'password'],
  type: 'object',
  properties: {
      email: { type: "string", example: "user@gmail.com" },
      username: { type: "string", example: "user1234" },
      password: { type: "string", example: "userpassword2024" },
      name: { type: "string", example: "John Smith" },
  }
})
SCHEMA('BearerToken', {
  required: ['accessToken'],
  type: 'object',
  properties: {
      accessToken : { type: "string", example: "hsuq82tw1kba19s9s1sl1si.ihgfufyf" },
  }
})


SECURITY_SCHEME('BearerToken', {
  type: "http",
  scheme: "bearer",
  bearerFormat: "JWT",
  description: "Bearer token used for some endpoints"
});


const initOpenAPI = (app, port) => {
    app.use('/docs', swaggerUI.serve, swaggerUI.setup(getOpenApiDefinition()));
    console.log("Swagger api docs running on port:", port);
}

module.exports = {
  initOpenAPI
}