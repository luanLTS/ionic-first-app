import { Component } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { ActionSheetController } from '@ionic/angular';
import { UserPhoto } from '../interfaces/user-photo';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  constructor(
    public photoService: PhotoService,
    public actionSheetController: ActionSheetController
  ) {}

  ngOnInit() {
    this.photoService.loadSaved();
  }

  addPhotoToGallery() {
    this.photoService.addNewPhotoToGallery();
  }

  public async showActionSheet(photo: UserPhoto, position: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Photos',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.photoService.deletePicture(photo, position);
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          icon: 'close',
          handler: () => {},
        },
      ],
    });
    await actionSheet.present();
  }
}
