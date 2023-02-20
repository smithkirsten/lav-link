// import { useSelector } from 'react-redux'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// const gps = useSelector((state) => state.landing.gpsCoordinates.value)

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "www.refugerestrooms.org/api/" }),
  // tagTypes: ['Post'],
  endpoints: (builder) => ({
    getLavs: builder.query({
      query: (gps) => ({
        url: `v1/restrooms/by_location?page=1&per_page=30&offset=0&lat=${gps.lat}&lng=${gps.long}`,
         responseHandler: (response) => response.text(),
      }),
      // providesTags: ['Post']
    }),
  }),
});

export const {
  useGetLavsQuery
} = apiSlice