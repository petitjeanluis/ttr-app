import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {GameEngineService} from "../../services/game-engine.service";
import {
    BOARD_HEIGHT_S,
    BOARD_WIDTH_S,
    DESITNATION_CARD_COLOR,
    DESITNATION_CARD_FONT,
    DESITNATION_CARD_FONT_COLOR,
    DESTINATION_CARD_SPACE_S,
    NUMBER_OF_TOP_CARDS, SCALE,
    SIDE_PANEL_HEIGHT_S,
    SIDE_PANEL_WIDTH_S,
    TOP_CARD_SPACE_S,
    TOP_CARD_X_S,
    TOP_CARD_Y_S,
    TRAIN_CARD_HEIGHT_S,
    TRAIN_CARD_WIDTH_S
} from "../../resources/constants";
import {TrainCard} from "../../models/trainCard";
import {TopTrainCard} from "../../models/topTrainCard";

@Component({
  selector: 'app-game-cards',
  templateUrl: './game-cards.component.html',
  styleUrls: ['./game-cards.component.css']
})
export class GameCardsComponent implements AfterViewInit {

    @ViewChild('gameCards')
    canvas: ElementRef<HTMLCanvasElement>;
    ctx: CanvasRenderingContext2D;

    topCards: TopTrainCard[]

    constructor(private gameEngine: GameEngineService) { }

    ngAfterViewInit(): void {
        this.ctx = this.canvas.nativeElement.getContext('2d')
        this.ctx.canvas.width = SIDE_PANEL_WIDTH_S
        this.ctx.canvas.height = SIDE_PANEL_HEIGHT_S
        this.ctx.fillStyle = "#E1C699"
        this.ctx.fillRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height)
        this.gameEngine.registerGameCardsComponent(this)
        this.topCards = this.gameEngine.getTopCards()
        this.drawCards()
    }

    mouseClick(event: MouseEvent) {

    }

    drawCards() {
        this.drawTrainCards()
        this.drawDestinationCard()
    }

    drawTrainCards() {
        for (let i = 0; i < this.topCards.length; i++) {
            this.topCards[i].draw(this.ctx)
        }
    }

    drawDestinationCard() {
        this.ctx.save()
        this.ctx.fillStyle = DESITNATION_CARD_COLOR
        let y = TOP_CARD_Y_S+(TOP_CARD_SPACE_S+TRAIN_CARD_HEIGHT_S)*NUMBER_OF_TOP_CARDS+DESTINATION_CARD_SPACE_S
        this.ctx.fillRect(TOP_CARD_X_S,y,TRAIN_CARD_WIDTH_S,TRAIN_CARD_HEIGHT_S)
        this.ctx.fillStyle = DESITNATION_CARD_FONT_COLOR
        this.ctx.font = DESITNATION_CARD_FONT
        this.ctx.fillText("Destination Card",TOP_CARD_X_S+5*SCALE,y+TRAIN_CARD_HEIGHT_S/1.8)
    }

}
