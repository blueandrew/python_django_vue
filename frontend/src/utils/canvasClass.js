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

      this.canvasWidth = 600;
      this.canvasHeight = 600;

      this.drawData = [];

      this.currentPenColor = '#000000';
      this.currentPenSize = 10;

      this.pens = {
         'eraser': new Eraser(), 
         'generalPen': new GeneralPen(),
         'pencil': new Pencil(),
         'markerPen': new MarkerPen(),
         'airbrush': new Airbrush(),
         'crayon': new Crayon(),
      };

      this.currentPen = this.pens['pen1'];

      this.setBackgroundColor();
   }

   static getPenTypeInfo(){
      // let penTypeInfo = ['eraser', 'generalPen', 'pencil', 'markerPen', 'airbrush', 'crayon'];
      let penTypeInfo = [
         {'name':'eraser', 'comment': 'Eraser'},
         {'name':'generalPen', 'comment': 'GeneralPen'},
         {'name':'pencil', 'comment': 'Pencil'},
         {'name':'markerPen', 'comment': 'MarkerPen'},
         {'name':'airbrush', 'comment': 'Airbrush'},
         {'name':'crayon', 'comment': 'Crayon'},
            
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
      data.color = this.color;
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
}
