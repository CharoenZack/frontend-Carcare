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
  washTool = [];
  constructor(
    private route: ActivatedRoute,
    private washToolService: WashtoolService) { }

  ngOnInit() {
    this.getAllWashTool();
    this.userRole = localStorage.getItem('position');
  }

  getAllWashTool() {
    this.washToolService.getAllWashTool().subscribe(rs => {
        this.washTool = rs;
        console.log(this.washTool);
      })
  }
}
