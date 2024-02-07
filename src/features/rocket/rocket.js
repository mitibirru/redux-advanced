import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRockets, getRocketsError, getRocketsStatus, reserveRocket, selectAllRockets } from './rocketSlice';

function RocketIndex() {
	const rocketStatus = useSelector(getRocketsStatus);
	const { data: rockets } = useSelector(selectAllRockets);
	const error = useSelector(getRocketsError);
	const dispatch = useDispatch();

	useEffect(() => {
		if (rocketStatus == 'idle') dispatch(fetchRockets());
	}, [rocketStatus, dispatch]);

	const displayReservedText = currState => {
		return currState ? 'Cancel Reservation' : 'Reserve Rockets';
	};

	const handleReserveRocket = id => {
		dispatch(reserveRocket(id));
	};

	let contentToDisplay = '';
	if (rocketStatus === 'loading') {
		contentToDisplay = <h2>Loading...</h2>;
	} else if (rocketStatus === 'succeeded') {
		contentToDisplay = rockets.map((data, index) => (
			<div key={data.id}>
				<h2>{data.rocket_name}</h2>
				<p>
					{data.reserved && (
						<span
							style={{
								marginRight: 10,
								border: '1px solid',
								padding: '2px 4px'
							}}
							bg="info">
							Reserved
						</span>
					)}
					{data.description}
				</p>
				<button onClick={() => handleReserveRocket(data.id)} type="button">
					{displayReservedText(data.reserved)}
				</button>
				<hr />
			</div>
		));
	} else if (rocketStatus === 'failed') {
		contentToDisplay = <p>{error}</p>;
	}

	return (
		<div>
			<h1>Rockets Page</h1>
			{contentToDisplay}
		</div>
	);
}

export default RocketIndex;
