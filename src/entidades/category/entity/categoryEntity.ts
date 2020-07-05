const buildMakeCategory = (schema: any, validatorSchema: any) => {
    return ({
        name = '',
        description = ''
    } = {}) => {
        let { error, values } = validatorSchema(schema, { name, description })
        if (error) throw new Error(error)

        return {
            getName: () => name,
            getDescription: () => description
        }
    }
}

export default buildMakeCategory;