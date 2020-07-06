const makeAdapterUpdateCategory = ({ caseUpdateCategory, logger } : { caseUpdateCategory:any, logger:any }) => {
    const adapterUpdateCategory = async (httpRequest:any) => {
        try {
            const data = httpRequest.body;
            const params = httpRequest.params;
            const category = await caseUpdateCategory({...data}, {...params})
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
    return adapterUpdateCategory
}

export default makeAdapterUpdateCategory