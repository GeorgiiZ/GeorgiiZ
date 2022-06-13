const Influx = require('influx')

export class InfluxSerivce {
    readonly dataBase = 'monuments'
    readonly influx: any;

    constructor(){
        //this.influx = new Influx.InfluxDB(`http://localhost:8086/${this.dataBase}`)
    }

    testInflux(){
        // this.influx.getDatabaseNames().then((names: any) => {
        //     console.log(names)
        // })
        // this.influx.query(`select * from monument_visits`)
        //     .then( (result: any) => console.log(result) )
        //     .catch( (error: any) =>  console.log({ error }) )
    }

    async writeMonumentVisit(visitsCount: number, monumentId: number, userId: number | null = null){
        // try {
        //     await this.influx.writePoints([
        //         {
        //             measurement: 'monument_visits',
        //             tags: {
        //                 monument_id: monumentId,
        //                 user_id: userId,
        //             },
        //             fields: { value: visitsCount },
        //             timestamp: Date.now(),
        //         }
        //     ], {
        //         database: this.dataBase,
        //         precision: 's',
        //     })
        // } catch (e) {
        //     console.log(e)
        // }
    }
}

