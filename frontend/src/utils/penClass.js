class Pen{
   constructor(type) {
      this.type = type;
      this.comment = '筆';
      this.brushAlpha = 1;
  }

   draw() {
      console.log(`Type: ${this.type} Color: ${this.color}`);
   }

   getDistanceBetweenPoints(lastX, lastY, targetX, targetY){
      let distanceX = targetX - lastX;
      let distanceY = targetY - lastY;
      let distance = Math.hypot(distanceX, distanceY);
      
      return distance
   }
   
   getAngleBetweenPoints(lastX, lastY, targetX, targetY){
      let distanceX = targetX - lastX;
      let distanceY = targetY - lastY;

      return Math.atan2(distanceX, distanceY);
   }

   changeColor(color){
      let r = parseInt(color.slice(1, 3), 16);
      let g = parseInt(color.slice(3, 5), 16);
      let b = parseInt(color.slice(5, 7), 16);
      
      let imgCanvas = document.createElement('canvas');
      imgCanvas.width = this.brushImage.width;
      imgCanvas.height = this.brushImage.height;

      let imgCtx = imgCanvas.getContext('2d');
      imgCtx.clearRect(0, 0, imgCanvas.width, imgCanvas.height);
      imgCtx.drawImage(this.brushImage, 0, 0);

      let imgData = imgCtx.getImageData(0, 0, imgCanvas.width, imgCanvas.height);
      for(let i=0; i<imgData.data.length; i+=4){
        imgData.data[i] = r;
        imgData.data[i+1] = g;
        imgData.data[i+2] = b;
        imgData.data[i+3] = imgData.data[i+3] * this.brushAlpha;
      }
      imgCtx.putImageData(imgData,0,0);
      
      return imgCanvas;
   } 
}

export class Eraser extends Pen {
   constructor() {
      super('eraser');
      this.brushImage = new Image();
      this.brushImage.src = require('@/assets/images/brushImage/eraser.png');
      this.comment = '橡皮擦';
   }

   draw(ctx, color, penSize, lastX, lastY, targetX, targetY) {
      let distanceBetweenPoints = this.getDistanceBetweenPoints(lastX, lastY, targetX, targetY);
      let angleBetweenPoints = this.getAngleBetweenPoints(lastX, lastY, targetX, targetY);
      let x = 0;
      let y = 0;

      this.changeColor('#ffffff');
      ctx.globalAlpha = this.brushAlpha * 255;

      for (let distnum=0; distnum<distanceBetweenPoints; distnum++) {
         x = lastX + (Math.sin(angleBetweenPoints) * distnum);
         y = lastY + (Math.cos(angleBetweenPoints) * distnum);

         ctx.globalCompositeOperation="xor";
         ctx.drawImage(this.brushImage, x, y, penSize, penSize);
         ctx.globalCompositeOperation="source-over";
         ctx.drawImage(this.brushImage, x, y, penSize, penSize);
      }
   }

   drawOrd(ctx, color, penSize, lastX, lastY) {
      ctx.globalCompositeOperation="destination-out";
      ctx.strokeStyle = color;
      ctx.lineWidth = penSize;
      ctx.lineCap = 'round';
      
      ctx.arc(lastX, lastY, penSize, 0, Math.PI*2, false);
      ctx.fill();

      ctx.globalCompositeOperation="source-over";
   }
}

export class GeneralPen extends Pen {
   constructor() {
      super('generalPen');
      this.brushImage = new Image();
      this.brushImage.src = require('@/assets/images/brushImage/InkPen_brush_01.png');
      this.comment = '一般筆';
      this.brushAlpha = 1;
   }

   draw(ctx, color, penSize, lastX, lastY, targetX, targetY) {
      let distanceBetweenPoints = this.getDistanceBetweenPoints(lastX, lastY, targetX, targetY);
      let angleBetweenPoints = this.getAngleBetweenPoints(lastX, lastY, targetX, targetY);
      let x = 0;
      let y = 0;

      let drawBrushImage = this.changeColor(color);
      ctx.globalAlpha = this.brushAlpha * 255;

      ctx.globalCompositeOperation="source-over";

      for (let distnum=0; distnum<distanceBetweenPoints; distnum++) {
         x = lastX + (Math.sin(angleBetweenPoints) * distnum);
         y = lastY + (Math.cos(angleBetweenPoints) * distnum);
         ctx.drawImage(drawBrushImage, x, y, penSize, penSize);
      }
   }
}

export class Pencil extends Pen {
   constructor() {
      super('pencil');
      this.brushImage = new Image();
      this.brushImage.src = require('@/assets/images/brushImage/SoftPencil_brush_04.png');
      this.comment = '鉛筆';
      this.brushAlpha = 0.2;
   }

   draw(ctx, color, penSize, lastX, lastY, targetX, targetY) {
      let distanceBetweenPoints = this.getDistanceBetweenPoints(lastX, lastY, targetX, targetY);
      let angleBetweenPoints = this.getAngleBetweenPoints(lastX, lastY, targetX, targetY);
      let x = 0;
      let y = 0;

      let drawBrushImage = this.changeColor(color);
      ctx.globalAlpha = this.brushAlpha * 255;

      ctx.globalCompositeOperation="source-over";

      for (let distnum=0; distnum<distanceBetweenPoints; distnum++) {
         x = lastX + (Math.sin(angleBetweenPoints) * distnum);
         y = lastY + (Math.cos(angleBetweenPoints) * distnum);
         ctx.drawImage(drawBrushImage, x, y, penSize, penSize);
      }
   }
}

