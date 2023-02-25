import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({baseurl: ''}),
  endpoints: (builder) => ({
    getLavs: builder.query({
      query: (gps) => ({
        url: `https://www.refugerestrooms.org/api/v1/restrooms/by_location?page=1&per_page=30&offset=0&lat=${gps.lat}&lng=${gps.long}`,
      }),
    }),
  }),
});

export const {
  useGetLavsQuery
} = apiSlice