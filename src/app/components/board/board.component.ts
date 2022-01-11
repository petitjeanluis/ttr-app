import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core'
import { GameEngineService } from '../../services/game-engine.service'
import {City} from '../../entities/city'
import {Path} from '../../entities/path'
import {Point} from '../../models/point'
import {BOARD_COLOR, BOARD_HEIGHT, BOARD_WIDTH, CITIES, PATHS, PATH_PIECE_WIDTH} from '../../resources/board-constants'
import {PathID} from '../../models/types';
import { StateUpdate } from 'src/app/state/state-update'
import { PlayerColor } from 'src/app/models/player-color'
import { ModalComponent } from '../modal/modal.component'
import { TrainColor } from 'src/app/models/train-color'
import { COLOR_MAP } from 'src/app/resources/constants'
import { Subject, throttleTime } from 'rxjs'

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements  AfterViewInit {

	@ViewChild('board')
	canvas: ElementRef<HTMLCanvasElement>;

    @ViewChild('trainCardModal')
    trainCardModal: ModalComponent
    
	ctx: CanvasRenderingContext2D;

    private cities: City[] = []
    private paths: Map<PathID, Path> = new Map<PathID, Path>()
    private trainCards: TrainColor[] = []
    private trainCardCountMap: any = {}
    private currentPath: Path
    private active: boolean = false

    trainCardEntries: any[] = []

    mouseClickSubject: Subject<MouseEvent> = new Subject<MouseEvent>()

	constructor(private gameEngine: GameEngineService) {
        this.mouseClickSubject.pipe(throttleTime(500)).subscribe(this.mouseClick.bind(this))
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
        this.active = stateUpdate.activePlayerId === stateUpdate.player.id

        const playerIdToColor = {}
        stateUpdate.opponents.forEach(opponet => {
            playerIdToColor[opponet.id] = opponet.color
        });
        playerIdToColor[stateUpdate.player.id] = stateUpdate.player.color

        const pathColorMap: Map<PathID, PlayerColor> = new Map<PathID, PlayerColor>()
        for(const [pathId, playerId] of Object.entries(stateUpdate.pathOwnership)) {
            pathColorMap.set(parseInt(pathId), playerIdToColor[playerId])
        }

        this.trainCards = stateUpdate.player.trainCards

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

    mouseClick(event: MouseEvent): void {
        if (!this.active) return

        for (const path of this.paths.values()) {
            if (path.isTouched(new Point(event.offsetX, event.offsetY)) 
            && !path.hasPlayerColor() && this.trainCards.length > 0) {
                this.currentPath = path

                this.buildTrainCardEntries()

                if (Object.keys(this.trainCardCountMap).length == 0 ) {
                    alert(" You don't have any cards to build this color!")
                    return
                }

                let totalCards = 0
                for (const entry of Object.entries(this.trainCardCountMap)) {
                    totalCards += entry[1]['count']
                }
                if (totalCards < path.getLength()) {
                    alert(" You don't have enough cards to build with!")
                    return
                }
                
                this.trainCardModal.openModal()
                
                return
            }
        }
	}

    private buildTrainCardEntries() {
        this.trainCardCountMap = {}

        if (this.currentPath.trainColor == TrainColor.WILD) {
            for (const trainCard of this.trainCards) {
                if (trainCard in this.trainCardCountMap) {
                    this.trainCardCountMap[trainCard].count = this.trainCardCountMap[trainCard].count + 1
                }
                else {
                    this.trainCardCountMap[trainCard] = {count: 1, selected: 0}
                }
            }
        }
        else {
            for (const trainCard of this.trainCards) {
                if (trainCard == TrainColor.WILD || trainCard == this.currentPath.trainColor) {
                    if (trainCard in this.trainCardCountMap) {
                        this.trainCardCountMap[trainCard].count = this.trainCardCountMap[trainCard].count + 1
                    }
                    else {
                        this.trainCardCountMap[trainCard] = {count: 1, selected: 0}
                    }
                }
            }
        }

        this.trainCardEntries = Object.entries(this.trainCardCountMap)
    }

    getColor(trainColor: TrainColor) {    
        return COLOR_MAP[trainColor]
    }

    trainCardSelected(trainColor: TrainColor) {
        if (trainColor in this.trainCardCountMap) {
            if (this.trainCardCountMap[trainColor].count > 0) {
                this.trainCardCountMap[trainColor].count--
                this.trainCardCountMap[trainColor].selected++
            }
        }
    }

    build() {
        const selectedCards = []

        let typesSelected = []

        for (const entry of Object.entries(this.trainCardCountMap)) {
            if (entry[1]['selected'] > 0) {
                typesSelected.push(entry[0])
            }
            for(let i = 0; i < entry[1]['selected']; i++) {
                selectedCards.push(entry[0])
            }
        }

        if (typesSelected.length > 2 || ( typesSelected.length == 2 && typesSelected[0] != TrainColor.WILD && typesSelected[1] != TrainColor.WILD)) {
            alert("The given combination is invalid!")
            this.trainCardModal.closeModal()
            return
        }

        this.buildTrainCardEntries()

        this.gameEngine.build(this.currentPath.id, selectedCards)

        this.trainCardModal.closeModal()
        
    }
}
