const _mapperSingle = (user:any) => {
    return {
      'id': user.id,
      'name': user.name,
      'lastname': user.lastname,
      'contactName': user.contactName,
      'phone': user.phone,
      'email': user.email,
      'password': user.password,
      'language': user.language,
      'country': user.country,
      'city': user.city,
      'postalCode': user.postalCode,
      'active': user.active,
      'createdAt': user.createdAt,
      'updatedAt': user.updatedAt
    };
  };

  const mapper = (data:any) => {
    if (!data) {
      return null;
    }
    if (Array.isArray(data)) {
      return data.map(_mapperSingle)
    }
    return _mapperSingle(data)
  }

  export default mapper;