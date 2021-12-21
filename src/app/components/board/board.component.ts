import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core'
import { GameEngineService } from '../../services/game-engine.service'
import {City} from '../../entities/city'
import {Path} from '../../entities/path'
import {Point} from '../../models/point'
import {BOARD_COLOR, BOARD_HEIGHT, BOARD_WIDTH, CITIES, PATHS} from '../../resources/board-constants'
import {TrainColor} from '../../models/train-color';
import {PathID, PlayerID} from '../../models/types';

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
                this.cities.push(new City(new Point(city.x, city.y), city.labelX, city.labelY, city.name, this.ctx))
            }
        )
        PATHS.forEach(
            path => {
                this.paths.push(new Path(path, this.ctx))
            }
        )

        this.gameEngine.registerBoardComponent(this)
    }

    updatePaths(pathMap: Map<PathID, PlayerID>) {

    }

	mouseClick(event: MouseEvent): void {
        for (const path of this.paths) {
            if (path.isTouched(new Point(event.offsetX, event.offsetY))) {
                if (this.gameEngine.canTakePath(0)) { // TODO: Add path id
                    path.setOwner(TrainColor.GREEN) // TODO: Add player color
                    this.drawComponent()
                }
            }
        }
	}

    drawComponent(): void {
        this.ctx.fillStyle = BOARD_COLOR
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)

        this.cities.forEach(
            city => city.draw()
        )

        this.paths.forEach(
            path => path.draw()
        )
	}
}
