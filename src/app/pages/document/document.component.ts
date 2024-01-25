import { Component, ViewChild } from '@angular/core';

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
import { UserDocumentStatusEnum, UserDocumentStatusEnumDescriptions } from 'src/app/shared/constants/enums/user-document-status-enum';

@Component({
  selector: 'app-document',
  standalone: true,
  imports: [
    TableModule,
    InputTextareaModule,
    ButtonModule,
    RadioButtonModule,
    DialogModule,
    InputTextModule,
    DropdownModule,
    TabViewModule,
    TagModule,
    MultiSelectModule,
    FormsModule
],
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent {
  constructor(private documentService: DocumentService) { }
  showActiveDocumentTab = false;
  showCompletedDocumentTab = false;
  activeDocument: ClinicDocumentRequestDTO[] = [];
  completedDocument: ClinicDocumentRequestDTO[] = [];
  CLINICIAN_DOCUMENT_ENUM_NAMES$ = ClinicianDocumentsEnumNames;
  CLINICIAN_DOCUMENTS_ENUM_TAG_COLORS$ = ClinicianDocumentsEnumTagColors;
  DOCUMENT_TYPE_ENUM_DESCRIPTION$ = DocumentTypeEnumDescriptions;
  USER_DOCUMENT_STATUS_ENUM_DESCRIPTION$ = UserDocumentStatusEnumDescriptions;
  statusList: {
    label: any;
    value: ClinicianDocumentsEnum;
  }[] = Object.keys(ClinicianDocumentsEnum)
    .filter((key: any) => !isNaN(Number(ClinicianDocumentsEnum[key])))
    .map((key: any) => ({ label: this.CLINICIAN_DOCUMENT_ENUM_NAMES$.get(ClinicianDocumentsEnum[key] as unknown as ClinicianDocumentsEnum), value: + ClinicianDocumentsEnum[key] as ClinicianDocumentsEnum }));

  documentTypeList: { 
    label: any;
    value: DocumentTypeEnum;
  }[] = Object.keys(DocumentTypeEnum)
    .filter((key: any) => !isNaN(Number(DocumentTypeEnum[key])))
    .map((key: any) => ({ label: this.DOCUMENT_TYPE_ENUM_DESCRIPTION$.get(DocumentTypeEnum[key] as unknown as DocumentTypeEnum), value: + DocumentTypeEnum[key] as DocumentTypeEnum }));

    userDocumentTypeList: { 
      label: any;
      value: UserDocumentStatusEnum;
    }[] = Object.keys(UserDocumentStatusEnum)
      .filter((key: any) => !isNaN(Number(UserDocumentStatusEnum[key])))
      .map((key: any) => ({ label: this.USER_DOCUMENT_STATUS_ENUM_DESCRIPTION$.get(UserDocumentStatusEnum[key] as unknown as UserDocumentStatusEnum), value: + UserDocumentStatusEnum[key] as UserDocumentStatusEnum }));  

  @ViewChild('dt1') dt: Table | undefined;
  @ViewChild('dt2') dt2: Table | undefined;

  ngOnInit(): void {
    this.showActiveDocuments();
    console.log(this.userDocumentTypeList);
  }
  activeTab: string = 'activeDocument'
  visible: boolean = false

  products: any = [
    {
      PhysicianName: "fdsfsd",
      CreatedDate: "fdsfsd",
      AssignedRoles: "fdsfsd",
      AssignmentType: "fdsfsd",
      Status: "fdsfsd",
      Action: "fdsfsd",
    },
    {
      PhysicianName: "adsfsd",
      CreatedDate: "sfsd",
      AssignedRoles: "dsfsd",
      AssignmentType: "xdsfsd",
      Status: "xdsfsd",
      Action: "bdsfsd",
    }
  ]
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

  showActiveDocuments(){
    this.documentService.getActiveClinicOnBoardDocuments().subscribe(res =>{
      if(res?.data.length > 0)
      {
        this.showActiveDocumentTab= true;
        this.showCompletedDocumentTab = false;
        res?.data.forEach((documentRequest: any) =>
        (
          documentRequest.createdDate = new Date(documentRequest.modifiedAt),
          documentRequest.statusEnum = { label: this.CLINICIAN_DOCUMENT_ENUM_NAMES$.get(documentRequest.status), value: documentRequest.status },
          documentRequest.documentTypeEnum = { label: this.DOCUMENT_TYPE_ENUM_DESCRIPTION$.get(documentRequest.documentType), value: documentRequest.documentType },
          documentRequest.userDocumentStatus = { label: this.USER_DOCUMENT_STATUS_ENUM_DESCRIPTION$.get(documentRequest.hasApprovedProtocolDocumentStatus),value:documentRequest.hasApprovedProtocolDocumentStatus}

        ));
        this.activeDocument = res?.data;
        console.log(res);
      }

    });
  }

  showCompeletedDocuments(){
    this.documentService.getCompletedClinicOnBoardDocuments().subscribe((res:any) =>{
      if(res?.data.length > 0)
      {
        this.showActiveDocumentTab= false;
        this.showCompletedDocumentTab = true;
        res?.data.forEach((documentRequest: any) =>
        (
          documentRequest.createdDate = new Date(documentRequest.createdDate),
          documentRequest.statusEnum = { label: this.CLINICIAN_DOCUMENT_ENUM_NAMES$.get(documentRequest.status), value: documentRequest.status },
          documentRequest.documentTypeEnum = { label: this.DOCUMENT_TYPE_ENUM_DESCRIPTION$.get(documentRequest.documentType), value: documentRequest.documentType },
          documentRequest.userDocumentStatus = { label: this.USER_DOCUMENT_STATUS_ENUM_DESCRIPTION$.get(documentRequest.documentType),value:documentRequest.hasApprovedProtocolDocumentStatus}
        ));
        this.completedDocument = res?.data;
        console.log(res);
      }
    });
  }

  showActiveDocumnetTab(event: any){
    if (event.index === 0) {
      this.showActiveDocuments();
   } else {
     this.showCompeletedDocuments();
   }
  }

  applyFilterGlobal($event: any, stringVal: string, table:Table) {
    table?.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  clear(table: Table) {
    table.clear();
  }
}
