import { User } from '../../../../drivers/typeorm/entities/User'
import { makeUser } from '../../entity/index';
import mapper from '../mapper'
import { getRepository } from 'typeorm';
import { Address } from '../../../../drivers/typeorm/entities/Address';
import * as bcryptjs from 'bcryptjs';
import { Accountuser } from '../../../../drivers/typeorm/entities/Accountuser';

const caseCreateUser = async (data: any) => {
    let dataValidate = makeUser(data)
    let dataUser = {
        name: dataValidate.getName(),
        lastname: dataValidate.getLastName(),
        contactName: dataValidate.getContactName(),
        phone: dataValidate.getPhone(),
        profileType: dataValidate.getProfileType(),
        active: true
    }
    // user
    const newUser = getRepository(User).create(dataUser);
    const saveUser: any = await getRepository(User).save(newUser);
    // address
    let dataAddress = {
        country: dataValidate.getCountry(),
        city: dataValidate.getCity(),
        postalCode: dataValidate.getPostalCode(),
        idUser: saveUser.id
    }
    const newAddress = getRepository(Address).create(dataAddress);
    const resultAddres = await getRepository(Address).save(newAddress);
    // account
    const salt = await bcryptjs.genSalt();
    let dataAccount = {
        email: dataValidate.getEmail(),
        salt: salt,
        password: await bcryptjs.hash(dataValidate.getPassword(), salt),
        language: dataValidate.getLanguage(),
        idUser: saveUser.id
    }
    const accountUser = getRepository(Accountuser).create(dataAccount);
    const resultAccountUser = await getRepository(Accountuser).save(accountUser);
    const result = mapper(saveUser)
    return result;
}

export default caseCreateUser;