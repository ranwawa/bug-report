import {testA, testB, getUserName} from '../index'

it('testA', () => {
	expect(testA()).toBe(1);
});

it('testB', () => {
	expect(testB()).toBe(2);
});

it('getUserName ', () => {
	expect(getUserName()).toBe('ranwawa');
});