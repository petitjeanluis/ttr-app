import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core'
import {GameEngineService} from '../../services/game-engine.service'
import {Point} from '../../models/point'
import {Destination} from '../../models/destination'
import { AvailableTrainCards} from '../../entities/available-train-cards'
import {TrainCardPile} from '../../entities/train-card-pile'
import {DestinationCardPile} from '../../entities/destination-card-pile'
import {SIDE_PANEL_HEIGHT, SIDE_PANEL_WIDTH} from '../../resources/constants'
import {
    DESTINATION_CARD_PILE_Y,
    DESTINATION_CARD_PILE_X,
    TRAIN_CARD_PILE_X,
    TRAIN_CARD_PILE_Y
} from '../../resources/game-cards-constants';
import {ModalComponent} from '../modal/modal.component';
import {ID_CITY_MAP} from '../../resources/board-constants';
import {TrainColor} from '../../models/train-color';
import { StateUpdate } from 'src/app/state/state-update'
import { Subject, throttleTime } from 'rxjs'


@Component({
  selector: 'app-game-cards',
  templateUrl: './card-bank.component.html',
  styleUrls: ['./card-bank.component.css']
})
export class CardBankComponent implements AfterViewInit {

    @ViewChild('gameCards')
    canvas: ElementRef<HTMLCanvasElement>
    ctx: CanvasRenderingContext2D

    @ViewChild('destinationCardOptionsModal')
    destinationCardOptionsModal: ModalComponent

    private availableCards: AvailableTrainCards
    private trainCardPile: TrainCardPile
    private destinationCardPile: DestinationCardPile

    destinationCards: Destination[]
    selectedDestinationCards = [false, false, false]

    mouseClickSubject = new Subject<MouseEvent>()

    constructor(private gameEngine: GameEngineService) {
        this.mouseClickSubject.pipe(throttleTime(1000)).subscribe(this.mouseClick.bind(this))
    }

    ngAfterViewInit(): void {
        this.ctx = this.canvas.nativeElement.getContext('2d')
        this.ctx.canvas.width = SIDE_PANEL_WIDTH
        this.ctx.canvas.height = SIDE_PANEL_HEIGHT

        let x = TRAIN_CARD_PILE_X
        let y = TRAIN_CARD_PILE_Y
        this.trainCardPile = new TrainCardPile(new Point(x, y), this.ctx)

        x = DESTINATION_CARD_PILE_X
        y = DESTINATION_CARD_PILE_Y
        this.destinationCardPile = new DestinationCardPile(new Point(x, y), this.ctx)

        this.availableCards = new AvailableTrainCards(this.ctx)

        this.gameEngine.registerStateUpdateHandler(this.stateUpdateHandler.bind(this))
    }

    stateUpdateHandler(stateUpdate: StateUpdate): void {
        this.drawComponent(stateUpdate.availableCards)
    }

    drawComponent(availableTrainCards: TrainColor[]): void {
        this.availableCards.draw(availableTrainCards)

        this.trainCardPile.draw()

        this.destinationCardPile.draw()
    }

    mouseClick(event: MouseEvent): void {
        const point = new Point(event.offsetX, event.offsetY)

        const trainCardIndex = this.availableCards.entityTouched(point)
        if (trainCardIndex != null) {
            this.gameEngine.pickTrainCard(trainCardIndex)
        }
        else if (this.trainCardPile.isTouched(point)){
            this.gameEngine.pickRandomTrainCard()
        }
        else if (this.destinationCardPile.isTouched(point)) {
            this.gameEngine.getDestinationCards()
        }
    }

    getCityName(cityId: number) {
        return ID_CITY_MAP[cityId]
    }

    // Destination Card Logic
    cardSelected(index: number): void {
        this.selectedDestinationCards[index] = this.selectedDestinationCards[index] ? false : true
    }

    isSelected(index: number): boolean {
        return this.selectedDestinationCards[index]
    }

    submitSelection(): void {
        if ( !(this.selectedDestinationCards[0] || this.selectedDestinationCards[1] || this.selectedDestinationCards[2]) ) {
            alert("Must select at least one destination card!")
            return
        }
        this.destinationCardOptionsModal.closeModal()
        this.gameEngine.pickDestinationCards([])
    }
}
