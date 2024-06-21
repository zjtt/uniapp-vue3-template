import { Shape } from "../shape";

export class tmTextColor extends Shape {
	textHeight: number = 0
	private drawText(text: string | [{ text: string, color?: string, fontSize?: number }], x: number, y: number, maxWidth: number, lineHeight: number) {
		if (typeof x != 'number' || typeof y != 'number') {
			return;
		}

		var context = this.canvas.ctx;

		// 字符分隔为数组
		var arrText: {
			text: string,
			color: string,
			fontSize: number
		}[] = []

		if (typeof text == 'string') {
			arrText = text.split('').map(el => {
				return {
					text: el,
					color: this.fillStyle,
					fontSize: this.fontSize
				}
			})
		} else if (typeof text == 'object' && Array.isArray(text)) {
			text.forEach(el => {
				const ps = el.text.split("").map(ele => {
					return {
						text: ele,
						color: el?.color ?? this.fillStyle,
						fontSize: el?.fontSize ?? this.fontSize
					}
				})
				arrText.push(...ps)
			})
		}

		let fontSizeList = arrText.map(el => el.fontSize)
		const maxFontsize = Math.max(...fontSizeList)
		var line = '';
		const _x = x;
		let _x_t = _x
		let lines = 1;
		for (var n = 0; n < arrText.length; n++) {
			var testLine = line + arrText[n].text;
			var metrics = context?.measureText(arrText[n].text) ?? 14;
			var testWidth = metrics.width;
			_x_t += (n > 0 ? testWidth + 1 : 0)
			if (context?.setFillStyle) {
				context.setFillStyle(arrText[n].color)
				context.setFontSize(arrText[n].fontSize)
			} else {
				context.fillStyle = arrText[n].color;
				context.font = arrText[n].fontSize + "px PingFang"
			}
			context?.fillText(arrText[n].text, _x_t, y + maxFontsize);

		}
		this.textHeight = lines * lineHeight
	}
	draw(): this {
		if (!this.canvas.ctx) return this;
		let ctx = this.canvas.ctx;
		const x = this.x;
		const y = this.y;
		const width = this.width;
		const height = this.height;
		const fillStyle = this.fillStyle;
		const strokeStyle = this.strokeStyle;
		const lineWidth = this.lineWidth

		const maxWidth = this.textMaxWidth || this.canvas.opts.width
		const text = this.text
		const letterSpace = this.letterSpace;
		const fontSize = this.fontSize;
		const lineHeight = fontSize * 1.5

		ctx.beginPath();

		if (ctx.setFillStyle) {
			ctx.setFillStyle(fillStyle)
			ctx.setLineWidth(lineWidth)
			ctx.setStrokeStyle(strokeStyle)
			ctx.setLineJoin(this.lineJoin)
			ctx.setLineDash(this.lineDash, this.lineDashOffset)
			ctx.setTextBaseline('bottom')
			ctx.setFontSize(fontSize)
			ctx.setTextAlign(this.textAlign)
		} else {
			ctx.fillStyle = fillStyle;
			ctx.lineWidth = lineWidth;
			ctx.strokeStyle = strokeStyle;
			ctx.lineJoin = this.lineJoin
			ctx.setLineDash(this.lineDash, this.lineDashOffset)
			ctx.textBaseline = 'bottom'
			ctx.font = fontSize + "px sans-serif"
			ctx.textAlign = this.textAlign
		}

		this.drawText(text, x, y, maxWidth, lineHeight)
		ctx.fill()
		ctx.stroke()

		return this
	}
}