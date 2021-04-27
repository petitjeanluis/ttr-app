import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { GameEngineService } from '../../services/game-engine.service';
import {City} from "../../entities/city";
import {Path} from "../../entities/path";
import {PathPiece} from "../../entities/path-piece";
import {Point} from "../../models/point";
import {BOARD_COLOR, BOARD_HEIGHT, BOARD_LINE_WIDTH, BOARD_WIDTH, CITIES, PATHS} from "../../resources/board-constants";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements  AfterViewInit {

	@ViewChild('board')
	canvas: ElementRef<HTMLCanvasElement>;
	ctx: CanvasRenderingContext2D;

    private cities: City[] = []
    private paths: Path[] = []

	constructor(private gameEngine: GameEngineService) {
	}

	ngAfterViewInit(): void {
		this.ctx = this.canvas.nativeElement.getContext('2d')
        this.ctx.canvas.width = BOARD_WIDTH
        this.ctx.canvas.height = BOARD_HEIGHT
        CITIES.forEach(
            city => {
                this.cities.push(new City(new Point(city['x'],city['y']),city['labelX'],city['labelY'],city['name']))
            }
        )
        PATHS.forEach(
            path => {
                let pathPieces: PathPiece[] = []
                path['paths'].forEach(pathPiece => {
                    pathPieces.push(new PathPiece(new Point(pathPiece['x'], pathPiece['y']), pathPiece['degrees']))
                });
                this.paths.push(new Path(path['id'],path['cityOneId'],path['cityTwoId'],pathPieces))
            }
        )
        this.gameEngine.registerBoardComponent(this)
		this.drawComponent()
	}

	mouseClick(event: MouseEvent) {
        for (let i = 0; i < this.paths.length; i++ ){
            if (this.paths[i].isTouched(new Point(event.offsetX,event.offsetY))) {
                if (this.gameEngine.canTakePath(0)) { // TODO: Add path id
                    this.paths[i].setColor("green") // TODO: Add player color
                    this.drawComponent()
                }
            }
        }
	}

	private drawComponent() {
        this.ctx.fillStyle = BOARD_COLOR
        this.ctx.fillRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height)

        this.ctx.strokeStyle = 'black'
        this.ctx.lineWidth = BOARD_LINE_WIDTH
        this.ctx.strokeRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height)

        this.cities.forEach(
            city => city.draw(this.ctx)
        )

        this.paths.forEach(
            path => path.draw(this.ctx)
        )
	}
}
