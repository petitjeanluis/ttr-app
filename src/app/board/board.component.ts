import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { BOARD_WIDTH, BOARD_HEIGHT, SCALE } from '../definitions/constants'
import { BOARD_EVENT } from '../definitions/events';
import { GameEngineService } from '../game-engine.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements  AfterViewInit{

	x: number
    y: number
    degrees: number
    topLeftX: number
    topLeftY: number
    topRightX: number
    topRightY: number
    bottomRightX: number
    bottomRightY: number
    bottomLeftX: number
    bottomLeftY: number

	rectangles = []
	index = 0

	@ViewChild('board')
	canvas: ElementRef<HTMLCanvasElement>;
	ctx: CanvasRenderingContext2D;

	constructor(private gameEngine: GameEngineService) {

	}

	ngAfterViewInit(): void {
		this.ctx = this.canvas.nativeElement.getContext('2d')
		this.gameEngine.registerBoard().subscribe(this.boardEvent)
		this.drawBoard()
	}

	mouseClick(event: MouseEvent) {
		this.gameEngine.findIntersection(event.offsetX,event.offsetY)
	}

	drawBoard() {
		this.ctx.canvas.width = BOARD_WIDTH*SCALE
		this.ctx.canvas.height = BOARD_HEIGHT*SCALE

		// clear
		this.ctx.fillStyle = 'white'
		this.ctx.fillRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height)

		// add border
		this.ctx.strokeStyle = 'black'
		this.ctx.lineWidth = 2*SCALE
		this.ctx.strokeRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height)

		// draw cities
		this.gameEngine.cities.forEach(
			city => city.draw(this.ctx)
		)

		// draw paths
		this.gameEngine.paths.forEach(
			path => path.draw(this.ctx)
		)
	}

	boardEvent (event: BOARD_EVENT, data?: any){
		switch (event) {
			case BOARD_EVENT.DRAW_BOARD:
				this.drawBoard()
				break;
			case BOARD_EVENT.DRAW_PIECE:
				alert('Redraw Piece')
				break;
		}
	}
}
