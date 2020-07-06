export const buildMakeCategory = (schema: any, validatorSchema: any) => {
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

export const buildIdCategory = (schema: any, validatorSchema: any) => {
    return ({
        id = 0
    } = {}) => {
        let { error, values } = validatorSchema(schema, { id })
        if (error) throw new Error(error)

        return {
            getIdCategory: () => id
        }
    }
}