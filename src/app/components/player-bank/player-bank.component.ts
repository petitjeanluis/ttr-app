import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {OpponentCardPool} from '../../entities/opponent-card-pool';
import {SIDE_PANEL_HEIGHT, SIDE_PANEL_WIDTH} from '../../resources/constants';
import {PlayerDetails} from '../../entities/player-details';
import {PlayerSummaryState} from '../../state/player-summary-state';
import {PlayerState} from '../../state/player-state';
import {Point} from '../../models/point';
import {ModalComponent} from '../modal/modal.component';
import {GameEngineService} from '../../services/game-engine.service';

@Component({
  selector: 'app-player-info',
  templateUrl: './player-bank.component.html',
  styleUrls: ['./player-bank.component.css']
})
export class PlayerBankComponent implements AfterViewInit {

    @ViewChild('playerInfo')
    canvas: ElementRef<HTMLCanvasElement>;
    
    @ViewChild('destinationCardsModal')
    destinationCardsModal: ModalComponent
    
    ctx: CanvasRenderingContext2D;
    
    opponentCardPool!: OpponentCardPool
    playerDetails: PlayerDetails

    constructor(private gameEngineService: GameEngineService) {

    }

    ngAfterViewInit(): void {
        this.ctx = this.canvas.nativeElement.getContext('2d')
        this.ctx.canvas.width = SIDE_PANEL_WIDTH
        this.ctx.canvas.height = SIDE_PANEL_HEIGHT

        this.opponentCardPool = new OpponentCardPool(this.ctx)
        this.playerDetails = new PlayerDetails(this.ctx)

        this.gameEngineService.registerPlayerBankComponent(this)
    }

    setPlayerState(playerState: PlayerState) {
        this.playerDetails.setPlayerState(playerState)
    }

    setPlayerSummaryStates(playerSummaryStates: PlayerSummaryState[]) {
        this.opponentCardPool.setOpponentCards(playerSummaryStates)
    }

    drawComponent(): void {
        this.opponentCardPool.draw()
        this.playerDetails.draw()
    }

    mouseClick(event: MouseEvent): void {
        let point = new Point(event.offsetX, event.offsetY)
        if (this.playerDetails.isTouched(point)) {
            this.destinationCardsModal.openModal()
        }
    }
}
