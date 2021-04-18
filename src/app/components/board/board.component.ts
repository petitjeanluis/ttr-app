import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import {BOARD_WIDTH_S, BOARD_HEIGHT_S, LINE_WIDTH} from '../../resources/constants'
import { BOARD_EVENT } from '../../resources/events';
import { GameEngineService } from '../../services/game-engine.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements  AfterViewInit{

	@ViewChild('board')
	canvas: ElementRef<HTMLCanvasElement>;
	ctx: CanvasRenderingContext2D;

	constructor(private gameEngine: GameEngineService) {
	}

	ngAfterViewInit(): void {
		this.ctx = this.canvas.nativeElement.getContext('2d')
        this.ctx.canvas.width = BOARD_WIDTH_S
        this.ctx.canvas.height = BOARD_HEIGHT_S
		this.gameEngine.registerBoardComponent(this)
		this.drawBoard()
	}

	mouseClick(event: MouseEvent) {
		this.gameEngine.mouseClick(event)
	}

	drawBoard() {
        this.drawFrame()
        this.drawCities()
        this.drawPaths()
	}

	drawFrame() {
        this.ctx.fillStyle = 'white'
        this.ctx.fillRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height)

        this.ctx.strokeStyle = 'black'
        this.ctx.lineWidth = LINE_WIDTH
        this.ctx.strokeRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height)
      }

    drawCities() {
        this.gameEngine.cities.forEach(
          city => city.draw(this.ctx)
        )
    }

    public drawPaths() {
	    console.log("drawing")
        this.gameEngine.paths.forEach(
          path => path.draw(this.ctx)
        )
    }
}
