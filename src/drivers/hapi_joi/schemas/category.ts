import Joi from '@hapi/joi';

export const CategorySchema = Joi.object({
    name: Joi.string()
        .required()
        .messages({
            "string.base": 'value of {#label} is invalid',
            "string.empty": '{#label} cannot be an empty field',
            "any.required": '{#label} is a required field'
        }),
    description: Joi.string()
        .required()
        .messages({
            "string.base": 'value of {#label} is invalid',
            "string.empty": '{#label} cannot be an empty field',
            "any.required": '{#label} is a required field'
        }),
})
// En caso de requerir errores personalizados, revisar posibles tipos de error en https://github.com/hapijs/joi/blob/master/API.md#list-of-errors
// type.patter.base valida tipo en caso de patter
// type.base valida tipo del campo especificado por type (type puede ser string, number....)
// type.max valor maximo {#limit} para imprimir el valor maximo
// type.min valor minimo {#limit} para imprimir el valor minimo
// {#label} para imprimir el nombre del campo
