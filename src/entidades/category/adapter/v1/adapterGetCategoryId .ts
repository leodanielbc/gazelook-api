const makeAdapterGetCategoryId = ({ caseGetCategory, logger } : { caseGetCategory:any, logger:any }) => {
    const adapterGetCategoryId = async (httpRequest:any) => {
        try {
            const data = httpRequest.params
            const category = await caseGetCategory({
                ...data
            })
            return {
                header: {
                    'Content-Type': 'application/json'
                },
                statusCode: 201,
                body: { category }
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
    return adapterGetCategoryId
}

export default makeAdapterGetCategoryId;