import * as shared from '@shared/index';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [...shared.components, ...shared.directives, ...shared.pipes],
  imports: [
    CommonModule,
    FormsModule,
    MatCheckboxModule,
    MatListModule,
    MatCardModule
  ],
  exports: [
    ...shared.components,
    ...shared.directives,
    ...shared.pipes,
    FormsModule,
    MatCheckboxModule,
    MatListModule,
    MatCardModule
  ],
})
export class SharedModule {}
