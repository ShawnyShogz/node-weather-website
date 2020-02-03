const request = require('request')

const geocode = (address, callback)=> {
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic2hhd255c2hvZ3oiLCJhIjoiY2swMWd5MjUzMW85eDNjbGF4a3RxeXkyMyJ9.X878Tsp-xwfz6Kwn9KFBbQ&limit=1'

    request({url, json: true}, (error, {body})=> {
        if(error){
            callback('Unable to connect to location services', undefined)
        } else if (body.features.length === 0){
            callback('Unable to find location try another search', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}
/*
geocode('Philadelphia', (error, data)=>{
    console.log('Error', error)
    console.log('Data', data)

})
*/
module.exports = geocode