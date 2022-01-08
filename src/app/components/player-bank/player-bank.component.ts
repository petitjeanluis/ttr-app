import {AfterViewInit, OnDestroy,Component, ElementRef, ViewChild} from '@angular/core';
import {OpponentCardPool} from '../../entities/opponent-card-pool';
import {SIDE_PANEL_HEIGHT, SIDE_PANEL_WIDTH} from '../../resources/constants';
import {PlayerCard} from '../../entities/player-card';
import {Opponent} from '../../state/opponent';
import {Player} from '../../state/player';
import {Point} from '../../models/point';
import {ModalComponent} from '../modal/modal.component';
import {GameEngineService} from '../../services/game-engine.service';
import { StateUpdate } from 'src/app/state/state-update';
import { Destination } from 'src/app/models/destination';
import { DESTINATION_MAP } from 'src/app/resources/destination-cards';
import { ID_CITY_MAP } from 'src/app/resources/board-constants';
import { Subscription } from 'rxjs';
import { ChildActivationStart } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-player-info',
  templateUrl: './player-bank.component.html',
  styleUrls: ['./player-bank.component.css']
})
export class PlayerBankComponent implements AfterViewInit, OnDestroy {

    @ViewChild('playerInfo')
    canvas: ElementRef<HTMLCanvasElement>;
    
    @ViewChild('destinationCardsModal')
    destinationCardsModal: ModalComponent
    
    ctx: CanvasRenderingContext2D;
    
    opponentCardPool!: OpponentCardPool
    playerCard: PlayerCard
    destinationCards: Destination[] = []
    private stateUpdateSubscription: Subscription

    constructor(private gameEngineService: GameEngineService) {
    }

    ngAfterViewInit(): void {
        this.ctx = this.canvas.nativeElement.getContext('2d')
        this.ctx.canvas.width = SIDE_PANEL_WIDTH
        this.ctx.canvas.height = SIDE_PANEL_HEIGHT

        this.opponentCardPool = new OpponentCardPool(this.ctx)
        this.playerCard = new PlayerCard(this.ctx)

        this.stateUpdateSubscription = this.gameEngineService.registerStateUpdateHandler(this.stateUpdateHandler.bind(this))

        console.log("player bank after view initialized");   
    }

    ngOnDestroy(): void {
        this.stateUpdateSubscription.unsubscribe()
    }

    stateUpdateHandler(stateUpdate: StateUpdate): void {
       console.log("player bank received state update");       
    
       const newDestinationCards = []
       for (let destinationId of stateUpdate.player.destinationCards) {
        newDestinationCards.push(DESTINATION_MAP.get(destinationId))
       }
       this.destinationCards = newDestinationCards
        
        this.drawComponent(stateUpdate.player, stateUpdate.opponents)
    }

    drawComponent(player: Player, opponentDetails: Opponent[]): void {
        this.playerCard.draw(player)
        this.opponentCardPool.draw(opponentDetails)
    }

    mouseClick(event: MouseEvent): void {
        let point = new Point(event.offsetX, event.offsetY)
        if (this.playerCard.isTouched(point)) {
            this.destinationCardsModal.openModal()
        }
    }

    getCityName(cityId: number): string {
        return ID_CITY_MAP[cityId]
    }
}
