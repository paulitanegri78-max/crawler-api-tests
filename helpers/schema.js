module.exports = {

    postSchema: {
        type: "object",
        properties: {
            id: {
                type: "string",
                minLength: 8,
                maxLength: 8
            }
        },
        required: ["id"]
    },

    getSchema: {
        type: "object",
        properties: {

            id: {
                type: "string"
            },

            status: {
                type: "string"
            },

            urls: {
                type: "array"
            }

        },

        required: [
            "id",
            "status",
            "urls"
        ]
    }

}