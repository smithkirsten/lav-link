let convert = require('convert-zip-to-gps');


export const zipConverter = (zipcode) => {
  const coordinates = convert.zipConvert(zipcode).split(',');
  return {
    lat: coordinates[0],
    long: coordinates[1],
  }
}

export const roundDistance = (bathroom) => {
  console.log(bathroom.bathroom)
  const roundedDistance = bathroom.bathroom.distance.toFixed(2)
  return {
    roundedDistance
  }
};