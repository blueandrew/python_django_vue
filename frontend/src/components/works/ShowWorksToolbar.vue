<template>
	<div class="text-center pt-2">
		<div class="inline-flex rounded-md" role="group">
			<button data-tooltip-target="tooltip-bottom_previousStep" data-tooltip-placement="bottom" type="button" class="me-3 mb-3 md:mb-0 text-coolGray-700 border border-coolGray-700  focus:outline-none font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
				:class = "isPreviousStep ? 'hover:bg-gray-200 hover:text-white' : 'bg-gray-100 cursor-not-allowed'"
				@click="drawPreviousStep"
				:disabled="!isPreviousStep"
			>
				<SvgComponents 
					:svgSize=24
					svgName="previousStep"
				/>
			</button>
			<div id="tooltip-bottom_previousStep" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
				Daw previous step
				<div class="tooltip-arrow" data-popper-arrow></div>
			</div>
		</div>

		<div class="inline-flex rounded-md" role="group">
			<button data-tooltip-target="tooltip-bottom_playt" data-tooltip-placement="bottom" type="button" class="me-3 mb-3 md:mb-0 text-coolGray-700 border border-coolGray-700  focus:outline-none font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
				:class = "isPlayEnd ? 'bg-gray-100 cursor-not-allowed' : 'hover:bg-gray-200 hover:text-white'"
				@click="isPause ? drawPlay() : drawPause()"
			>
				<SvgComponents 
					:svgSize=24
					:svgName="isPlayEnd ? 'refresh' : (isPause ? 'play' : 'Pause')"
				/>
			</button>
			<div id="tooltip-bottom_playt" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
				{{ isPause ? 'play' : 'Pause' }}
				<div class="tooltip-arrow" data-popper-arrow></div>
			</div>
		</div>

		<div class="inline-flex rounded-md" role="group">
			<button data-tooltip-target="tooltip-bottom_nextStep" data-tooltip-placement="bottom" type="button" class="me-3 mb-3 md:mb-0 text-coolGray-700 border border-coolGray-700  focus:outline-none font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
				:class = "isNextStep ? 'hover:bg-gray-200 hover:text-white' : 'bg-gray-100 cursor-not-allowed'"
				@click="drawNextStep"
				:disabled="!isNextStep"
			>
				<SvgComponents 
					:svgSize=24
					svgName="nextStep"
				/>
			</button>
			<div id="tooltip-bottom_nextStep" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
				Draw next step
				<div class="tooltip-arrow" data-popper-arrow></div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { defineModel, defineEmits } from 'vue'

	import SvgComponents from '../SvgComponents.vue'

	// const isAutoPlay = defineModel('isAutoPlay');
	const isPlayEnd = defineModel('isPlayEnd');
	const isPause = defineModel('isPause');
	const isNextStep = defineModel('isNextStep');
	const isPreviousStep = defineModel('isPreviousStep');

	const emit = defineEmits(['drawPlay', 'drawPause', 'drawNextStep', 'drawPreviousStep']);
	const drawPlay = () => emit('drawPlay');
	const drawPause = () => emit('drawPause');
	const drawNextStep = () => emit('drawNextStep');
	const drawPreviousStep = () => emit('drawPreviousStep');

</script>