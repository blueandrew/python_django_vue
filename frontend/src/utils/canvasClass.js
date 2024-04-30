class Pen{
   constructor(type) {
      this.type = type;
  }

   draw() {
      console.log(`Type: ${this.type} Color: ${this.color}`);
   }
}

class Eraser extends Pen {
   constructor() {
      super('Eraser');
   }

   draw(ctx, color, size, lastX, lastY) {
      
      ctx.globalCompositeOperation="destination-out";
      ctx.strokeStyle = color;
      ctx.lineWidth = size;
      ctx.lineCap = 'round';
      
      ctx.arc(lastX, lastY, size, 0, Math.PI*2, false);
      ctx.fill();

      ctx.globalCompositeOperation="source-over";
   }
}

class Pen1 extends Pen {
   constructor() {
      super('Pen1');
   }

   draw(ctx, color, size, lastX, lastY, x, y) {
      ctx.globalCompositeOperation="source-over";

      ctx.strokeStyle = color;
      ctx.lineWidth = size;
      ctx.lineCap = 'round';
      
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(x, y);
      ctx.stroke();
   }
}

class Pen2 extends Pen {
   constructor() {
      super('Pen1');
   }

   draw(ctx, color, size, lastX, lastY, x, y) {
      ctx.globalCompositeOperation="source-over";

      ctx.strokeStyle = color;
      ctx.lineWidth = size;
      ctx.lineCap = 'round';
      
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(x, y);
      ctx.stroke();

      ctx.moveTo(lastX+10, lastY+10);
      ctx.lineTo(x+10, y+10);
      ctx.stroke();
   }
}

export default class CanvasObj{
   constructor(canvasElement){
      this.canvas = canvasElement
      this.ctx = this.canvas.getContext('2d', {willReadFrequently:true});

      this.canvasWidth = 600;
      this.canvasHeight = 600;

      this.color = '#000000';
      this.size = 10;

      this.pens = {
         'eraser': new Eraser(), 
         'pen1': new Pen1(),
         'pen2': new Pen2(),
      };

      this.currentPen = this.pens['pen1'];
   }

   setCanvasSize(canvasWidth, canvasHeight){
      this.canvasWidth = canvasWidth;
      this.canvasHeight = canvasHeight;
   }

   setPenSettings(penType, color, size){
      this.currentPen = this.pens[penType];
      this.color = color;
      this.size = size;
   }

   saveImageData(){
      return this.canvas.toDataURL();
   }

   putImageData(imgData){
      let img = new Image();
      img.onload = () => {
         this.clearCanvas();
         this.ctx.drawImage(img, 0, 0, this.canvasWidth, this.canvasHeight)
      };
      img.src = imgData;
   }

   usePen(lastX, lastY, x, y){
      this.ctx.beginPath();
      
      this.currentPen.draw(this.ctx, this.color, this.size, lastX, lastY, x, y);
      
      this.ctx.save();
      this.ctx.closePath();
   }

   clearCanvas(){
      this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
   }
}
