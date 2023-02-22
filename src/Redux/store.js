import { configureStore } from '@reduxjs/toolkit'
import landingReducer from '../components/Landing/landingSlice'
import searchReducer from '../components/Results/searchSlice'
import resultReducer from "../components/ResultCard/resultSlice";
import { apiSlice  } from '../apicalls'

export default configureStore({
  reducer: {
    landing: landingReducer,
    result: resultReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    search: searchReducer
  },
  middleware: (gDM) => gDM().concat(apiSlice.middleware),
})
