import { Injectable } from "@angular/core";
import { ConversationService } from "./conversation.service";
import { RootReducerState, getConversations, getConversationsLoaded, getConversationsLoading } from "src/store/reducers";
import { Store } from "@ngrx/store";
import { Observable, combineLatest, take } from "rxjs";
import { ConversationModel } from "src/app/models/conversation/conversation-model";
import { ConversationActions } from "src/store/actions/conversation-actions";
import { ToastService } from "src/app/shared/services/toast.service";

@Injectable({
  providedIn: 'root'
})
export class ConversationRepository {
  constructor(private conversationService: ConversationService,
     private store: Store<RootReducerState>, private toastService: ToastService) {
  }
  getAllConversationForClinic(isPast = true): Observable<ConversationModel[]> {
    const getLoading$ = this.store.select(getConversationsLoading);
    const getLoaded$ = this.store.select(getConversationsLoaded);
    const getConversations$ = this.store.select(getConversations);
    combineLatest([getLoading$, getLoaded$]).pipe(take(1)).subscribe(data => {
      if (!data[0] && !data[1]) {
        this.store.dispatch(ConversationActions.loadConversation());
        this.conversationService.getAllConversataionsForClinic(isPast, "").subscribe({
          next: res => {
            if (res.status === 1) {
              this.store.dispatch(ConversationActions.loadConversationSuccess({ data: res.data.videoCalls }))
            } else {
              this.toastService.showError(res.message);
            }
          }, error: err => {
            console.log(err);
          }
        })
      }
    });
    return getConversations$;
  }
}