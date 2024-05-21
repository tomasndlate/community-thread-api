require("./openapi-jsdoc");
const { createParameter, createBodyContent } = require("./openapi-utils");

/** Variable Open API Definition
 * @type {OpenApiDefinition} | {@link OpenApiDefinition}
 */
const openApiDefinition = {
    openapi: "",
    info: {},
    externalDocs: {},
    servers: [],
    tags: [],
    paths: {},
    components: {
        schemas: {},
        requestBodies: {},
        securitySchemes: {}
    }
}

// GET & SET OPEN API DEFINITION

/** Function to set the Open API Definition.
 * @param {OpenApiDefinition} definition - {@link OpenApiDefinition}
 */
const setOpenApiDefinition = (definition) => {
    if (!!definition?.openapi)
        openApiDefinition.openapi = definition.openapi;

    if (!!definition?.info)
        openApiDefinition.info = definition.info;

    if (!!definition?.externalDocs)
        openApiDefinition.info = definition.externalDocs;

    if (!!definition?.servers)
        openApiDefinition.servers = definition.servers;

    if (!!definition?.tags)
        openApiDefinition.tags = definition.tags;

    if (!!definition?.components?.schemas)
        openApiDefinition.components.schemas = definition.components.schemas;

    if (!!definition?.components?.requestBodies)
        openApiDefinition.components.requestBodies = definition.components.requestBodies;

    if (!!definition?.components?.securitySchemes)
        openApiDefinition.components.securitySchemes = definition.components.securitySchemes;
}

/** Function to get the Open API Definition.
 * @return {OpenApiDefinition} structure {@link OpenApiDefinition}
 */
const getOpenApiDefinition = () => {
  return openApiDefinition;
};

// EXTERNAL DOCS

/** Set the external docs for Open API Definition
 * @param {ExternalDocs} externalDocsConfig - {@link ExternalDocs}
 */
const setExternalDocsOpenAPI = (externalDocsConfig) => {
    openApiDefinition.externalDocs = externalDocsConfig;
}

// SERVERS

/** Set the servers for Open API Definition
 * @param {Server[]} serversList - {@link Server}
 */
const setServersOpenAPI = (serversList) => {
    openApiDefinition.servers = serversList;
}

// TAGS

/** Set the tags for Open API Definition
 * @param {Tag[]} tagsList - {@link Tag}
 */
const setTagsOpenAPI = (tagsList) => {
    openApiDefinition.tags = tagsList;
}

// ENDPOINTS

/** Handle the add of method and path endpoint to the Open API Definition
 * @param {Path} pathConfig - {@link Path}
 * @param {methodPathEnum} method - get | post | put | delete
 */
const addSwaggerEndpoint = (pathConfig, method) => {
    // IF NEW ENDPOINT PATH
    if (!openApiDefinition.paths[pathConfig.path])
        openApiDefinition.paths[pathConfig.path] = {}

    // IF ENDPOINT ALREADY EXISTS
    if (!!openApiDefinition.paths[pathConfig.path][method])
        throw new Error(`${method.toUpperCase()} ${pathConfig.path} has been already declared`);

    openApiDefinition.paths[pathConfig.path][method] = {
        summary: pathConfig?.summary,
        tags: pathConfig?.tags,
        operationId: pathConfig?.operationId,
        parameters: pathConfig?.parameters,
        requestBody: pathConfig?.requestBody,
        responses: pathConfig?.responses,
        security: pathConfig?.security
    }
}

/** Add a GET path endpoint to the Open API Definition
 * @param {Path} pathConfig - {@link Path}
 */
const GET = (pathConfig) => addSwaggerEndpoint(pathConfig, 'get');

/** Add a POST path endpoint to the Open API Definition
 * @param {Path} pathConfig - {@link Path}
 */
const POST = (pathConfig) => addSwaggerEndpoint(pathConfig, 'post');

/** Add a PUT path endpoint to the Open API Definition
 * @param {Path} pathConfig - {@link Path}
 */
const PUT = (pathConfig) => addSwaggerEndpoint(pathConfig, 'put');

/** Add a DELETE path endpoint to the Open API Definition
 * @param {Path} pathConfig - {@link Path}
 */
const DELETE = (pathConfig) => addSwaggerEndpoint(pathConfig, 'delete');

// COMPONENTS

/** Handle add Schema | RequestBody | SecurityScheme to the Open API Definition
 * @param {Schema | RequestBody | SecurityScheme} config - {@link Schema} | {@link RequestBody} | {@link SecurityScheme}
 * @param {string} type - schemas | RequestBodies | SecuritySchemes
 * 
 * @throws {Error} If the component has already been declared.
 */
const addSwaggerComponent = (name, config, type) => {
    if (!!openApiDefinition.components[type]?.[name])
        throw new Error(`${type.toUpperCase()} ${name} has been already declared`);

    openApiDefinition.components[type][name] = config;
}

/** Add Schema to the Open API Definition
 * @param {string} name - Name for the Schema
 * @param {Schema} config - {@link Schema}
 */
const SCHEMA = (name, config) => addSwaggerComponent(name, config, 'schemas');

/** Add RequestBody to the Open API Definition
 * @param {string} name - Name for the RequestBody
 * @param {RequestBody} config - {@link RequestBody}
 */
const REQUEST_BODY = (name, config) => addSwaggerComponent(name, config, 'requestBodies');

/** Add SecurityScheme to the Open API Definition
 * @param {string} name - Name for the SecurityScheme
 * @param {SecurityScheme} config - {@link SecurityScheme}
 */
const SECURITY_SCHEME = (name, config) => addSwaggerComponent(name, config, 'securitySchemes');


module.exports = {
    setOpenApiDefinition,
    getOpenApiDefinition,
    setExternalDocsOpenAPI,
    setServersOpenAPI,
    setTagsOpenAPI,
    GET, POST, PUT, DELETE,
    SCHEMA, 
    REQUEST_BODY, 
    SECURITY_SCHEME,
    createParameter,
    createBodyContent
}