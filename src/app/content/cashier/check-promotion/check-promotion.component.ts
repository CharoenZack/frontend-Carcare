import { Component, OnInit } from '@angular/core';
import { PromotionService } from 'src/app/shared/services/promotion.service';

@Component({
  selector: 'app-check-promotion',
  templateUrl: './check-promotion.component.html',
  styleUrls: ['./check-promotion.component.css']
})
export class CheckPromotionComponent implements OnInit {

  promotion = [];
  constructor(private promotionService : PromotionService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.promotionService.getAllPromotion().subscribe(rs => {
      this.promotion = rs;
    });
  }

}
