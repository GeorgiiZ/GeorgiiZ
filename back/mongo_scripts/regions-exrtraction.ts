import MongoService from "../src/services/MongoService";

const mongoManager = new MongoService();

async function getRegions () {
  let regions = await mongoManager.findMany('monuments'/*, (x: any) => x.region*/)
  return regions
}



getRegions().then((regions) => {
  let regionsUnique = new Set(regions)
  return [...regionsUnique].map(t => ({ town: t }))
}).then((towns) => {
  return mongoManager.insertMany('towns',towns)
}).then((res) => {
  console.log("Loading regions finished!")
})
