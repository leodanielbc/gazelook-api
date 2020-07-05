const makeAdapterGetCategories = ({ caseGetCategories, logger } : { caseGetCategories:any, logger:any }) => {
    const adaptadorObtenerUsuarios = async (httpRequest:any) => {
        try {
            const categories = await caseGetCategories()
            return {
                header: {
                    'Content-Type': 'application/json'
                },
                statusCode: 201,
                body: { categories }
            }
        } catch (e) {
            return {
                header: {
                    'Content-Type': 'application/json'
                },
                statusCode: 400,
                body: {
                    error: e.message
                }
            }
        }
    }
    return adaptadorObtenerUsuarios
}

export default makeAdapterGetCategories