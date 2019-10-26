import { createElement } from 'react'

import Weather from './Weather'

export default function WeatherContainer() {
	const viewProps = {}

	return createElement(Weather, viewProps)
}
