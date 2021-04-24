import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import {BOARD_WIDTH, BOARD_HEIGHT, LINE_WIDTH, CITIES, PATHS, BOARD_COLOR} from '../../resources/constants'
import { GameEngineService } from '../../services/game-engine.service';
import {City} from "../../view-elements/city";
import {Path} from "../../view-elements/path";
import {PathPiece} from "../../view-elements/path-piece";
import {Point} from "../../models/point";

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
                this.cities.push(new City(city['x'],city['y'],city['labelX'],city['labelY'],city['name']))
            }
        )
        PATHS.forEach(
            path => {
                let pathPieces: PathPiece[] = []
                path['paths'].forEach(pathPiece => {
                    pathPieces.push(new PathPiece(pathPiece['x'], pathPiece['y'], pathPiece['degrees']))
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
        this.ctx.lineWidth = LINE_WIDTH
        this.ctx.strokeRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height)

        this.cities.forEach(
            city => city.draw(this.ctx)
        )

        this.paths.forEach(
            path => path.draw(this.ctx)
        )
	}
}
