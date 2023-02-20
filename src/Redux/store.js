import { configureStore } from '@reduxjs/toolkit'
import landingReducer from '../components/Landing/landingSlice'

export default configureStore({
  reducer: {
    landing: landingReducer,
  },
})
