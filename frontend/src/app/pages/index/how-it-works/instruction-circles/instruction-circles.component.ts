import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-instruction-circles',
  templateUrl: './instruction-circles.component.html',
  styleUrls: ['./instruction-circles.component.scss']
})
export class InstructionCirclesComponent {
  @Input() number!: string;

  @Input() description!: string;
}
