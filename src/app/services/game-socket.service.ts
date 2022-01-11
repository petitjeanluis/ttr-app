import { Injectable } from '@angular/core'
import { BehaviorSubject, filter, first, Subscription } from 'rxjs';
import { Payload } from '../state/payload';
import { StateUpdate } from '../state/state-update'

@Injectable({
  providedIn: 'root'
})
export class GameSocketService {

  readonly WEBSOCKET_ENDPOINT = "wss://mn5svh6mdc.execute-api.us-east-1.amazonaws.com/dev"

  private webSocket: WebSocket
  private stateUpdateEmitter: BehaviorSubject<StateUpdate>
  private onSocketConnected: Promise<void>

  constructor() { 
    this.stateUpdateEmitter = new BehaviorSubject<StateUpdate>(null)

    this.webSocket = new WebSocket(this.WEBSOCKET_ENDPOINT)
    
    this.onSocketConnected = new Promise<void>((resolve, reject) => {
      this.webSocket.onopen = (event) => {
        console.log(`Connection successful to ${this.WEBSOCKET_ENDPOINT}`)
        resolve()
      }
    })
    
    this.webSocket.onmessage = this.processMessage.bind(this)
  }

  disconnect() {
    this.webSocket.close()
  }

  onConnected(): Promise<void> {
    return this.onSocketConnected
  }

  registerStateUpdateHandler(next: (data: StateUpdate) => void): void {
    this.stateUpdateEmitter.pipe(filter((item) => item != null)).subscribe(next)
  }

  registerSingleShotStateUpdateHandler(next: (data: StateUpdate) => void) {
    this.stateUpdateEmitter.pipe(filter((item) => item != null), first()).subscribe(next)
  }

  processMessage(mesageEvent: MessageEvent) {
    const stateUpdate: StateUpdate = JSON.parse(mesageEvent.data.toString())

    console.log(stateUpdate);
    
    this.stateUpdateEmitter.next(stateUpdate)
  }

  sendMessage(payload: Payload) {
    const jsonPayload = JSON.stringify(payload)

    console.log(jsonPayload);
    
    this.webSocket.send(jsonPayload)
  }
}
