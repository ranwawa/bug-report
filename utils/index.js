import { getLastName } from "./utils";

export function testA() {
	return 1;
}

export const testB = () => {
	return 2;
}

export const filterIllegalString = (str) => {
	return str.replace('ri', '')
}

export const getFirstName = () => {
	return 'ran'
}

export const getUserName = () => {
	return getFirstName() + getLastName()
}