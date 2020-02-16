import { ManageCarcareService } from 'src/app/shared/services/manage-carcare.service';
import { Promotion } from '../../../shared/interfaces/promotion';
import { PromotionService } from '../../../shared/services/promotion.service';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { MenuItem, Message, ConfirmationService } from 'primeng/api';
import {
  debounceTime,
  switchMap,
  map,
  distinctUntilChanged
} from 'rxjs/operators';
import * as moment from 'moment';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-manage-promotion',
  templateUrl: './manage-promotion.component.html',
  styleUrls: ['./manage-promotion.component.css']
})
export class ManagePromotionComponent implements OnInit {
  display = false;
  displayEdit = false;
  formPromo: FormGroup;
  formEditPromo: FormGroup;
  promotion: any[];
  public imageUrls;
  uploadedFiles: any[] = [];
  msgs: Message[] = [];
  public formError = {
    promoDetail: '',
    startDate: '',
    endDate: '',
    discount: ''
  };
  public validationMassages = {
    promoDetail: {
      required: '*กรุณากรอกรายละเอียดโปรโมชั่น'
    },
    startDate: {
      required: '*กรุณากรอกวันที่เริ่มใช้'
    },
    endDate: {
      required: '*กรูณากรอกวันที่สิ้นสุดโปรโมชั่น'
    },
    discount: {
      required: '*กรุณากรอกเปอร์เซ็นต์ลด'
    }
  };
  constructor(
    private promotionService: PromotionService,
    private confirmationService: ConfirmationService,
    private sanitization: DomSanitizer
  ) {}

  ngOnInit() {
    this.loadData();
    this.initForm();
    //this.getPosition();
    this.formEditPromo = new FormGroup({
      editPromoDetail: new FormControl(null),
      editStartDate: new FormControl(null),
      editEndDate: new FormControl(null),
      editDiscount: new FormControl(null),
      editPromoImg: new FormControl(null),
      id: new FormControl(null)
    });
  }

  addPromotion() {
    this.display = true;
  }

  initForm() {
    this.formPromo = new FormGroup({
      promoDetail: new FormControl(null, Validators.required),
      startDate: new FormControl(null, Validators.required),
      endDate: new FormControl(null, Validators.required),
      discount: new FormControl(null, Validators.required),
      promoImg: new FormControl(null)
    });
    this.formPromo.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(() => this.onValueChange());
  }

  submitFormPromo() {
    if (this.formPromo.valid) {
      this.msgs = [];
      this.promotionService
        .createPromotion(this.formPromo.getRawValue())
        .pipe(
          switchMap(rs => {
            this.display = false;
            this.msgs.push({
              severity: 'info',
              summary: 'Insert Promotion',
              detail: 'Insert Success'
            });
            return this.promotionService.getAllPromotion().pipe(
              map(rs => {
                return (this.promotion = rs);
              })
            );
          })
        )
        .subscribe();
    } else {
      this.onValueChange();
    }
  }

  private onValueChange() {
    if (!this.formPromo) {
      return;
    }
    for (const field of Object.keys(this.formError)) {
      this.formError[field] = '';
      const control = this.formPromo.get(field);
      if (control && !control.valid) {
        const messages = this.validationMassages[field];
        for (const key of Object.keys(control.errors)) {
          this.formError[field] += messages[key] + ' ';
        }
      }
    }
  }

  editPromotion(event) {
    console.log(event);
    this.displayEdit = true;
    const patchPromo = {
      editPromoDetail: event.detail,
      editDiscount: event.discount_percent,
      editStartDate: new Date(event.date_start),
      editEndDate: new Date(event.date_end),
      editPromoImg: event.promo_img,
      id: event.promotion_id
    };
    this.imageUrls = this.sanitization.bypassSecurityTrustUrl(
      '' + event.promo_img
    );
    this.formEditPromo.patchValue(patchPromo);
  }

  uploadImage(event) {
    if (event.files.length > 0) {
      for(let file of event.files) {
        this.uploadedFiles.push(file);
      }
      const file = event.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.formPromo.get('promoImg').setValue(reader.result);
      };
    }
  }

  updatePromotion() {
    this.msgs = [];
    this.promotionService
      .updatePromotion(this.formEditPromo.getRawValue())
      .pipe(
        switchMap(rs => {
          this.displayEdit = false;
          this.msgs.push({
            severity: 'info',
            summary: 'Update Promotion',
            detail: 'Update Success'
          });
          return this.promotionService.getAllPromotion().pipe(
            map(rs => {
              return (this.promotion = rs);
            })
          );
        })
      )
      .subscribe();
  }

  confirm(id) {
    this.msgs = [];
    this.confirmationService.confirm({
      message: 'คุณต้องการลบข้อมูลผู้จัดการร้านคนนี้ใช่หรือไม่',
      accept: () => {
        this.promotionService
          .deletePormotion(id)
          .pipe(
            switchMap(rs => {
              this.msgs.push({
                severity: 'info',
                summary: 'Delete Success',
                detail: 'Delete Success'
              });
              return this.promotionService.getAllPromotion().pipe(
                map(rs => {
                  return (this.promotion = rs);
                })
              );
            })
          )
          .subscribe();
      }
    });
  }

  loadData() {
    this.promotionService.getAllPromotion().subscribe(rs => {
      this.promotion = rs;
    });
  }
}
