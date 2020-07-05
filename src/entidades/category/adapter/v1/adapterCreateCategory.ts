const makeAdapterCreateCategory = ({ caseCreateCategory, logger } : { caseCreateCategory:any, logger:any }) => {
    const adapterCreateCategory = async (httpRequest:any) => {
        try {
            const data = httpRequest.body
            const category = await caseCreateCategory({
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
    return adapterCreateCategory
}

export default makeAdapterCreateCategory