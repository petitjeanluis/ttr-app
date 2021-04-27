import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {OpponentCardPool} from "../../entities/opponent-card-pool";
import {Player} from "../../models/player";
import {PlayerColor} from "../../models/player-color";
import {SIDE_PANEL_BACKGROUND_COLOR, SIDE_PANEL_HEIGHT, SIDE_PANEL_WIDTH} from "../../resources/constants";
import {TrainCard} from "../../entities/train-card";

@Component({
  selector: 'app-player-info',
  templateUrl: './player-info.component.html',
  styleUrls: ['./player-info.component.css']
})
export class PlayerInfoComponent implements AfterViewInit {

    @ViewChild('playerInfo')
    canvas: ElementRef<HTMLCanvasElement>;
    ctx: CanvasRenderingContext2D;

    private opponentCardPool: OpponentCardPool

    constructor() {
        let player1: Player = {
            id: 1,
            name: "Luis",
            color: PlayerColor.GREEN,
            trainsCards: [],
            destinationCards: [],
            availableTrains: 10,
            score: 50
        }
        let player2: Player = {
            id: 1,
            name: "Gabby",
            color: PlayerColor.BLUE,
            trainsCards: [],
            destinationCards: [],
            availableTrains: 10,
            score: 40
        }
        let player3: Player = {
            id: 1,
            name: "Boots",
            color: PlayerColor.RED,
            trainsCards: [],
            destinationCards: [],
            availableTrains: 10,
            score: 60
        }
        this.opponentCardPool = new OpponentCardPool([player1,player2,player3])
    }

    ngAfterViewInit(): void {
        this.ctx = this.canvas.nativeElement.getContext('2d')
        this.ctx.canvas.width = SIDE_PANEL_WIDTH
        this.ctx.canvas.height = SIDE_PANEL_HEIGHT

        this.drawComponent()
    }

    drawComponent() {
        this.ctx.fillStyle = SIDE_PANEL_BACKGROUND_COLOR
        this.ctx.fillRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height)

        this.opponentCardPool.draw(this.ctx)
    }

    mouseClick(event: MouseEvent) {

    }

}
