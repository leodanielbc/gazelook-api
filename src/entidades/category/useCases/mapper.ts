const _mapperSingle = (category:any) => {
    return {
      'id': category.id,
      'name': category.name,
      'description': category.description,
      'createdAt': category.createdAt,
      'updatedAt': category.updatedAt
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