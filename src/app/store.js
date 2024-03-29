import { configureStore } from '@reduxjs/toolkit';
import rocketReducer from '../features/rocket/rocketSlice';

const store = configureStore({
	reducer: {
		rockets: rocketReducer
	}
});

export default store;
