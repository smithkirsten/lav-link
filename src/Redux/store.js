import { configureStore } from '@reduxjs/toolkit'
import landingReducer from '../components/Landing/landingSlice'
import { apiSlice  } from '../apicalls'

export default configureStore({
  reducer: {
    landing: landingReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (gDM) => gDM().concat(apiSlice.middleware),
})
