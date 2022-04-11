import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommunicationService } from 'src/app/home/home/account-card/services/communication.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.sass'],
})
export class AddCategoryComponent implements OnInit {
  public categoryForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });
  public isExpense: boolean = true;
  constructor(private communicationService: CommunicationService) {}

  public closeOverlay() {
    this.communicationService.callCloseOverlay();
  }

  public onSubmit() {}

  ngOnInit(): void {}
}
