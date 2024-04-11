import {MonumentProperty} from "@/models/MonumentProperty";
import {Geography} from "@/models/Geography";
import {Monument} from "@/models/Monument";

export class MonumentsMapper {
  formProperties (monumentResponse) {
    const {likesCount, town, categoryType, objectType, typologies, unesco, createDate, address, region, nativeName} = monumentResponse
    return [
      new MonumentProperty('Категория', categoryType?.value),
      new MonumentProperty('Тип', objectType?.value),
      new MonumentProperty('Типология', typologies?.value),
      new MonumentProperty('Юнэско', unesco?.value),
      new MonumentProperty('Дата создания', createDate),
      new MonumentProperty('Адрес', address?.fullAddress),
      new MonumentProperty('Регион', region?.value),
      new MonumentProperty('Город', town),
      new MonumentProperty('Понравилось', likesCount),

    ]
  }

  mapGeographies (geographiesResponse) {
    return geographiesResponse.map(g => new Geography(g?.region?.value, g?.towns))
  }

  mapMonuments (monumentsResponse) {
    return monumentsResponse.map(m => new Monument({
      id: m?.nativeId,
      name: m?.nativeName,
      region: m?.region,
      photo: m?.photo?.url,
      address: m?.address
    }))
  }

  mapMonument (monumentsResponse) {
  }
}