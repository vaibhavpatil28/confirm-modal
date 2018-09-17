import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription, Observable } from 'rxjs';

export interface ButtonAction {
  buttonName: string;
  // successHandler: (sucessRes?: any)=> void;
  clickHandler: Observable<any>;
  errorHandler?: (errorRes?: any) => void;
  webCall?: any;
  webCallUrl?: string;
  webCallType?: string;
  data?: any;
}
export interface ConfirmDialogData {
  title: string;
  message: string;
  buttonAction: Array<ButtonAction>;
  buttonName?: Array<string>;
  data?: Object;
}
@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
  ) {}

  ngOnInit() {}
  submit(btnName: string): void {
    const selfRef = this;
    console.log('this.data.buttonAction', this.data.buttonAction);
    this.data.buttonAction.forEach(action => {
      if (action.buttonName === btnName) {
        const subscription = action.clickHandler.subscribe({
          next(num) {
            console.log(num);
            setTimeout(() => {
              selfRef.close(subscription);
            }, 500);
          },
          error() {
            console.log('error');
            // selfRef.dialogRef.close();
          },
          complete() {
            console.log('Finished sequence');
            // subscription.unsubscribe();
          }
        });
        // const res = action.webCall.subscribe(action.successHandler());
        // res.
      }
    });
  }
  close(subscription?: Subscription) {
    // console.log('subscription', subscription);
    if (subscription) {
      subscription.unsubscribe();
    }
    this.dialogRef.close();
  }
}
