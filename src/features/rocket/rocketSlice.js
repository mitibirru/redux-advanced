import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const ROCKET_URL = 'https://api.spacexdata.com/v3/rockets';

export const fetchRockets = createAsyncThunk('rockets/fetchRockets', async () => {
	const response = await axios.get(ROCKET_URL);
	response.data.forEach(object => {
		object.reserved = false;
	});
	return response;
});

const initialState = {
	rockets: {},
	status: 'idle',
	error: null,
	reserved: []
};

const rocketSlice = createSlice({
	name: 'rockets',
	initialState,
	reducers: {
		reserveRocket: (state, action) => {
			const rockets = state.rockets.data.find(results => results.id === action.payload);
			rockets.reserved = !rockets.reserved;
		},
		myReservedRockets: state => {
			const rockets = state.rockets.data.filter(rocket => rocket.reserved === true);
			state.reserved = rockets;
		}
	},
	extraReducers: builder => {
		builder
			.addCase(fetchRockets.pending, state => {
				state.status = 'loading';
			})
			.addCase(fetchRockets.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.rockets = action.payload;
			})
			.addCase(fetchRockets.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	}
});

export const selectAllRockets = state => state.rockets.rockets;
export const getRocketsStatus = state => state.rockets.status;
export const getRocketsError = state => state.rockets.error;
export const getReservedRockets = state => state.rockets.reserved;
export const { myReservedRockets, reserveRocket } = rocketSlice.actions;
export default rocketSlice.reducer;
