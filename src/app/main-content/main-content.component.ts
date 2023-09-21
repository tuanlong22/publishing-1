// main-content.component.ts
import { Component } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent {
  selectedFile: File | null = null;
  selectedFileName: string = '';
  fileContent: any[][] | null = null;

  handleFileInput(event: any): void {
    this.selectedFile = event.target.files[0];
    this.selectedFileName = this.selectedFile?.name || '';

    if (this.selectedFile) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const fileData = e.target.result;
        const workbook = XLSX.read(fileData, { type: 'binary' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        this.fileContent = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      };

      reader.readAsBinaryString(this.selectedFile);
    }
  }

  isActive: boolean = false;

  // Phương thức để chuyển đổi trạng thái menu
  toggleMenu() {
    this.isActive = !this.isActive;
  }

  isImportDataActive: boolean = false;

  // Phương thức để chuyển đổi trạng thái menu "IMPORT DATA"
  toggleImportDataMenu() {
    this.isImportDataActive = !this.isImportDataActive;
  }
}