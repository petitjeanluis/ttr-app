import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core'
import { GameEngineService } from '../../services/game-engine.service'
import {City} from '../../entities/city'
import {Path} from '../../entities/path'
import {Point} from '../../models/point'
import {BOARD_COLOR, BOARD_HEIGHT, BOARD_WIDTH, CITIES, PATHS, PATH_PIECE_WIDTH} from '../../resources/board-constants'
import {PathID} from '../../models/types';
import { StateUpdate } from 'src/app/state/state-update'
import { PlayerColor } from 'src/app/models/player-color'

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
    private paths: Map<PathID, Path> = new Map<PathID, Path>()

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
                this.paths.set(path.id, new Path(path, this.ctx))
            }
        )

        this.gameEngine.registerStateUpdateHandler(this.stateUpdateHandler.bind(this))
    }

    stateUpdateHandler(stateUpdate: StateUpdate): void {
        const playerIdToColor = {}
        stateUpdate.opponents.forEach(opponet => {
            playerIdToColor[opponet.id] = opponet.color
        });
        playerIdToColor[stateUpdate.player.id] = stateUpdate.player.color

        const pathColorMap: Map<PathID, PlayerColor> = new Map<PathID, PlayerColor>()
        for(const [pathId, playerId] of Object.entries(stateUpdate.pathOwnership)) {
            pathColorMap.set(parseInt(pathId), playerIdToColor[playerId])
        }

        this.drawComponent(pathColorMap)
    }

    drawComponent(pathColorMap: Map<PathID, PlayerColor>): void {
        for (let [pathId, playerColor] of pathColorMap.entries()) {
            this.paths.get(pathId).setPlayerColor(playerColor)
        }

        this.ctx.fillStyle = BOARD_COLOR
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)

        this.cities.forEach(
            city => city.draw()
        )

        this.paths.forEach(
            path => path.draw()
        )
	}

    private updatePaths(pathOwnership: Map<PathID, PlayerColor>) {
        const playerColorMap = {}

        // pathOwnership.forEach((value, key) => {
        //     this.paths.get(key).setColor(value)
        // })
    }

    mouseClick(event: MouseEvent): void {
        
        for (const path of this.paths.values()) {
            if (path.isTouched(new Point(event.offsetX, event.offsetY))) {
                console.log("touched path " + path);
                path.setPlayerColor(PlayerColor.BLACK)
                this.drawComponent(new Map<number, PlayerColor>())
                return
            }
        }
	}
}
