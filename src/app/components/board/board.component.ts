import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import {BOARD_WIDTH, BOARD_HEIGHT, LINE_WIDTH} from '../../resources/constants'
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
        this.ctx.canvas.width = BOARD_WIDTH
        this.ctx.canvas.height = BOARD_HEIGHT
		this.gameEngine.registerBoardComponent(this)
		this.drawComponent()
	}

	mouseClick(event: MouseEvent) {
		this.gameEngine.boardClick(event)
	}

	drawComponent() {
        this.drawFrame()
        this.drawCities()
        this.drawPaths()
	}

	private drawFrame() {
        this.ctx.fillStyle = "#FFE2B3"
        this.ctx.fillRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height)

        this.ctx.strokeStyle = 'black'
        this.ctx.lineWidth = LINE_WIDTH
        this.ctx.strokeRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height)
      }

    private drawCities() {
        this.gameEngine.cities.forEach(
          city => city.draw(this.ctx)
        )
    }

    private drawPaths() {
        this.gameEngine.paths.forEach(
          path => path.draw(this.ctx)
        )
    }
}
