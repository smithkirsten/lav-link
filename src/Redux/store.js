import { configureStore } from '@reduxjs/toolkit'
import landingReducer from '../components/Landing/landingSlice'
import resultReducer from "../components/ResultCard/resultSlice";
import { apiSlice  } from '../apicalls'

export default configureStore({
  reducer: {
    landing: landingReducer,
    result: resultReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (gDM) => gDM().concat(apiSlice.middleware),
})
