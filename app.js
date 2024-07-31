document.addEventListener('alpine:init', () => {
	
	const APIKEY = 'ff9b41622f994b1287a73535210809';

	Alpine.data('weatherSearch', () => ({
		weatherCitySearch: 'paris',
		weatherData: null,
		errorMessage: null,
		fetchWeatherData() {
			this.errorMessage = null;
			fetch(`https://api.weatherapi.com/v1/forecast.json?key=${APIKEY}&q=${this.weatherCitySearch}&days=3`)
				.then((response) => {
					if (!response.ok) {
						throw new Error('Network response was not ok');
					}
					return response.json();
				})
				.then((json) => {
					this.weatherData = json;
				})
				.catch((error) => {
					this.errorMessage = 'Failed to fetch weather data. Please try again later.';
				});
		},

		weekDayLong(date) {
			const options = {
				weekday: 'long',
			};

			return new Date(date).toLocaleDateString('en-FR', options);
		},

		formattedDateDisplay(date) {
			const options = {
				year: 'numeric',
				month: 'long',
				day: 'numeric',
			};

			return new Date(date).toLocaleDateString('en-GB', options);
		},
	}));

});

