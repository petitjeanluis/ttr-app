import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {GameEngineService} from "../../services/game-engine.service";
import {
    PILE_CARD_FONT,
    PILE_CARD_FONT_COLOR,
    DESTINATION_CARDS,
    NUMBER_OF_TOP_CARDS, SCALE,
    SIDE_PANEL_HEIGHT,
    SIDE_PANEL_WIDTH,
    TRAIN_CARD_HEIGHT,
    TRAIN_CARD_WIDTH, TRAIN_CARDS,
    BACKGROUND_COLOR
} from "../../resources/constants";
import {TrainCard} from "../../view-elements/train-card";
import {Point} from "../../models/point";
import {Utils} from "../../resources/utils";
import {DestinationCard} from "../../models/destination-card";
import { OrderedTrainCardPool} from "../../view-elements/ordered-train-card-pool";
import {TrainCardPile} from "../../view-elements/train-card-pile";
import {DestinationCardPile} from "../../view-elements/destination-card-pile";


@Component({
  selector: 'app-game-cards',
  templateUrl: './game-cards.component.html',
  styleUrls: ['./game-cards.component.css']
})
export class GameCardsComponent implements AfterViewInit {

    @ViewChild('gameCards')
    canvas: ElementRef<HTMLCanvasElement>;
    ctx: CanvasRenderingContext2D;

    private destinationCards: DestinationCard[] = []
    private trainCards: TrainCard[] = []
    private availableCards: OrderedTrainCardPool
    private trainCardPile: TrainCardPile = new TrainCardPile()
    private destinationCardPile: DestinationCardPile = new DestinationCardPile()

    constructor(private gameEngine: GameEngineService) { }

    ngAfterViewInit(): void {
        this.ctx = this.canvas.nativeElement.getContext('2d')
        this.ctx.canvas.width = SIDE_PANEL_WIDTH
        this.ctx.canvas.height = SIDE_PANEL_HEIGHT

        DESTINATION_CARDS.forEach(
            card => {
                this.destinationCards.push({city1:card['city1'],city2:card['city2'],value:card['value']})
            }
        )
        TRAIN_CARDS.forEach(
            trainCard => {
                for (let i = 0; i < trainCard.count; i++) {
                    this.trainCards.push(
                        new TrainCard(trainCard.type,))
                }
            }
        )
        Utils.shuffleArray(this.trainCards)

        let topFiveCards = []
        for (let i = 0; i < NUMBER_OF_TOP_CARDS; i++) {
            topFiveCards.push(this.trainCards.shift())
        }
        this.availableCards = new OrderedTrainCardPool(NUMBER_OF_TOP_CARDS,topFiveCards)

        this.gameEngine.registerGameCardsComponent(this)
        this.drawComponent()
    }

    drawComponent() {
        this.ctx.fillStyle = BACKGROUND_COLOR
        this.ctx.fillRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height)

        this.availableCards.draw(this.ctx)

        this.trainCardPile.draw(this.ctx)

        this.destinationCardPile.draw(this.ctx)
    }

    mouseClick(event: MouseEvent) {
        let point = new Point(event.offsetX,event.offsetY)
        let trainCardKey = this.availableCards.trainCardTouched(point)
        if (trainCardKey > -1) {
            let newCard = this.trainCards.shift()
            this.availableCards.replaceTrainCard(trainCardKey,newCard)
            this.drawComponent()
        } else if (this.trainCardPile.isTouched(point)){
            alert("selected train card")
        } else if (this.destinationCardPile.isTouched(point)) {
            alert("selected destination card")
        }
        /*
        * TODO
        * Give card to player
        * Reshuffle if three wildcards are present
        *
        * */
    }

}
