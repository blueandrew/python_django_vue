<template>
	<div class="text-center pt-2">
		<div class="inline-flex rounded-md" role="group">
			<button data-tooltip-target="tooltip-bottom1_previous" data-tooltip-placement="bottom" type="button" class="me-3 mb-3 md:mb-0 text-coolGray-700 border border-coolGray-700  focus:outline-none font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
				:class = "currentStep == -1 ? 'bg-gray-100 cursor-not-allowed' : 'hover:bg-gray-200 hover:text-white'"
				@click="undo"
				:disabled="currentStep == -1 ? true : false"
			>
				<SvgComponents 
					:svgSize=24
					svgName="recover"
				/>
			</button>
			<div id="tooltip-bottom1_previous" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
				Undo
				<div class="tooltip-arrow" data-popper-arrow></div>
			</div>
		</div>

		<div class="inline-flex rounded-md" role="group">
			<button data-tooltip-target="tooltip-bottom_next" data-tooltip-placement="bottom" type="button" class="me-3 mb-3 md:mb-0 text-coolGray-700 border border-coolGray-700  focus:outline-none font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
				:class = "(mouseUpStepIndexList.length - 1) <= currentStep ? 'bg-gray-100 cursor-not-allowed' : 'hover:bg-gray-200 hover:text-white'"
				@click="redo"
				:disabled="(mouseUpStepIndexList.length - 1) <= currentStep ? true : false"
			>
				<SvgComponents 
					:svgSize=24
					svgName="redo"
				/>
			</button>
			<div id="tooltip-bottom_next" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
				Redo
				<div class="tooltip-arrow" data-popper-arrow></div>
			</div>
		</div>

		<div class="inline-flex rounded-md" role="group">
			<button data-tooltip-target="tooltip-bottom_save" data-tooltip-placement="bottom" type="button" class="me-3 mb-3 md:mb-0 text-coolGray-700 border border-coolGray-700 hover:bg-gray-200 hover:text-white focus:outline-none font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
				@click="saveWorks"
			>
				<SvgComponents 
					:svgSize=24
					svgName="saveWorks"
				/>
			</button>
			<div id="tooltip-bottom_save" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
				Save works
				<div class="tooltip-arrow" data-popper-arrow></div>
			</div>
		</div>
	</div>
	<div class="text-center pt-2">
		<div class="inline-flex rounded-md" role="group">
			<button data-tooltip-target="tooltip-bottom_pen" data-tooltip-placement="bottom" type="button" id="dropdownPenTypeButton" data-modal-target="dropdownPenType" data-modal-toggle="dropdownPenType" class="me-3 mb-3 md:mb-0 text-coolGray-700 border border-coolGray-700 hover:bg-gray-200 hover:text-white focus:outline-none font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center">
				<SvgComponents 
					:svgSize=24
					:svgName=penTypeInfo[toolbarData.penType].name
				/>
			</button>
			<div id="tooltip-bottom_pen" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
				{{ penTypeInfo[toolbarData.penType].comment }}
				<div class="tooltip-arrow" data-popper-arrow></div>
			</div>

			<!-- Dropdown menu -->
			<div id="dropdownPenType" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
				<div class="relative p-4 w-full max-w-md max-h-full">
					<!-- Modal content -->
					<div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
						<!-- Modal header -->
						<div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
							<h3 class="text-lg font-semibold text-gray-900 dark:text-white">
							Select Pen Type
							</h3>
							<button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="dropdownPenType">
								<svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
									<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
								</svg>
								<span class="sr-only">Close modal</span>
							</button>
						</div>
						<!-- Modal body -->
						<ul class="p-3 space-y-1 text-sm text-gray-700 overflow-y-auto h-80 " aria-labelledby="dropdownPenTypeButton">
							<li v-for='(penType, penIndex) in penTypeInfo' :key=penIndex >
								<div class="flex p-2 rounded">
									<div class="flex items-center h-5">
										<input name="helper-radio" type="radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300" :value=penIndex v-model='toolbarData.penType'>
									</div>
									<div class="ms-2 text-sm" :data-tooltip-target="'tooltip-bottom_' + penType.name" data-tooltip-placement="bottom">
										<SvgComponents 
											:svgSize=24
											:svgName=penType.name
										/>
									</div>
									<div :id="'tooltip-bottom_'+penType.name" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
										{{ penType.name }}
										<div class="tooltip-arrow" data-popper-arrow></div>
									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>

		<div class="inline-flex rounded-md" role="group">
			<button data-tooltip-target="tooltip-bottom_size" data-tooltip-placement="bottom" type="button" id="dropdownPenSizeButton" data-dropdown-toggle="dropdownPenSize" data-dropdown-placement="top" class="me-3 mb-3 md:mb-0 text-coolGray-700 border border-coolGray-700 hover:bg-gray-200 hover:text-white focus:outline-none font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center">
				<SvgComponents 
					:svgSize=24
					svgName="penSize"
				/>
			</button>
			<div id="tooltip-bottom_size" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
				Pen size
				<div class="tooltip-arrow" data-popper-arrow></div>
			</div>

			<!-- Dropdown menu -->
			<div id="dropdownPenSize" class="z-10 hidden bg-blue-50 rounded-lg">
				<ul class="p-3 space-y-1 text-sm text-gray-700" aria-labelledby="dropdowPenSizeButton">
					<li v-for='(penSizeName, penSizeIndex) in penSizeList' :key=penSizeIndex >
						<div class="flex p-2 rounded">
							<div class="flex items-center h-5">
								<input name="helper1-radio" type="radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300" :value='penSizeIndex' v-model='toolbarData.penSize'>
							</div>
							<div class="ms-2 text-sm">
								{{ penSizeName }} px
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>

		<div class="inline-flex rounded-md" role="group">
			<button data-tooltip-target="tooltip-bottom_clear" data-tooltip-placement="bottom" type="button" class="me-3 mb-3 md:mb-0 text-coolGray-700 border border-coolGray-700 hover:bg-gray-200 hover:text-white focus:outline-none font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
				@click="clearCanvas"
			>
				<SvgComponents 
					:svgSize=24
					svgName="clear"
				/>
			</button>
			<div id="tooltip-bottom_clear" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
				Clear
				<div class="tooltip-arrow" data-popper-arrow></div>
			</div>
		</div>

		<div class="inline-flex" role="group">
			<div data-tooltip-target="tooltip-bottom_color" data-tooltip-placement="bottom" type="button" class="md:mb-0 font-medium rounded-full text-sm p-1.5 me-3 text-center inline-flex items-center">
				<input class="w-9 h-9"  style="cursor: pointer;" type="color" v-model='toolbarData.color' />
			</div>

			<div id="tooltip-bottom_color" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
				Color picker
				<div class="tooltip-arrow" data-popper-arrow></div>
			</div>
		</div>
	</div>
</template>

<script setup>
  import { defineModel, defineEmits } from 'vue'

  import SvgComponents from '../SvgComponents.vue'

  const toolbarData = defineModel('toolbarData');
  const penTypeInfo = defineModel('penTypeInfo');
  const penSizeList = defineModel('penSizeList');

  const mouseUpStepIndexList = defineModel('mouseUpStepIndexList');
  const currentStep = defineModel('currentStep');
  const emit = defineEmits(['clearCanvas', 'saveWorks', 'undo', 'redo']);
  const clearCanvas = () => emit('clearCanvas');
  const saveWorks = () => emit('saveWorks');
  const undo = () => emit('undo');
  const redo = () => emit('redo');
</script>