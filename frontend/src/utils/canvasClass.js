import {
   Eraser,
   GeneralPen,
   Pencil,
   MarkerPen,
   Airbrush,
   Crayon
} from './penClass'

export default class CanvasObj{
   constructor(canvasElement){
      this.canvas = canvasElement
      this.ctx = this.canvas.getContext('2d', {willReadFrequently:true});

      this.canvasWidth = this.canvas.width;
      this.canvasHeight = this.canvas.height;

      this.drawData = [];

      this.currentPenColor = '#000000';
      this.currentPenSize = 10;

      this.pens = {
         'Eraser': new Eraser(), 
         'GeneralPen': new GeneralPen(),
         'Pencil': new Pencil(),
         'MarkerPen': new MarkerPen(),
         'Airbrush': new Airbrush(),
         'Crayon': new Crayon(),
      };

      this.currentPen = this.pens['generalPen'];

      this.setBackgroundColor();
   }

   static getPenTypeInfo(){
      // let penTypeInfo = ['eraser', 'generalPen', 'pencil', 'markerPen', 'airbrush', 'crayon'];
      let penTypeInfo = [
         {'name':'Eraser', 'comment': 'Eraser'},
         {'name':'GeneralPen', 'comment': 'GeneralPen'},
         {'name':'Pencil', 'comment': 'Pencil'},
         {'name':'MarkerPen', 'comment': 'MarkerPen'},
         {'name':'Airbrush', 'comment': 'Airbrush'},
         {'name':'Crayon', 'comment': 'Crayon'},
            
      ];

      return penTypeInfo
   }

   static getPenSizeList(){
      let penTypeList = [5, 10, 15, 20];

      return penTypeList 
   }

   setBackgroundColor(){
      let imgData = this.ctx.getImageData(0, 0, this.canvasWidth, this.canvasHeight);
      for(let i=0; i<imgData.data.length; i+=4){
         imgData.data[i] = 255;
         imgData.data[i+1] = 255;
         imgData.data[i+2] = 255;
         imgData.data[i+3] = 255;
      }
      
      this.ctx.putImageData(imgData, 0, 0);
   }

   setCanvasSize(canvasWidth, canvasHeight){
      this.canvasWidth = canvasWidth;
      this.canvasHeight = canvasHeight;
   }

   setPenSettings(penType, penColor, penSize){
      this.currentPen = this.pens[penType];
      this.currentPenColor = penColor;
      this.currentPenSize = penSize;
   }

   usePen(lastX, lastY, x, y){
      this.ctx.beginPath();
      
      if(this.currentPen.type=="Crayon"){
         this.currentPen.draw(this.ctx, this.canvasWidth, this.canvasHeight, this.currentPenColor, this.currentPenSize, x, y);
      }else{
         this.currentPen.draw(this.ctx, this.currentPenColor, this.currentPenSize, lastX, lastY, x, y);
      }

      this.ctx.save();
      this.ctx.closePath();
   }

   clearCanvas(){
      this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
   }

   addDrawData(data){
      let widthScale = 65536/this.canvasWidth;

      data.x = data.x*widthScale;
      data.y = data.y*widthScale;
      data.color = this.currentPenColor;
      // data.action = data.action;
      data.penSize = this.currentPenSize*widthScale;
      data.penType = this.currentPen.type;

      this.drawData = [...this.drawData, data];
   }

   upDateDrawData(data){
      this.drawData = [...data];
   }

   deleteDrawData(idx){
      if(idx == -1){
         this.drawData = [];
         return
      } 

      this.drawData = this.drawData.slice(idx);
   }

   getSaveDrawData(){
      let saveDrawData = {};
      saveDrawData.width = this.canvasWidth; 
      saveDrawData.height = this.canvasHeight;
      saveDrawData.data = this.drawData;

      return saveDrawData
   }

   getImageUrlByData(){
      let imageUrl = '';
      
      if (this.drawData.length<1){
         return imageUrl
      }
      
      let tempCanvas = document.createElement('canvas');
      tempCanvas.width = this.canvasWidth;
      tempCanvas.height = this.canvasHeight;

      let tempctx = tempCanvas.getContext('2d');

      let lastX = 0;
      let lastY = 0;
      let currentPlayData = '';

      for (let idx in this.drawData){
         currentPlayData = this.drawData[idx];

         if (currentPlayData.action == 1) {
            this.setPenSettings(currentPlayData.penType, currentPlayData.color, currentPlayData.penSize);
         }

         if (currentPlayData.action == 3) {
            tempctx.beginPath();
      
            if(this.currentPen.type=="Crayon"){
               this.currentPen.draw(tempctx, this.canvasWidth, this.canvasHeight, this.currentPenColor, this.currentPenSize, currentPlayData.x, currentPlayData.y);
            }else{
               this.currentPen.draw(tempctx, this.currentPenColor, this.currentPenSize, lastX, lastY, currentPlayData.x, currentPlayData.y);
            }

            tempctx.save();
            tempctx.closePath();
         }

         lastX = currentPlayData.x;
         lastY = currentPlayData.y;
      }
      imageUrl = tempCanvas.toDataURL();
      tempCanvas.remove();

      return imageUrl
   }
}
