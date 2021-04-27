import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {GameEngineService} from "../../services/game-engine.service";
import {TrainCard} from "../../entities/train-card";
import {Point} from "../../models/point";
import {Utils} from "../../resources/utils";
import {Destination} from "../../models/destination";
import { TrainCardPool} from "../../entities/train-card-pool";
import {TrainCardPile} from "../../entities/train-card-pile";
import {DestinationCardPile} from "../../entities/destination-card-pile";
import {SIDE_PANEL_HEIGHT,SIDE_PANEL_WIDTH,SIDE_PANEL_BACKGROUND_COLOR} from "../../resources/constants";
import {DESTINATION_CARDS,TRAIN_CARDS,NUMBER_OF_TOP_CARDS} from "../../resources/game-cards-constants";


@Component({
  selector: 'app-game-cards',
  templateUrl: './game-cards.component.html',
  styleUrls: ['./game-cards.component.css']
})
export class GameCardsComponent implements AfterViewInit {

    @ViewChild('gameCards')
    canvas: ElementRef<HTMLCanvasElement>;
    ctx: CanvasRenderingContext2D;

    private destinationCards: Destination[] = []
    private trainCards: TrainCard[] = []
    private availableCards: TrainCardPool
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
                        new TrainCard(new Point(0,0),trainCard.type,))
                }
            }
        )
        Utils.shuffleArray(this.trainCards)

        let topFiveCards = []
        for (let i = 0; i < NUMBER_OF_TOP_CARDS; i++) {
            topFiveCards.push(this.trainCards.shift())
        }
        this.availableCards = new TrainCardPool(NUMBER_OF_TOP_CARDS,topFiveCards)

        this.gameEngine.registerGameCardsComponent(this)
        this.drawComponent()
    }

    drawComponent() {
        this.ctx.fillStyle = SIDE_PANEL_BACKGROUND_COLOR
        this.ctx.fillRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height)

        this.availableCards.draw(this.ctx)

        this.trainCardPile.draw(this.ctx)

        this.destinationCardPile.draw(this.ctx)
    }

    mouseClick(event: MouseEvent) {
        let point = new Point(event.offsetX,event.offsetY)
        let trainCardKey = this.availableCards.entityTouched(point)
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
