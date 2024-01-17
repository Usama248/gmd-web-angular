import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule } from '@angular/forms';
import { TabViewModule } from 'primeng/tabview';
import { TagModule } from 'primeng/tag';
import { DocumentService } from 'src/app/services/document-service/document.service';
import { ClinicDocumentRequestDTO } from 'src/app/models/document/clinic-document-request-dto';
import { ClinicianDocumentsEnum, ClinicianDocumentsEnumNames, ClinicianDocumentsEnumTagColors } from 'src/app/shared/constants/enums/clinician-documents-enum';
import { DocumentTypeEnum, DocumentTypeEnumDescriptions } from 'src/app/shared/constants/enums/chart-document-type-enum';
import { MultiSelectModule } from 'primeng/multiselect';


@Component({
  selector: 'app-chart-review',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    InputTextareaModule,
    ButtonModule,
    RadioButtonModule,
    DialogModule,
    InputTextModule,
    DropdownModule,
    FormsModule,
    TabViewModule,
    TagModule,
    MultiSelectModule
  ],
  templateUrl: './chart-review.component.html',
  styleUrls: ['./chart-review.component.scss']
})
export class ChartReviewComponent {

  showActiveDocumentTab = false;
  showCompletedDocumentTab = false;
  activeDocument:ClinicDocumentRequestDTO[] =[];
  completedDocument:ClinicDocumentRequestDTO[] =[];
  CLINICIAN_DOCUMENT_ENUM_NAMES$ = ClinicianDocumentsEnumNames;
  CLINICIAN_DOCUMENTS_ENUM_TAG_COLORS$ = ClinicianDocumentsEnumTagColors;
  DOCUMENT_TYPE_ENUM_DESCRIPTION$ =  DocumentTypeEnumDescriptions;

  statusList : {
    label: any;
    value: ClinicianDocumentsEnum;
   }[] = Object.keys(ClinicianDocumentsEnum)
    .filter((key: any) => !isNaN(Number(ClinicianDocumentsEnum[key])))
    .map((key: any) => ({ label: this.CLINICIAN_DOCUMENT_ENUM_NAMES$.get(ClinicianDocumentsEnum[key] as unknown as ClinicianDocumentsEnum), value: + ClinicianDocumentsEnum[key] as ClinicianDocumentsEnum }));

    documentTypeList : {
      label: any;
      value: DocumentTypeEnum;
     }[] = Object.keys(DocumentTypeEnum)
      .filter((key: any) => !isNaN(Number(DocumentTypeEnum[key])))
      .map((key: any) => ({ label: this.DOCUMENT_TYPE_ENUM_DESCRIPTION$.get(DocumentTypeEnum[key] as unknown as DocumentTypeEnum), value: + DocumentTypeEnum[key] as DocumentTypeEnum }));

      @ViewChild('dt1') dt: Table | undefined;
      @ViewChild('dt2') dt2: Table | undefined;


  
  constructor(private chartReviewDocument: DocumentService){}
  ngOnInit(): void {
     this.showActiveChartReviewDocuments();
  }
  activeTab: string = 'activeDocument'
  visible: boolean = false
  searchvalue:string = ''

  cities: any = [
    {
      name: 'Karachi',
    },
    {
      name: 'Lahore',
    },
    {
      name: 'Islamabad',
    },
  ]
  conversationTab(a: string) {
    this.activeTab = a
  }
  showDialog() {
    this.visible = !this.visible
  }

  showActiveChartReviewDocuments(){
    this.chartReviewDocument.getClinicActiveChartReviewDocuments().subscribe(res =>{
      if(res?.data.length > 0)
      {
        this.showActiveDocumentTab= true;
        this.showCompletedDocumentTab = false;
        res?.data.forEach((documentRequest: any) =>
        (
          documentRequest.createdDate = new Date(documentRequest.modifiedAt),
          documentRequest.statusEnum = { label: this.CLINICIAN_DOCUMENT_ENUM_NAMES$.get(documentRequest.status), value: documentRequest.status },
          documentRequest.documentTypeEnum = { label: this.DOCUMENT_TYPE_ENUM_DESCRIPTION$.get(documentRequest.documentType), value: documentRequest.documentType }
        ));
        this.activeDocument = res?.data;
        console.log(res);
      }

    });
  }

  showCompeletedChartReviewDocuments(){
    this.chartReviewDocument.getClinicCompletedChartReviewDocuments().subscribe(res =>{
      if(res?.data.length > 0)
      {
        this.showActiveDocumentTab= false;
        this.showCompletedDocumentTab = true;
        res?.data.forEach((documentRequest: any) =>
        (
          documentRequest.createdDate = new Date(documentRequest.createdDate),
          documentRequest.statusEnum = { label: this.CLINICIAN_DOCUMENT_ENUM_NAMES$.get(documentRequest.status), value: documentRequest.status },
          documentRequest.documentTypeEnum = { label: this.DOCUMENT_TYPE_ENUM_DESCRIPTION$.get(documentRequest.documentType), value: documentRequest.documentType }
        ));
        this.completedDocument = res?.data;
        console.log(res);
      }
    });
  }

  showChartDocumentReview(event: any){
    if (event.index === 0) {
      this.showActiveChartReviewDocuments();
   } else {
     this.showCompeletedChartReviewDocuments();
   }
  }

  applyFilterGlobal($event: any, stringVal: string, table:Table) {
    table?.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  clear(table: Table) {
    table.clear();
  }
}
