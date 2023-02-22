import { configureStore } from '@reduxjs/toolkit'
import landingReducer from '../components/Landing/landingSlice'
import searchReducer from '../components/Results/searchSlice'
import { apiSlice  } from '../apicalls'

export default configureStore({
  reducer: {
    landing: landingReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    search: searchReducer
  },
  middleware: (gDM) => gDM().concat(apiSlice.middleware),
})
