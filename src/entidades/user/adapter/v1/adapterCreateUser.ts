const makeAdapterCreateUser = ({ caseCreateUser, logger } : { caseCreateUser:any, logger:any }) => {
    const adapterCreateUser = async (httpRequest:any) => {
        try {
            const data = httpRequest.body;
            const user = await caseCreateUser({
                ...data
            })
            return {
                header: {
                    'Content-Type': 'application/json'
                },
                statusCode: 201,
                body: { user }
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
    return adapterCreateUser;
}

export default makeAdapterCreateUser;