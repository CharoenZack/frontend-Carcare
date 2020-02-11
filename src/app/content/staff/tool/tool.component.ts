import { Component, OnInit } from '@angular/core';
import { WashtoolService } from 'src/app/shared/services/washtool.service';

@Component({
  selector: 'app-tool',
  templateUrl: './tool.component.html',
  styleUrls: ['./tool.component.css']
})
export class ToolComponent implements OnInit {

  washTool = [];
  constructor(private washToolService : WashtoolService) { }

  ngOnInit() {
    this.getAllWashTool();
  }

  getAllWashTool(){
    this.washToolService.getAllWashTool().subscribe(rs=>{
      this.washTool = rs;
    })
  }

}
