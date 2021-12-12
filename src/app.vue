<template>
	<div>{{ name2 }} aswescw</div>
</template>

<script>
import { getUserName2 } from './utils.js'

export default {
	data() {
		return {
			name2: getUserName2()
		}
	}
}
</script>

<style>

</style>