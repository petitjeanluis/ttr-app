import {AfterViewInit, OnDestroy,Component, ElementRef, ViewChild} from '@angular/core';
import {OpponentCardPool} from '../../entities/opponent-card-pool';
import {CARD_SPACING, SIDE_PANEL_HEIGHT, SIDE_PANEL_WIDTH} from '../../resources/constants';
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
import { ACTIVE_PLAYER_DETAILS_X, ACTIVE_PLAYER_DETAILS_Y } from 'src/app/resources/player-info-constants';

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
    }

    ngOnDestroy(): void {
        this.stateUpdateSubscription.unsubscribe()
    }

    stateUpdateHandler(stateUpdate: StateUpdate): void {   
       const newDestinationCards = []
       for (let destinationId of stateUpdate.player.destinationCards) {
        newDestinationCards.push(DESTINATION_MAP.get(destinationId))
       }
       this.destinationCards = newDestinationCards
        
        this.drawComponent(stateUpdate)
    }

    drawComponent(stateUpdate: StateUpdate): void {
        this.playerCard.draw(stateUpdate.player)
        this.opponentCardPool.draw(stateUpdate.opponents)


        this.drawCurrentPlayer(stateUpdate)
    }

    drawCurrentPlayer(stateUpdate: StateUpdate) {
        let currentPlayer: string = ""

        if (stateUpdate.activePlayerId == stateUpdate.player.id) {
            currentPlayer = stateUpdate.player.name
        }
        else {
            for (const opponent of stateUpdate.opponents) {
                if (stateUpdate.activePlayerId == opponent.id) {
                    currentPlayer = opponent.name
                    break
                }
            }
        }

        this.ctx.save()
        this.ctx.fillStyle = 'white'
        this.ctx.fillRect(ACTIVE_PLAYER_DETAILS_X, ACTIVE_PLAYER_DETAILS_Y - 20, 170, 16)
        this.ctx.fillStyle = 'black'
        this.ctx.font = 'normal 14px serif'
        this.ctx.fillText(`Current Turn: ${currentPlayer}`,ACTIVE_PLAYER_DETAILS_X, ACTIVE_PLAYER_DETAILS_Y - CARD_SPACING)
        this.ctx.restore()
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
