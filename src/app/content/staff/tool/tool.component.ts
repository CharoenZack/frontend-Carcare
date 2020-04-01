import { Component, OnInit } from '@angular/core';
import { WashtoolService } from 'src/app/shared/services/washtool.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-tool',
  templateUrl: './tool.component.html',
  styleUrls: ['./tool.component.css']
})
export class ToolComponent implements OnInit {
  public userRole: string;
  display = false;
  washTool = [];
  constructor(
    private route: ActivatedRoute,
    private washToolService: WashtoolService) { }

  ngOnInit() {
    this.getAllWashTool();
    this.userRole = localStorage.getItem('position');
    console.log(this.userRole);

  }

  getAllWashTool() {
    this.washToolService.getWashToolWPosition(localStorage.getItem('position')).subscribe(rs => {
      rs.map(res => {
        this.washTool.push(res)
      });
    })
  }
}
