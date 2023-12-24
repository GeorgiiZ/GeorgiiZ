export default class MonumentsMapping {
  static mapOpenDataMonument(monument: any) {
    const {
      nativeId,
      nativeName,
      data: {
        general: {
          region,
          photo,
          address,
          createDate,
          unesco,
          typologies,
          objectType,
          categoryType,
        },
      },
    } = monument;

    return {
      nativeId,
      nativeName,
      region,
      photo,
      address,
      createDate,
      unesco,
      typologies,
      objectType,
      categoryType,
    };
  }
}
