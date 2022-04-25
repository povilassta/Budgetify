import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommunicationService } from 'src/app/home/home/account-card/services/communication.service';
import { CategoryService } from 'src/app/home/home/add-transaction/services/category.service';

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
  constructor(
    private communicationService: CommunicationService,
    private categoryService: CategoryService
  ) {}

  public closeOverlay(): void {
    this.communicationService.callCloseOverlay();
  }

  public updateValues(): void {
    this.communicationService.callUpdateValues();
  }

  public onSubmit(): void {
    const { name } = this.categoryForm.value;
    const type = this.isExpense ? 'expense' : 'income';
    this.categoryService
      .insertCategory({ name, type })
      .subscribe((data: any) => {
        this.updateValues();
        this.closeOverlay();
      });
  }

  ngOnInit(): void {}
}
