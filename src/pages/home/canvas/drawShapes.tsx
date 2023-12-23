
export function drawRectangle(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, color: string = 'black', lineWidth: number = 0): void {
    context.fillStyle = color;
    context.strokeStyle = color;
    context.lineWidth = lineWidth;
    
    if (lineWidth > 0) {
        context.strokeRect(x, y, width, height);
    }else {
        context.fillRect(x, y, width, height);
    }
};

export function drawCircle(context: CanvasRenderingContext2D, x: number, y: number, radius: number, color: string = 'black', lineWidth: number = 2): void {
    context.fillStyle = color;
    context.strokeStyle = color;
    context.lineWidth = lineWidth;
  
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI);
    context.fill();
  
    if (lineWidth > 0) {
      context.stroke();
    };
};

export function drawEllipse(context: CanvasRenderingContext2D, x: number, y: number, radiusX: number, radiusY: number, rotation: number = 0, startAngle: number = 0, endAngle: number = 2 * Math.PI, color: string = 'black', lineWidth: number = 2): void {
    context.fillStyle = color;
    context.strokeStyle = color;
    context.lineWidth = lineWidth;
  
    context.beginPath();
    context.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle);
    context.fill();
  
    if (lineWidth > 0) {
      context.stroke();
    }
};

export function drawPolygon(context: CanvasRenderingContext2D, vertices: { x: number; y: number }[], color: string = 'black', lineWidth: number = 2): void {
    if (vertices.length < 3) {
      throw new Error('A polygon must have at least 3 vertices.');
    }
  
    context.fillStyle = color;
    context.strokeStyle = color;
    context.lineWidth = lineWidth;
  
    context.beginPath();
    context.moveTo(vertices[0].x, vertices[0].y);
  
    for (let i = 1; i < vertices.length; i++) {
      context.lineTo(vertices[i].x, vertices[i].y);
    }
  
    context.closePath();
    context.fill();
  
    if (lineWidth > 0) {
      context.stroke();
    }
}

export function drawLine(context: CanvasRenderingContext2D, startX: number, startY: number, endX: number, endY: number, color: string = 'white', lineWidth: number = 2): void {

    context.strokeStyle = color;
    context.lineWidth = lineWidth;

    context.beginPath();
    context.moveTo(startX, startY);
    context.lineTo(endX, endY);
    context.stroke();
};

export function drawText(context: CanvasRenderingContext2D, text: string, x: number, y: number, fontSize: number = 12, fontFamily: string = 'Arial', color: string = 'black', textAlign: CanvasTextAlign = 'left', textBaseline: CanvasTextBaseline = 'top'): void {
    context.font = `${fontSize}px ${fontFamily}`;
    context.fillStyle = color;
    context.textAlign = textAlign;
    context.textBaseline = textBaseline;
  
    context.fillText(text, x, y);
}