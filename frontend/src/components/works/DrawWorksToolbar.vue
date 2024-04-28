<template>
	<div class="text-center pt-2">
		<div class="inline-flex rounded-md" role="group">
			<button data-tooltip-target="tooltip-bottom1_previous" data-tooltip-placement="bottom" type="button" class="me-3 mb-3 md:mb-0 text-coolGray-700 border border-coolGray-700  focus:outline-none font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
				:class = "drawRecover.length <= 0 ? 'bg-gray-100 cursor-not-allowed' : 'hover:bg-gray-200 hover:text-white'"
				@click="recover"
				:disabled="drawRecover.length <= 0 ? true : false"
			>
				<SvgComponents 
					:svgSize=24
					svgName="recover"
				/>
			</button>
			<div id="tooltip-bottom1_previous" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
				Recover
				<div class="tooltip-arrow" data-popper-arrow></div>
			</div>
		</div>

		<div class="inline-flex rounded-md" role="group">
			<button data-tooltip-target="tooltip-bottom_next" data-tooltip-placement="bottom" type="button" class="me-3 mb-3 md:mb-0 text-coolGray-700 border border-coolGray-700  focus:outline-none font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
				:class = "drawRedo.length <= 0 ? 'bg-gray-100 cursor-not-allowed' : 'hover:bg-gray-200 hover:text-white'"
				@click="redo"
				:disabled="drawRedo.length <= 0 ? true : false"
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
			<button data-tooltip-target="tooltip-bottom_open" data-tooltip-placement="bottom" type="button" class="me-3 mb-3 md:mb-0 text-coolGray-700 border border-coolGray-700 hover:bg-gray-200 hover:text-white focus:outline-none font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
				@click="openWorks"
			>
				<SvgComponents 
					:svgSize=24
					svgName="openWorks"
				/>
			</button>
			<div id="tooltip-bottom_open" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
				Open works
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
			<button data-tooltip-target="tooltip-bottom_pen" data-tooltip-placement="bottom" type="button" id="dropdownHelperRadioButton" data-dropdown-toggle="dropdownHelperRadio" data-dropdown-placement="top" class="me-3 mb-3 md:mb-0 text-coolGray-700 border border-coolGray-700 hover:bg-gray-200 hover:text-white focus:outline-none font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center">
				<SvgComponents 
					:svgSize=24
					:svgName=penTypeList[toolbarData.penType]
				/>
			</button>
			<div id="tooltip-bottom_pen" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
				{{ penTypeList[toolbarData.penType] }}
				<div class="tooltip-arrow" data-popper-arrow></div>
			</div>

			<!-- Dropdown menu -->
			<div id="dropdownHelperRadio"  class="z-10 hidden bg-blue-50 rounded-lg">
				<ul class="p-3 space-y-1 text-sm text-gray-700" aria-labelledby="dropdownHelperRadioButton">
					<li v-for='(penName, penIndex) in penTypeList' :key=penIndex >
						<div class="flex p-2 rounded">
							<div class="flex items-center h-5">
								<input name="helper-radio" type="radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300" :value=penIndex v-model='toolbarData.penType'>
							</div>
							<div class="ms-2 text-sm" :data-tooltip-target="'tooltip-bottom_' + penName" data-tooltip-placement="bottom">
								<SvgComponents 
									:svgSize=24
									:svgName=penName
								/>
							</div>

							<div :id="'tooltip-bottom_' + penName" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
								{{ penName }}
								<div class="tooltip-arrow" data-popper-arrow></div>
							</div>
						</div>
					</li>
					
				</ul>
			</div>
		</div>

		<div class="inline-flex rounded-md" role="group">
			<button data-tooltip-target="tooltip-bottom_size" data-tooltip-placement="bottom" type="button" id="dropdownHelperRadio1Button" data-dropdown-toggle="dropdownHelperRadio1" data-dropdown-placement="top" class="me-3 mb-3 md:mb-0 text-coolGray-700 border border-coolGray-700 hover:bg-gray-200 hover:text-white focus:outline-none font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center">
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
			<div id="dropdownHelperRadio1"  class="z-10 hidden bg-blue-50 rounded-lg">
				<ul class="p-3 space-y-1 text-sm text-gray-700" aria-labelledby="dropdownHelperRadioButton">
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
  const penTypeList = defineModel('penTypeList');
  const penSizeList = defineModel('penSizeList');

  const drawRecover = defineModel('drawRecover');
  const drawRedo = defineModel('drawRedo');

  const emit = defineEmits(['clearCanvas', 'saveWorks', 'openWorks', 'recover', 'redo']);
  const clearCanvas = () => emit('clearCanvas');
  const saveWorks = () => emit('saveWorks');
  const openWorks = () => emit('openWorks');
  const recover = () => emit('recover');
  const redo = () => emit('redo');
</script>