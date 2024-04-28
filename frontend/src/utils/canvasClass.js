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
      ctx.beginPath();
      
      ctx.globalCompositeOperation="destination-out";
      ctx.strokeStyle = color;
      ctx.lineWidth = size;
      ctx.lineCap = 'round';
      
      ctx.arc(lastX, lastY, size, 0, Math.PI*2, false);
      ctx.fill();

      ctx.globalCompositeOperation="source-over";
      ctx.save();
      ctx.closePath();
   }
}

class Pen1 extends Pen {
   constructor() {
      super('Pen1');
   }

   draw(ctx, color, size, lastX, lastY, x, y) {
      ctx.beginPath();
      ctx.globalCompositeOperation="source-over";

      ctx.strokeStyle = color;
      ctx.lineWidth = size;
      ctx.lineCap = 'round';
      
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.save();
      ctx.closePath();
   }
}

class Pen2 extends Pen {
   constructor() {
      super('Pen1');
   }

   draw(ctx, color, size, lastX, lastY, x, y) {
      ctx.beginPath();
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

      ctx.save();
      ctx.closePath();
   }
}

export default class CanvasObj{
   constructor(canvasElement){
      this.canvas = canvasElement
      this.ctx = this.canvas.getContext('2d', {willReadFrequently:true});

      this.color = '#000000';
      this.size = 10;

      this.pens = {
         'eraser': new Eraser(), 
         'pen1': new Pen1(),
         'pen2': new Pen2(),
      };

      this.currentPen = this.pens['pen1'];
   }

   setPenSettings(penType, color, size){
      this.currentPen = this.pens[penType];
      this.color = color;
      this.size = size;
   }

   saveImageData(){
      // return this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height)
      return this.canvas.toDataURL();
   }

   putImageData(imgData, casveWidth, casveHeight){
      let img = new Image();
      img.onload = () => {
         this.clearCasve(casveWidth, casveHeight);
         this.ctx.drawImage(img, 0, 0, casveWidth, casveHeight)
      };
      img.src = imgData;
   }

   usePen(lastX, lastY, x, y){
      this.currentPen.draw(this.ctx, this.color, this.size, lastX, lastY, x, y);
   }

   clearCasve(casveWidth, casveHeight){
      this.ctx.clearRect(0, 0, casveWidth, casveHeight);
   }
}