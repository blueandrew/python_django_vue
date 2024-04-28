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
         :drawRecover="drawRecover"
         :drawRedo="drawRedo"
         :penTypeList="penTypeList"
         :penSizeList="penSizeList"
         @clearCanvas="clearCanvas"
         @saveWorks="saveWorks"
         @openWorks="openWorks"
         @recover="recover"
         @redo="redo"
      />

    </div>
  </section>
</template>

<script setup>
  import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
  
  import CanvasObj from '../../utils/canvasClass.js'
  import DrawWorksToolbar from '../../components/works/DrawWorksToolbar.vue'

  const toolbarInitData = {
    'penType': 1,
    'penSize': 0,
    'color': '#000000'
  };
  const toolbarData = reactive(toolbarInitData);

  const isDraw = ref(false);
  const canvas = ref(null);
  const canvasContainer = ref(null);

  const penTypeList = reactive(['eraser', 'pen1', 'pen2']);
  const penSizeList = reactive([5, 10]);

  const saveInitData = {
    'width': 600,
    'height': 600,
    'data': []
  };
  const saveData = reactive(saveInitData);
  const drawRecover = reactive([]);
  const drawRedo = reactive([]);
  
  let timer = 0;
  let startTimer = 0;
  let endTimer = 0;

  let canvasObj = null;
  let lastX = 0;
  let lastY = 0;

  const onSetCanvasInit= () => {
    canvas.value.width = 600;
    canvas.value.height = 600;
  }

  let onResize = () => {
    const rect = canvasContainer.value.getBoundingClientRect();

    if (rect.width < 768){
      canvas.value.width = rect.width;
      canvas.value.height = rect.width;
    }else{
      onSetCanvasInit();
    }
  }

  onMounted(() => {
    onSetCanvasInit()
    canvasObj = new CanvasObj(canvas.value);
    addEventListener ('resize', onResize);
  })

  onBeforeUnmount(() => {
    removeEventListener ('resize', onResize)
  })

  const mouseUp = (e) => {
    isDraw.value = false;

    endTimer = new Date().getTime();
    timer = endTimer - startTimer;

    let drawPoint = {
      'x': e.offsetX,
      'y': e.offsetY,
      'penType': penTypeList[toolbarData.penType],
      'color': toolbarData.color,
      'penSize': penSizeList[toolbarData.penSize],
      'penAction': 1,
      'time': timer
    };
    saveData.data.push(drawPoint);

    endTimer = 0;
  }

  const mouseDown = (e) => {
    canvasObj.setPenSettings(penTypeList[toolbarData.penType], toolbarData.color, penSizeList[toolbarData.penSize]);
    isDraw.value = true;
    lastX = e.offsetX;
    lastY = e.offsetY;

    drawRecover.push(canvasObj.saveImageData());

    let drawPoint = {
      'x': e.offsetX,
      'y': e.offsetY,
      'penType': penTypeList[toolbarData.penType],
      'color': toolbarData.color,
      'penSize': penSizeList[toolbarData.penSize],
      'penAction': 0,
      'time': 0
    };
    saveData.data.push(drawPoint);

    startTimer = new Date().getTime();

  }

  const mouseMove = (e) => {
    if (!isDraw.value){
      return
    }
    canvasObj.usePen(lastX, lastY, e.offsetX, e.offsetY);
    lastX = e.offsetX;
    lastY = e.offsetY;

    drawRedo.splice(0);
  }

  const mouseOut = () => {
    if (!isDraw.value){
      return
    }

    isDraw.value = false;
  }

  const clearCanvas = () => {
    canvasObj.clearCasve(canvas.value.width, canvas.value.height)
    drawRecover.splice(0);
    drawRedo.splice(0);
    saveData.width = 600;
    saveData.height = 600;
    saveData.data = [];
  }

  const saveWorks = () => {
    alert('Save function under development.');
  }

  const openWorks = () => {
    alert('open Function under development.');
  }

  const recover = () => {
    if (drawRecover.length>0){
      let recoverData = drawRecover.pop();
      drawRedo.push(canvasObj.saveImageData());
      canvasObj.putImageData(recoverData, canvas.value.width, canvas.value.height);

      let drawPoint = {
        'x': 0,
        'y': 0,
        'penType': "eraser",
        'color': '#ffffff',
        'penSize': 0,
        'penAction': 2,
        'time': 0
      };
      saveData.data.push(drawPoint);
    }else{
      return
    }
  }

  const redo = () => {
    if (drawRedo.length>0){
      let redoData = drawRedo.pop();
      drawRecover.push(canvasObj.saveImageData());
      canvasObj.putImageData(redoData, canvas.value.width, canvas.value.height);

      let drawPoint = {
        'x': 0,
        'y': 0,
        'penType': "eraser",
        'color': '#ffffff',
        'penSize': 0,
        'penAction': 3,
        'time': 0
      };
      saveData.data.push(drawPoint);
    }else{
      return
    }
  }
</script>