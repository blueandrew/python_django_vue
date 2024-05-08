<template>
  <section class="bg-white">
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
     
      <div class="mx-auto max-w-screen-sm text-center lg:mb-8 mb-4">
        <h2 class="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900">Draw Works</h2>
      </div>
      <div class="text-center" ref="canvasContainer">
        <canvas class="mx-auto border border-gray-200 " width="600" height="600"
          ref="canvas"
          @mouseup="mouseUp"
          @mousedown="mouseDown"
          @mousemove="mouseMove"
          @mouseout="mouseOut"
        />
      </div>
      
      <DrawWorksToolbar
         v-model:toolbarData="toolbarData"
         :mouseUpStepIndexList="mouseUpStepIndexList"
         :currentStep="currentStep"
         :penTypeInfo="penTypeInfo"
         :penSizeList="penSizeList"
         @clearCanvas="clearCanvas"
         @saveWorks="saveWorks"
         @undo="undo"
         @redo="redo"
      />

    </div>
  </section>
</template>

<script setup>
  import { initFlowbite } from 'flowbite'
  import { ref, reactive, toRaw, onMounted, onBeforeUnmount } from 'vue'
  
  import CanvasObj from '../../utils/canvasClass.js'
  import DrawWorksToolbar from '../../components/works/DrawWorksToolbar'

  const toolbarInitData = {
    'penType': 1,
    'penSize': 0,
    'color': '#000000'
  };
  const toolbarData = reactive(toolbarInitData);

  const penTypeInfo = reactive([]);
  const penSizeList = reactive([]);
  penTypeInfo.push(...CanvasObj.getPenTypeInfo());
  penSizeList.push(...CanvasObj.getPenSizeList());

  const isDraw = ref(false);
  const canvasContainer = ref(null);
  const canvas = ref(null);

  const drawHistoryData = ref([]);
  const mouseUpStepIndexList = ref([]);
  const currentStep = ref(-1);

  let canvasObj = null;
  let canvasRect = null;
  let lastX = 0;
  let lastY = 0;

  const onSetCanvasInit= () => {
    canvas.value.width = 600;
    canvas.value.height = 600;
  };

  let onResize = () => {
    const rect = canvasContainer.value.getBoundingClientRect();

    if (rect.width < 768) {
      canvas.value.width = rect.width;
      canvas.value.height = rect.width;
    }else{
      onSetCanvasInit();
    }
  
    canvasObj.setCanvasSize(canvas.value.width, canvas.value.height);
  }

  onMounted(() => {
    initFlowbite();
    onSetCanvasInit();
    canvasObj = new CanvasObj(canvas.value);
    canvasRect = canvasObj.getBoundingClientRect();
    addEventListener ('resize', onResize);
  })

  onBeforeUnmount(() => {
    removeEventListener ('resize', onResize);
  })

  const mouseDown = (e) => {
    isDraw.value = true;

    lastX = (e.type=='touchmove') ? e.touches[0].clientX - canvasRect.left : e.offsetX;
    lastY = (e.type=='touchmove') ? e.touches[0].clientY - canvasRect.top : e.offsetY;

    if ((mouseUpStepIndexList.value.length-1) > currentStep.value) {
      canvasObj.deleteDrawData(mouseUpStepIndexList.value[currentStep.value]);
      drawHistoryData.value = toRaw(drawHistoryData.value).slice(0, mouseUpStepIndexList.value[currentStep.value]);
      mouseUpStepIndexList.value = mouseUpStepIndexList.value.slice(0, currentStep.value+1);
    }

    canvasObj.setPenSettings(penTypeInfo[toolbarData.penType].name, toolbarData.color, penSizeList[toolbarData.penSize]);
    canvasObj.addDrawData({
      "x": lastX,
      "y": lastY,
      "action":1
    });

    drawHistoryData.value.push(canvasObj.drawData.slice(-1));
  }

  const mouseUp = (e) => {
    isDraw.value = false;

    lastX = (e.type=='touchmove') ? e.touches[0].clientX - canvasRect.left : e.offsetX;
    lastY = (e.type=='touchmove') ? e.touches[0].clientX - canvasRect.top : e.offsetY;

    canvasObj.addDrawData({
      "x": lastX,
      "y": lastY,
      "action":2
    });
    drawHistoryData.value.push(canvasObj.drawData.slice(-1));

    if (drawHistoryData.value.length>1){
      currentStep.value += 1;
      mouseUpStepIndexList.value.push(drawHistoryData.value.length-1);
    }
  }

  const mouseMove = (e) => {
    if (!isDraw.value){
      return
    }

    let offsetX = (e.type=='touchmove') ? e.touches[0].clientX - canvasRect.left : e.offsetX;
    let offsetY = (e.type=='touchmove') ? e.touches[0].clientX - canvasRect.top : e.offsetY;

    canvasObj.usePen(lastX, lastY, offsetX, offsetY);
    
    lastX = (e.type=='touchmove') ? e.touches[0].clientX - canvasRect.left : e.offsetX;
    lastY = (e.type=='touchmove') ? e.touches[0].clientX - canvasRect.top : e.offsetY;

    canvasObj.addDrawData({
      "x": lastX,
      "y": lastY,
      "action":3
    });
    drawHistoryData.value.push(canvasObj.drawData.slice(-1));
  }

  const mouseOut = (e) => {
    if (!isDraw.value){
      return
    }

    mouseUp(e);

    isDraw.value = false;
  }

  const clearCanvas = () => {
    canvasObj.clearCanvas();
    currentStep.value = -1;
    mouseUpStepIndexList.value = [];
    canvasObj.drawData = [];
    drawHistoryData.value = [];
  }

  const saveWorks = () => {
    let saveDrawData = canvasObj.getSaveDrawData();
    const blob = new Blob([JSON.stringify(saveDrawData)], { type: "text/json" });
    const link = document.createElement("a");

    link.download = 'drawHistoryData.json';
    link.href = window.URL.createObjectURL(blob);
    link.dataset.downloadurl = ["text/json", link.download, link.href].join(":");

    const evt = new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: true,
    });

    link.dispatchEvent(evt);
    link.remove();
  }

  const undo = () => {
    currentStep.value -= 1;

    if (currentStep.value === -1) {
      canvasObj.clearCanvas();
      canvasObj.deleteDrawData(-1);

      return
    }
   
    let drawWithStepData = toRaw(drawHistoryData.value).slice(0, mouseUpStepIndexList.value[currentStep.value]);
    drawWithStepData = [].concat(...drawWithStepData);
    let convertDrawDataList = convertDrawData(drawWithStepData);
    drawWithStep(convertDrawDataList);
  }

  const redo = () => {
    currentStep.value += 1;

    let drawWithStepData = toRaw(drawHistoryData.value).slice(0, mouseUpStepIndexList.value[currentStep.value]);
    drawWithStepData = [].concat(...drawWithStepData);
    let convertDrawDataList = convertDrawData(drawWithStepData);
    drawWithStep(convertDrawDataList);
    
    let upDateDrawData = structuredClone(canvasObj.drawData);
    upDateDrawData.push(drawWithStepData.slice(canvasObj.drawData.length));

    canvasObj.upDateDrawData(upDateDrawData);
  }


  const drawWithStep = (drawWithStepData) => {
    canvasObj.clearCanvas();

    let currentPlayData = [];
    let x = 0;
    let y = 0;

    for(let i=0; i<drawWithStepData.length; i++){
      currentPlayData = drawWithStepData[i];
      x = (i < 1) ? 0 : drawWithStepData[i - 1].x;
      y = (i < 1) ? 0 : drawWithStepData[i - 1].y;

      drawAction(currentPlayData, x, y);
    }
  }

  const drawAction = (currentPlayData, lastX, lastY) => {
    if (currentPlayData.action == 1) {
      canvasObj.setPenSettings(currentPlayData.penType, currentPlayData.color, currentPlayData.penSize);
    }

    if(currentPlayData.action==3){
      canvasObj.usePen(lastX, lastY, currentPlayData.x, currentPlayData.y);
    } 
  }

  const convertDrawData = (data) => {
    let drawList = structuredClone(data);
    for(let i=0; i<data.length; i++){
      drawList[i].x = Math.floor(data[i].x / 65536 * canvasObj.canvasWidth);
      drawList[i].y = Math.floor(data[i].y / 65536 * canvasObj.canvasWidth);
      drawList[i].penSize = Math.ceil(data[i].penSize / 65536 * canvasObj.canvasWidth);
    }

    return drawList
  }
</script>