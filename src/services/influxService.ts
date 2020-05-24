const debug = require('debug')('influxService');
debug("Initialized influx")

const Influx = require('influx')
const influx = new Influx.InfluxDB('http://localhost:8086/monuments')

function initInflux(){
    console.log("influx!")
    influx.getDatabaseNames().then((names: any) => {
        console.log(names)
    })
    influx.query(`select * from monument_visits`)
        .then( (result: any) => console.log(result) )
        .catch( (error: any) =>  console.log({ error }) )
}

export{
    initInflux
}


