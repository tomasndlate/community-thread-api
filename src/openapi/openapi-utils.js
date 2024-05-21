// create response

/** Create Parameter Structure Utils
 * @param {Object} config
 * @param {string} config.name
 * @param {string} config.in - path | query
 * @param {string} config.description
 * @param {boolean} config.required
 * @param {string} config.type - string | array
 * @param {string} config.format - int64 | int32
 * @param {string} config.$ref - #/path_to_schema
*
* @return {Parameter} structure {@link Parameter}
*/
const createParameter = (config) => {
    return {
        name: config.name,
        in: config.in,
        description: config?.description,
        required: config?.required,
        schema: {
            type: config?.type,
            format: config?.format,
            $ref: config?.$ref,
        }
    }
}

/** Create RequestBody Structure Utils
 * @param {ContentItem[]} config {@link ContentItem}
 * @typedef {Object} ContentItem
 * @property {contentTypeEnum} contentType {@link contentTypeEnum} 
 * @property {string} type
 * @property {string} $ref
 * @property {string} itemsRef
 * @property {string} itemsType
 * 
 * @return {RequestBody} > {@link RequestBody}
 */
const createBodyContent = (config) => {
    let bodyContent = {}

    for (let item of config) {
        bodyContent[item.contentType] = {
            schema: {
                $ref: item?.$ref,
                type: item?.type,
                items: {
                    type: item?.itemsType,
                    $ref: item?.itemsRef,
                },
            }
        }
    }

    return bodyContent;
}

module.exports = {
    createParameter,
    createBodyContent
}