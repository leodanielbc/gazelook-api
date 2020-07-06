const makeAdapterDeleteCategory = ({ caseDeleteCategory, logger } : { caseDeleteCategory:any, logger:any }) => {
    const adapterDeleteCategory = async (httpRequest:any) => {
        try {
            const data = httpRequest.params
            const category = await caseDeleteCategory({
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
    return adapterDeleteCategory;
}

export default makeAdapterDeleteCategory;