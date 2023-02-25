let convert = require('convert-zip-to-gps');
const reverse = require('reverse-geocode')

export const zipConverter = (zipcode) => {
  if (!(convert.zipConvert(zipcode) && validateZip(zipcode))) {
    return false;
  }
  const coordinates = convert.zipConvert(zipcode).split(',');
  return {
    lat: coordinates[0],
    long: coordinates[1],
  }
}

export const geoConverter = (lat, long) => {
  return reverse.lookup(lat, long, 'us')
}

export const reformatDate = (date) => {
  const newDate = new Date(date)
  return `${newDate.getMonth()+1}/${newDate.getDate()}/${newDate.getFullYear()}`
};

export const validateZip = zip => {
  return (/^\d{5}$/.test(zip));
}

export const cleanData = data => {
  return data.map(data => {
    return {

      id: data.id,
      name: data.name,
      street: data.street,
      city: data.city,
      state: data.state,
      accessible: data.accessible,
      unisex: data.unisex,
      directions: data.directions,
      distance: (+data.distance).toFixed(2),
      comment: data.comment,
      latitude: data.latitude,
      longitude: data.longitude,
      updated_at: data.updated_at ? reformatDate(data.updated_at) : 'unknown',
      downvote: data.downvote,
      upvote: data.upvote,
      country: data.country,
      changing_table: data.changing_table,
    }
  })
}