export class MarkerPen extends Pen {
   constructor() {
      super('MarkerPen');
      this.brushImage = new Image();
      this.brushImage.src = require('@/assets/images/brushImage/FeltPen_brush_45_c.png');
      this.comment = '麥克筆';
      this.brushAlpha = 0.03;
   }

   draw(ctx, color, penSize, lastX, lastY, targetX, targetY) {
      let distanceBetweenPoints = this.getDistanceBetweenPoints(lastX, lastY, targetX, targetY);
      let angleBetweenPoints = this.getAngleBetweenPoints(lastX, lastY, targetX, targetY);
      let x = 0;
      let y = 0;

      let drawBrushImage = this.changeColor(color);
      ctx.globalAlpha = this.brushAlpha * 255;

      ctx.globalCompositeOperation="source-over";

      for (let distnum=0; distnum<distanceBetweenPoints; distnum++) {
         x = lastX + (Math.sin(angleBetweenPoints) * distnum);
         y = lastY + (Math.cos(angleBetweenPoints) * distnum);
         ctx.drawImage(drawBrushImage, x, y, penSize, penSize);
      }
   }
}

export class Airbrush extends Pen {
   constructor() {
      super('Airbrush');
      this.brushImage = new Image();
      this.brushImage.src = require('@/assets/images/brushImage/Pastel_brush_05-1.png');
      this.comment = '噴槍';
      this.brushAlpha = 0.4;
   }

   draw(ctx, color, penSize, lastX, lastY, targetX, targetY) {
      let distanceBetweenPoints = this.getDistanceBetweenPoints(lastX, lastY, targetX, targetY);
      let angleBetweenPoints = this.getAngleBetweenPoints(lastX, lastY, targetX, targetY);
      let x = 0;
      let y = 0;

      let drawBrushImage = this.changeColor(color);
      ctx.globalAlpha = this.brushAlpha * 255;

      ctx.globalCompositeOperation="source-over";

      for (let distnum=0; distnum<distanceBetweenPoints; distnum++) {
         x = lastX + (Math.sin(angleBetweenPoints) * distnum);
         y = lastY + (Math.cos(angleBetweenPoints) * distnum);
         ctx.drawImage(drawBrushImage, x, y, penSize, penSize);
      }
   }

   draw_ord(ctx, color, penSize, lastX, lastY, targetX, targetY) {
      let distanceBetweenPoints = this.getDistanceBetweenPoints(lastX, lastY, targetX, targetY);
      let angleBetweenPoints = this.getAngleBetweenPoints(lastX, lastY, targetX, targetY);
      let x = 0;
      let y = 0;

      let drawBrushImage = this.changeColor(color);
      ctx.globalAlpha = this.brushAlpha * 255;

      ctx.globalCompositeOperation="source-over";

      for (let distnum=0; distnum<distanceBetweenPoints; distnum++) {
         x = lastX + (Math.sin(angleBetweenPoints) * distnum);
         y = lastY + (Math.cos(angleBetweenPoints) * distnum);
         ctx.drawImage(drawBrushImage, x, y, penSize, penSize);
      }
   }
}

export class Crayon extends Pen {
   constructor() {
      super('Crayon');
      this.brushImage = new Image();
      this.brushImage.src = require('@/assets/images/brushImage/Creyon_brush_18_gb15.png');
      this.comment = '蠟筆';
      this.brushAlpha = 0.4;
      this.backgroundImage = new Image();
      this.backgroundImage.src = require('@/assets/images/brushImage/crayon-texture1.png');
   }

   setCrayonPen(drawBrushImage, canvasWidth, canvasHeight){
      let crayonCanvas = document.createElement('canvas');
      crayonCanvas.width = canvasWidth;
      crayonCanvas.height = canvasHeight;

      let crayonCtx = crayonCanvas.getContext('2d');
      
      crayonCtx.globalCompositeOperation = 'source-over';
      crayonCtx.clearRect(0, 0, canvasWidth, canvasHeight);

      crayonCtx.drawImage(this.backgroundImage, 0, 0, canvasWidth, canvasHeight);
      crayonCtx.globalCompositeOperation = 'source-in';
      crayonCtx.drawImage(drawBrushImage, 0, 0, drawBrushImage.width, drawBrushImage.height);

      return crayonCanvas
   } 

   draw(ctx, canvasWidth, canvasHeight, color, penSize, targetX, targetY) {
      let drawBrushImage = this.changeColor(color);
      ctx.globalAlpha = this.brushAlpha * 255;

      ctx.globalCompositeOperation="source-over";
      drawBrushImage = this.setCrayonPen(drawBrushImage, canvasWidth, canvasHeight);

      ctx.drawImage(drawBrushImage, targetX, targetY, penSize*10, penSize*10);

   }
}