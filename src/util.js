let convert = require('convert-zip-to-gps');

export const zipConverter = (zipcode) => {
  const coordinates = convert.zipConvert(zipcode).split(',');
  return {
    lat: coordinates[0],
    long: coordinates[1],
  }
}

export const roundDistance = (bathroom) => {
  const rounded = bathroom.distance.toFixed(2)
  return rounded
}

export const reformatDate = (bathroom) => {
  const date = bathroom["updated_at"];
  const newDate = new Date(date)
  return `${newDate.getMonth()+1}/${newDate.getDate()}/${newDate.getFullYear()}`
};

export const validateZip = zip => {
  return /^\d{5}$/.test(zip);
}

export const cleanData = data => {
  return data.map(data => {
    return ({
      "id": data.id,
      "name": data.name,
      "street": data.street,
      "city": data.city,
      "state": data.state,
      "accessible": data.accessible,
      "unisex": data.unisex,
      "directions": data.directions,
      "comment": data.comment,
      "latitude": data.latitude,
      "longitude": data.longitude,
      "update_at": data.update_at,
      "downvote": data.downvote,
      "upvote": data.upvote,
      "country": data.country,
      "changing_table": data.changing_table,
    })
  })
}