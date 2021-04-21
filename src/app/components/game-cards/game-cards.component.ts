import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {GameEngineService} from "../../services/game-engine.service";
import {
    DESTINATION_CARD_COLOR,
    DESTINATION_CARD_FONT,
    DESTINATION_CARD_FONT_COLOR,
    DESTINATION_CARD_SPACE,
    NUMBER_OF_TOP_CARDS, SCALE,
    SIDE_PANEL_HEIGHT,
    SIDE_PANEL_WIDTH,
    TRAIN_CARD_HEIGHT,
    TRAIN_CARD_WIDTH
} from "../../resources/constants";


@Component({
  selector: 'app-game-cards',
  templateUrl: './game-cards.component.html',
  styleUrls: ['./game-cards.component.css']
})
export class GameCardsComponent implements AfterViewInit {

    @ViewChild('gameCards')
    canvas: ElementRef<HTMLCanvasElement>;
    ctx: CanvasRenderingContext2D;

    constructor(private gameEngine: GameEngineService) { }

    ngAfterViewInit(): void {
        this.ctx = this.canvas.nativeElement.getContext('2d')
        this.ctx.canvas.width = SIDE_PANEL_WIDTH
        this.ctx.canvas.height = SIDE_PANEL_HEIGHT
        this.gameEngine.registerGameCardsComponent(this)
        this.drawComponent()
    }

    drawComponent() {
        this.drawFrame()
        this.drawTrainCards()
    }

    private drawFrame() {
        this.ctx.fillStyle = "#E1C699"
        this.ctx.fillRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height)
    }

    private drawTrainCards() {
        this.gameEngine.faceUpTrainCards.draw(this.ctx)
    }


    mouseClick(event: MouseEvent) {
        this.gameEngine.gameCardClick(event)
    }

}
