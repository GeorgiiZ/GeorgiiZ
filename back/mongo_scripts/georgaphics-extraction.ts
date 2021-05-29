import MongoService from "../src/services/MongoService";

const mongoManager = new MongoService();

const mapGeography = (m: any) => ({region: m.region, town: m.town})

async function getGeographies () {
  let geographies = await mongoManager.findMany('monuments', {}, 0, 0, mapGeography)
  return geographies
}

function groupByRegion (geographies: Array<any>) {
  return geographies.reduce((acc, geography: any) => {
    acc[geography.region.id] = [...acc[geography.region.id] || [], geography]
    return acc
  }, {})
}

function addUniqueToMap (map: Map<string, any>, geography: any) {
  if (map.has(geography.town)){
    return
  }
  map.set(geography.town, geography)
}

getGeographies().then((geographiesResponse: any) => {
  let geographiesGrouped = groupByRegion(geographiesResponse)
  let geographyMapped = Object.values(geographiesGrouped).map((geographies: any) => {
    return {
      region: geographies[0].region,
      towns: [...new Set(geographies.map((g: any) => g.town).filter((x: string) => x))]
    }
  })
  return geographyMapped
})
.then((geographies) => {
  return mongoManager.insertMany('geographies', geographies)
})
.then((res) => {
  const w = 1
})
