<template>
  <section class="bg-white">
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
     
      <div class="mx-auto max-w-screen-sm text-center lg:mb-8 mb-4">
        <h2 class="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900">Draw Works</h2>
      </div>
      <div class="text-center" ref="canvasContainer">
        <canvas class="mx-auto border border-gray-200 " width="600" height="600"
          ref="canvas"
        />
      </div>
      
      <ShowWorksToolbar
        :isRefresh="isRefresh"
        :isPlayEnd="isPlayEnd"
        :isAutoPlay="isAutoPlay"
        :isPause="isPause"
        :isNextStep="isNextStep"
        :isPreviousStep="isPreviousStep"
        @drawPlayRefresh="drawPlayRefresh"
        @drawPlay="drawPlay"
        @drawPause="drawPause"
        @drawNextStep="drawNextStep"
        @drawPreviousStep="drawPreviousStep"
        @openWorks="openWorks"
      />

    </div>
  </section>
</template>

<script setup>
  import { ref, reactive, toRaw, onMounted, onBeforeUnmount } from 'vue'

  import CanvasObj from '../../utils/canvasClass.js'
  import ShowWorksToolbar from '../../components/works/ShowWorksToolbar.vue'

  const isRefresh = ref(false);
  const isPlayEnd = ref(false);
  const isAutoPlay = ref(false);
  const isPause = ref(true);
  const isNextStep = ref(true);
  const isPreviousStep = ref(false);

  const canvas = ref(null);
  const canvasContainer = ref(null);

  let canvasObj = null;

  let drawDataJson = {
    "width": 600,
    "height": 600,
    "data": [
      {"x":20992, "y":12792, "color":"#c0392b", "action":1, "penSize":2184, "penType":"pen1", "time":0},
      {"x":20992, "y":12792, "color":"#c0392b", "action":3, "penSize":2184, "penType":"pen1", "time":0},
      {"x":20992, "y":13940, "color":"#c0392b", "action":3, "penSize":2184, "penType":"pen1", "time":0},
      {"x":20336, "y":15088, "color":"#c0392b", "action":3, "penSize":2184, "penType":"pen1", "time":0},
      {"x":19844, "y":15908, "color":"#c0392b", "action":3, "penSize":2184, "penType":"pen1", "time":0},
      {"x":19680, "y":17056, "color":"#c0392b", "action":3, "penSize":2184, "penType":"pen1", "time":0},
      {"x":19024, "y":17876, "color":"#c0392b", "action":3, "penSize":2184, "penType":"pen1", "time":0},
      {"x":18040, "y":19680, "color":"#c0392b", "action":3, "penSize":2184, "penType":"pen1", "time":0},
      {"x":17712, "y":20500, "color":"#c0392b", "action":3, "penSize":2184, "penType":"pen1", "time":0},
      {"x":17056, "y":21648, "color":"#c0392b", "action":3, "penSize":2184, "penType":"pen1", "time":0},
      {"x":16564, "y":22468, "color":"#c0392b", "action":3, "penSize":2184, "penType":"pen1", "time":0},
      {"x":16072, "y":23124, "color":"#c0392b", "action":3, "penSize":2184, "penType":"pen1", "time":0},
      {"x":15744, "y":23780, "color":"#c0392b", "action":3, "penSize":2184, "penType":"pen1", "time":0},
      {"x":15416, "y":24600, "color":"#c0392b", "action":3, "penSize":2184, "penType":"pen1", "time":0},
      {"x":15252, "y":25092, "color":"#c0392b", "action":3, "penSize":2184, "penType":"pen1", "time":0},
      {"x":15088, "y":25584, "color":"#c0392b", "action":3, "penSize":2184, "penType":"pen1", "time":0},
      {"x":14760, "y":26404, "color":"#c0392b", "action":3, "penSize":2184, "penType":"pen1", "time":0},
      {"x":14432, "y":26896, "color":"#c0392b", "action":3, "penSize":2184, "penType":"pen1", "time":0},
      {"x":14432, "y":27224, "color":"#c0392b", "action":3, "penSize":2184, "penType":"pen1", "time":0},
      {"x":14104, "y":27880, "color":"#c0392b", "action":3, "penSize":2184, "penType":"pen1", "time":0},
      {"x":13776, "y":28372, "color":"#c0392b", "action":3, "penSize":2184, "penType":"pen1", "time":0},
      {"x":13776, "y":28864, "color":"#c0392b", "action":3, "penSize":2184, "penType":"pen1", "time":0},
      {"x":13776, "y":28864, "color":"#c0392b", "action":3, "penSize":2184, "penType":"pen1", "time":0},
      {"x":13776, "y":29028, "color":"#c0392b", "action":3, "penSize":2184, "penType":"pen1", "time":0},
      {"x":13776, "y":29028, "color":"#c0392b", "action":3, "penSize":2184, "penType":"pen1", "time":0},
      {"x":10496, "y":41984, "color":"#c0392b", "action":2, "penSize":2184, "penType":"pen1", "time":0},

      {"x":10496, "y":41984, "color":"#090aed", "action":1, "penSize":2184, "penType":"pen1", "time":0},
      {"x":10496, "y":41984, "color":"#090aed", "action":3, "penSize":2184, "penType":"pen1", "time":0},
      {"x":10660, "y":41984, "color":"#090aed", "action":3, "penSize":2184, "penType":"pen1", "time":0},
      {"x":11972, "y":41328, "color":"#090aed", "action":3, "penSize":2184, "penType":"pen1", "time":0},
      {"x":13284, "y":40836, "color":"#090aed", "action":3, "penSize":2184, "penType":"pen1", "time":0},
      {"x":15088, "y":40180, "color":"#090aed", "action":3, "penSize":2184, "penType":"pen1", "time":0},
      {"x":17056, "y":39360, "color":"#090aed", "action":3, "penSize":2184, "penType":"pen1", "time":0},
      {"x":18696, "y":38376, "color":"#090aed", "action":3, "penSize":2184, "penType":"pen1", "time":0},
      {"x":20336, "y":37556, "color":"#090aed", "action":3, "penSize":2184, "penType":"pen1", "time":0},
      {"x":22304, "y":36736, "color":"#090aed", "action":3, "penSize":2184, "penType":"pen1", "time":0},
      {"x":24436, "y":35588, "color":"#090aed", "action":3, "penSize":2184, "penType":"pen1", "time":0},
      {"x":26240, "y":34932, "color":"#090aed", "action":3, "penSize":2184, "penType":"pen1", "time":0},
      {"x":28208, "y":34112, "color":"#090aed", "action":3, "penSize":2184, "penType":"pen1", "time":0},
      {"x":29684, "y":33456, "color":"#090aed", "action":3, "penSize":2184, "penType":"pen1", "time":0},
      {"x":31488, "y":32800, "color":"#090aed", "action":3, "penSize":2184, "penType":"pen1", "time":0},
      {"x":33456, "y":31652, "color":"#090aed", "action":3, "penSize":2184, "penType":"pen1", "time":0},
      {"x":35588, "y":30832, "color":"#090aed", "action":3, "penSize":2184, "penType":"pen1", "time":0},
      {"x":36736, "y":30340, "color":"#090aed", "action":3, "penSize":2184, "penType":"pen1", "time":0},
      {"x":38048, "y":29684, "color":"#090aed", "action":3, "penSize":2184, "penType":"pen1", "time":0},
      {"x":38376, "y":29520, "color":"#090aed", "action":3, "penSize":2184, "penType":"pen1", "time":0},
      {"x":38868, "y":29028, "color":"#090aed", "action":3, "penSize":2184, "penType":"pen1", "time":0},
      {"x":39360, "y":29028, "color":"#090aed", "action":3, "penSize":2184, "penType":"pen1", "time":0},
      {"x":39360, "y":29028, "color":"#090aed", "action":3, "penSize":2184, "penType":"pen1", "time":0},
      {"x":47888, "y":34932, "color":"#090aed", "action":2, "penSize":2184, "penType":"pen1", "time":0},

      {"x":47888, "y":34932, "color":"#014f14", "action":1, "penSize":2184, "penType":"pen1", "time":0},
      {"x":48052, "y":36080, "color":"#014f14", "action":3, "penSize":2184, "penType":"pen1", "time":0},
      {"x":48052, "y":37064, "color":"#014f14", "action":3, "penSize":2184, "penType":"pen1", "time":0},
      {"x":48052, "y":38376, "color":"#014f14", "action":3, "penSize":2184, "penType":"pen1", "time":0},
      {"x":48052, "y":40016, "color":"#014f14", "action":3, "penSize":2184, "penType":"pen1", "time":0},
      {"x":48052, "y":41492, "color":"#014f14", "action":3, "penSize":2184, "penType":"pen1", "time":0},
      {"x":48052, "y":43296, "color":"#014f14", "action":3, "penSize":2184, "penType":"pen1", "time":0},
      {"x":48052, "y":45264, "color":"#014f14", "action":3, "penSize":2184, "penType":"pen1", "time":0},
      {"x":48052, "y":46576, "color":"#014f14", "action":3, "penSize":2184, "penType":"pen1", "time":0},
      {"x":48052, "y":47396, "color":"#014f14", "action":3, "penSize":2184, "penType":"pen1", "time":0},
      {"x":48052, "y":48052, "color":"#014f14", "action":3, "penSize":2184, "penType":"pen1", "time":0},
      {"x":48052, "y":48216, "color":"#014f14", "action":3, "penSize":2184, "penType":"pen1", "time":0},
      {"x":4592, "y":72488, "color":"#014f14", "action":2, "penSize":2184, "penType":"pen1", "time":0}
    ]
  };
  const convertDrawData = (drawData) => {
    let drawList = structuredClone(drawData);

    for(let i=0; i<drawData.length; i++){
      drawList[i].x = Math.floor(drawData[i].x / 65536 * canvasObj.canvasWidth);
      drawList[i].y = Math.floor(drawData[i].y / 65536 * canvasObj.canvasWidth);
      drawList[i].penSize = Math.ceil(drawData[i].penSize / 65536 * canvasObj.canvasWidth);
    }
    
    return drawList
  }

  const drawData = reactive(drawDataJson);
  const currentStep = ref(0);

  const onSetCanvasInit= () => {
    canvas.value.width = 600;
    canvas.value.height = 600;
  };
  
  let onResize = () => {
    const rect = canvasContainer.value.getBoundingClientRect();

    if (rect.width < 768){
      canvas.value.width = rect.width;
      canvas.value.height = rect.width;
    }else{
      onSetCanvasInit();
    }

    canvasObj.setCanvasSize(canvas.value.width, canvas.value.height)
  }
  
  onMounted(() => {
    onSetCanvasInit();
    canvasObj = new CanvasObj(canvas.value);
    addEventListener ('resize', onResize);
  })

  onBeforeUnmount(() => {
    removeEventListener ('resize', onResize);
  })

  const readSelectedJSON = (event) => {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.onload = (event) => {
      Object.assign(drawData, JSON.parse(event.target.result));

      canvas.value.width = drawData.width;
      canvas.value.height = drawData.height;

      drawPlayRefresh();
      drawPlay();
    };
    reader.readAsText(file);
  }

  const openWorks = () => {
    let input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (event) =>  {
        readSelectedJSON(event);
    };
    input.click();
  }

  const drawPlayRefresh = () => {
    canvasObj.clearCanvas();
    currentStep.value = 0;
    isRefresh.value = false;
    isPlayEnd.value = false;
    isAutoPlay.value = false;
    isPause.value = true;
    isNextStep.value = true;
    isPreviousStep.value= false;
  }

  const drawPlay = () => {
    if (currentStep.value >= drawData.data.length){
      isPlayEnd.value = true;
      isRefresh.value = true;
      isAutoPlay.value = false;
      isPause.value = true;
      isNextStep.value = false;
      isPreviousStep.value = true;

      return
    }

    let playData = convertDrawData(toRaw(drawData).data);
    let currentStepNum = currentStep.value;
    let currentPlayData = playData[currentStepNum];
    let lastX = (currentStepNum < 1) ? 0 : playData[currentStepNum - 1].x;
    let lastY = (currentStepNum < 1) ? 0 : playData[currentStepNum - 1].y;

    isAutoPlay.value = true;
    isPause.value = false;
    isNextStep.value = false;
    isPreviousStep.value = false;

    draw(currentStepNum, currentPlayData, lastX, lastY)
  }
  
  const drawPause = () => {
    isAutoPlay.value = false;
    isPause.value = true;
    isNextStep.value = true;
    isPreviousStep.value = true;
  }

  const drawNextStep = () => {
    let playData = convertDrawData(toRaw(drawData).data);
    let drawWithStepData = playData;

    isAutoPlay.value = false;
    isPause.value = true;
    isNextStep.value = true;
    isPreviousStep.value = true;

    currentStep.value +=  1;
    if (currentStep.value >= drawDataJson.data.length){
      isPlayEnd.value = true;
      isRefresh.value = true;
      isNextStep.value = false;
    }

    drawWithStepData = playData.slice(0, currentStep.value);
    drawWithStep(drawWithStepData);
  }

  const drawPreviousStep = () => {
    let playData = convertDrawData(toRaw(drawData).data);
    let drawWithStepData = playData;

    isPlayEnd.value = false;
    isRefresh.value = false;
    isAutoPlay.value = false;
    isPause.value = true;
    isNextStep.value = true;
    isPreviousStep.value = true;

    currentStep.value -=  1;
    if (currentStep.value == 0) {
      isPreviousStep.value = false;
    }

    drawWithStepData = playData.slice(0, currentStep.value);
    drawWithStep(drawWithStepData);
  }

  const draw = (currentStepNum, currentPlayData, lastX, lastY) => {
    setTimeout(function(){
      drawAction(currentPlayData, lastX, lastY)

      currentStep.value +=  1;
      if (isAutoPlay.value) {
        drawPlay();
      }
    }, 10);  
  }

  const drawWithStep = (drawWithStepData) => {
    canvasObj.clearCanvas();

    let currentPlayData = [];
    let lastX = 0;
    let lastY = 0;

    for(let i=0; i<drawWithStepData.length; i++){
      currentPlayData = drawWithStepData[i]
      lastX = (i < 1) ? 0 : drawWithStepData[i - 1].x;
      lastY = (i < 1) ? 0 : drawWithStepData[i - 1].y;

      drawAction(currentPlayData, lastX, lastY);
    }
  }

  const drawAction = (currentPlayData, lastX, lastY) => {
    if (currentPlayData.action == 1) {
      canvasObj.setPenSettings(currentPlayData.penType, currentPlayData.color, currentPlayData.penSize);
    }

    if (currentPlayData.action == 3) {
      canvasObj.usePen(lastX, lastY, currentPlayData.x, currentPlayData.y);
    } 
  }
</script>