import { profile } from "console"

export const buildMakeUser = (schema: any, validatorSchema: any) => {
    return ({
        name = '',
        lastname = '',
        contactName = '',
        phone = '',
        profileType = '',
        email = '',
        password = '',
        language = '',
        country = '',
        city = '',
        postalCode = '',
        active = true
    } = {}) => {
        let { error, values } = validatorSchema(schema, {
            name,
            lastname,
            contactName,
            phone,
            profileType,
            email,
            password,
            language,
            country,
            city,
            postalCode,
            active
        })
        if (error) throw new Error(error)

        return {
            getName: () => name,
            getLastName: () => lastname,
            getContactName: () => contactName,
            getPhone: () => phone,
            getProfileType: () => profileType,
            getEmail: () => email,
            getPassword: () => password,
            getLanguage: () => language,
            getCountry: () => country,
            getCity: () => city,
            getPostalCode: () => postalCode,
            getActive: () => active,
        }
    }
}

export const buildIdUser = (schema: any, validatorSchema: any) => {
    return ({
        id = 0
    } = {}) => {
        let { error, values } = validatorSchema(schema, { id })
        if (error) throw new Error(error)

        return {
            getIdUser: () => id
        }
    }
}