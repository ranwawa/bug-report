import { getLastName2 } from '../utils/utils2'

getLastName2()

export function filterIllegalString2 (str) {
	return str.replace('ri', '')
}

export const getFirstName2 = () => {
	return 'ran'
}

export function getUserName2 () {
	return getFirstName2() + getLastName2()
}