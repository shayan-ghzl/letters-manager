import { templateJitUrl } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogUploadComponent } from 'src/app/shared/components/dialog-upload/dialog-upload.component';
import { MediaCategory, MediaCategoryParams, Pagination, PaginationPack, TableColumn } from 'src/app/shared/models/upload';
import { UploadService } from '../upload.service';

@Component({
  selector: 'app-upload-category',
  templateUrl: './upload-category.component.html',
  styleUrls: ['./upload-category.component.scss']
})
export class UploadCategoryComponent implements OnInit {

  @ViewChild(DialogUploadComponent) dialogUploadComponent!: DialogUploadComponent;
  allCategories: MediaCategory[] = [];
  allCategoriesFlatten: MediaCategory[] = [];
  allCategoryShow: MediaCategory[] = [];
  rootCheckbox: boolean = false;
  flattenCategoryLevel = -1;
  tableSearch: string = '';
  newCategoryName: string = '';
  newCategoryDesc: string = '';
  newCategoryParent: string = '-1';
  editCategoryName: string = '';
  editCategoryDesc: string = '';
  editCategoryParent: string = '-1';
  addNewCatSpinner: boolean = false;
  addEditCatSpinner: boolean = false;
  theadColObject: TableColumn[] = [
    {
      name: 'نام',
      class: 'column-name column-primary',
      order: false,
      isSortable: true,
    },
    {
      name: 'توضیح',
      class: 'column-description',
      order: false,//means it is desc
      isSortable: true,
    },
    {
      name: 'تعداد',
      class: 'column-posts',
      order: false,
      isSortable: true,
    },
  ];
  displayAddSubmitBtn = true;
  displayEditSubmitBtn = true;
  addValidateObj = {
    'name': {
      'isRequired': true,
      'hasError': false,
      'errorMessage': 'بین 2 تا 70 حرف مجاز است',
      isValid: () => {
        let temp = this.newCategoryName.trim().length;
        return (2 <= temp && temp <= 70);
      }
    },
    'description': {
      'isRequired': false,
      'hasError': false,
      'errorMessage': 'باید حداکثر 70 حرف باشد.',
      isValid: () => {
        let temp = this.newCategoryDesc.trim().length;
        return (0 <= temp && temp <= 70);
      }
    },
  };
  editValidateObj = {
    'editName': {
      'isRequired': true,
      'hasError': false,
      'errorMessage': 'بین 2 تا 70 حرف مجاز است',
      isValid: () => {
        let temp = this.editCategoryName.trim().length;
        return (2 <= temp && temp <= 70);
      }
    },
    'editDescription': {
      'isRequired': false,
      'hasError': false,
      'errorMessage': 'باید حداکثر 70 حرف باشد.',
      isValid: () => {
        let temp = this.editCategoryDesc.trim().length;
        return (0 <= temp && temp <= 70);
      }
    },

  };
  bulkActionMenu = [
    {
      'name': 'پاک کردن',
      'opration': 'remove'
    }
  ];
  currentBulkAction = '-1';
  paginationItems: PaginationPack = {
    pageItems: [],
    hasNext: false,
    hasPrev: false,
  };

  tableLastPage: number = 1

  state: Pagination = {
    'querySet': [],
    'page': 1,
    'rows': 8,
    'window': 5,
    maxLeft: () => {
      return (this.state.page - Math.floor(this.state.window / 2));
    },
    maxRight: () => {
      return (this.state.page + Math.floor(this.state.window / 2));
    }
  }

  constructor(private uploadService: UploadService, private messageService: MessageService, private confirmationService: ConfirmationService) {
    this.getAllCategories();
  }

  ngOnInit(): void {

  }

  currentPage: number = 0;
  getAllCategories() {
    this.uploadService.getCategories({ page: this.currentPage, size: 5 }).subscribe(
      (data) => {
        this.allCategories = this.allCategories.concat(data.content);
        if (data.totalElements > this.allCategories.length) {
          this.currentPage++;
          this.getAllCategories();
        } else {
          this.currentPage = 0;
          this.allCategoriesFlatten = this.flat(this.allCategories);
          this.state.querySet = this.allCategoriesFlatten;
          this.buildTable();
        }
      },
      (error) => { console.log(error); },
    );

  }

  closeEditRow(category: MediaCategory) {
    this.editCategoryName = category.name;
    this.editCategoryDesc = category.description;
    this.editCategoryParent = this.allCategoriesFlatten.findIndex(Element => category.parentId == Element.categoryUUID) + '';
    this.state.querySet.map((x: MediaCategory) => {
      if (x != category) {
        x.isEditOpen = false;
      }
    });
    for (const [key, value] of Object.entries(this.editValidateObj)) {
      value.hasError = false;
    }
    category.isEditOpen = !category.isEditOpen;
  }

  toggleAllCheckboxs() {
    this.allCategoryShow.map((x: MediaCategory) => {
      x.isSelected = this.rootCheckbox;
    });
  }
  toggleCategorySelect() {

  }
  dashLevelCount(n: number = 0): Array<number> {
    return Array(n);
  }
  tableSearchOpration() {
    let temp = this.allCategoriesFlatten.filter((res) => {
      return res.name.concat(' ' + res.description).toLocaleLowerCase().match(this.tableSearch.trim().toLocaleLowerCase());
    });
    this.state.querySet = temp;
    this.buildTable();

  }
  addNewCategory() {
    this.addNewCatSpinner = true;
    this.displayAddSubmitBtn = true;
    let parentId: string | null;
    if (this.newCategoryParent == '-1') {
      parentId = null;
    } else {
      parentId = this.allCategoriesFlatten[+this.newCategoryParent].categoryUUID;
    }
    this.uploadService.addCategory({ "categoryUUID": null, "name": this.newCategoryName, "description": this.newCategoryDesc, "parentId": parentId }).subscribe(
      (data) => {
        this.messageService.add({ key: 'MediaCategoryToast', severity: 'success', summary: 'موفقیت آمیز', detail: `${data.name} با موفقیت حذف شد`, life: 7000 });
        this.addNewCatSpinner = false;
        this.allCategories = [];
        this.getAllCategories();
      },
      (error) => {
        console.log(error);
        this.messageService.add({ key: 'MediaCategoryToast', severity: 'error', summary: 'خطا', detail: error.error.message, life: 7000 });
        this.addNewCatSpinner = false;
      }
    );
  }

  updateCategory(category: MediaCategory) {
    this.addEditCatSpinner = true;
    let parentId: string | null;
    if (this.editCategoryParent == '-1') {
      parentId = null;
    } else {
      parentId = this.allCategoriesFlatten[+this.editCategoryParent].categoryUUID;
    }
    this.uploadService.editCategory({ "categoryUUID": category.categoryUUID, "name": this.editCategoryName, "description": this.editCategoryDesc, "parentId": parentId }).subscribe(
      (data) => {
        this.messageService.add({ key: 'MediaCategoryToast', severity: 'success', summary: 'موفقیت آمیز', detail: `${data.name} با موفقیت ویرایش شد`, life: 7000 });
        this.addEditCatSpinner = false;
        this.allCategories = [];
        this.getAllCategories();
      },
      (error) => {
        console.log(error);
        this.messageService.add({ key: 'MediaCategoryToast', severity: 'error', summary: 'خطا', detail: error.error.message, life: 7000 });
        this.addEditCatSpinner = false;
      }
    );
  }
  // this method is for conver tree like object to list
  flat(array: MediaCategory[]) {
    let result: MediaCategory[] = [];
    this.flattenCategoryLevel++;
    array.forEach((Element: MediaCategory) => {
      Element.level = this.flattenCategoryLevel;
      // Element.isSelected = false;
      // Element.isEditOpen = false;
      result.push(Element);
      result = result.concat(this.flat(Element.children));
    });
    this.flattenCategoryLevel--;
    return result;
  }
  openImagePicker(e: any) {
    this.dialogUploadComponent.showPersonDialog();
  }
  clear() {
    this.messageService.clear('MediaCategoryToast');
  }
  showDeleteCategoryConf(category: MediaCategory): void | boolean {
    if (category.isRemoved || category.isEdited) {
      return false;
    }
    this.confirmationService.confirm({
      header: 'پیغام',
      message: `آیا از حذف ${category.name} اطمینان دارید؟`,
      accept: () => {
        this.uploadService.deleteCategory(category).subscribe(
          (data) => {
            this.messageService.add({ key: 'MediaCategoryToast', severity: 'success', summary: 'موفقیت آمیز', detail: `${category.name} با موفقیت حذف شد`, life: 7000 });
            this.allCategories = [];
            this.getAllCategories();
          },
          (error) => {
            console.log(error);
            this.messageService.add({ key: 'MediaCategoryToast', severity: 'error', summary: 'خطا', detail: error.error.message, life: 7000 });
          },
          () => { },
        );
      }
    });
  }
  addCategoryValidate(fieldName: string): boolean {

    switch (fieldName) {
      case 'name':
        if (this.addValidateObj.name.isValid()) {
          this.addValidateObj.name.hasError = false;

          return true;
        } else {
          this.addValidateObj.name.hasError = true;
          this.displayAddSubmitBtn = true;
          return false;
        }
        break;
      case 'description':
        if (this.addValidateObj.description.isValid()) {
          this.addValidateObj.description.hasError = false;

          return true;
        } else {
          this.addValidateObj.description.hasError = true;
          this.displayAddSubmitBtn = true;
          return false;
        }
        break;
      default:
        let isFormValid: number = 0;
        for (const [key, value] of Object.entries(this.addValidateObj)) {
          if (value.isValid()) {
            value.hasError = false;
            isFormValid++;
          } else {
            value.hasError = true;
            isFormValid--;
          }
        }
        if (Object.entries(this.addValidateObj).length == isFormValid) {
          this.displayAddSubmitBtn = false;
          return true;
        } else {
          this.displayAddSubmitBtn = true;
          return false;
        }
        break;
    }

  }
  editCategoryValidate(fieldName: string): boolean {

    switch (fieldName) {

      case 'editName':
        if (this.editValidateObj.editName.isValid()) {
          this.editValidateObj.editName.hasError = false;

          return true;
        } else {
          this.editValidateObj.editName.hasError = true;
          this.displayEditSubmitBtn = true;
          return false;
        }
        break;
      case 'editDescription':
        if (this.editValidateObj.editDescription.isValid()) {
          this.editValidateObj.editDescription.hasError = false;

          return true;
        } else {
          this.editValidateObj.editDescription.hasError = true;
          this.displayEditSubmitBtn = true;
          return false;
        }
        break;
      default:
        let isFormValid: number = 0;
        for (const [key, value] of Object.entries(this.editValidateObj)) {
          if (value.isValid()) {
            value.hasError = false;
            isFormValid++;
          } else {
            value.hasError = true;
            isFormValid--;
          }
        }
        if (Object.entries(this.editValidateObj).length == isFormValid) {
          this.displayEditSubmitBtn = false;
          return true;
        } else {
          this.displayEditSubmitBtn = true;
          return false;
        }
        break;
    }

  }

  // pagination functions 
  pagination(querySet: MediaCategory[], page: number, rows: number) {
    this.tableLastPage = Math.ceil(querySet.length / rows);
    let trimStart = (page - 1) * rows
    let trimEnd = trimStart + rows
    return {
      'querySet': querySet.slice(trimStart, trimEnd),
      'pages': this.tableLastPage,
    };
  }

  buildTable() {
    let data = this.pagination(this.state.querySet, this.state.page, this.state.rows);
    this.rootCheckbox = false;
    this.allCategoryShow.map((x: MediaCategory) => {
      x.isSelected = this.rootCheckbox;
    });
    this.allCategoryShow = data.querySet;
    this.pageButtons(data.pages);
  }

  pageButtons(pages: number) {
    let maxLeft = this.state.maxLeft();
    let maxRight = this.state.maxRight();
    this.paginationItems.pageItems = [];
    this.paginationItems.hasNext = false;
    this.paginationItems.hasPrev = false;
    if (maxLeft < 1) {
      maxLeft = 1
      maxRight = this.state.window
    }
    if (maxRight > pages) {
      maxLeft = pages - (this.state.window - 1)
      if (maxLeft < 1) {
        maxLeft = 1
      }
      maxRight = pages
    }

    for (var page = maxLeft; page <= maxRight; page++) {
      this.paginationItems.pageItems.push({
        page: page,
        isActive: (this.state.page == page) ? true : false,
      });
    }

    if (this.state.page != 1) {
      this.paginationItems.hasPrev = true;
    }
    if (this.state.page != pages) {
      this.paginationItems.hasNext = true;
    }

  }
  bulkActionRun() {
    let opration = this.bulkActionMenu[+this.currentBulkAction].opration;
    if (opration == 'remove') {
      this.allCategoryShow.map((x: MediaCategory) => {
        if (x.isSelected) {
          this.uploadService.deleteCategory(x).subscribe(
            (data) => {
              this.messageService.add({ key: 'MediaCategoryToast', severity: 'success', summary: 'موفقیت آمیز', detail: `${x.name} با موفقیت حذف شد`, life: 7000 });
            },
            (error) => {
              console.log(error);
              this.messageService.add({ key: 'MediaCategoryToast', severity: 'error', summary: 'خطا', detail: error.error.message, life: 7000 });
            }
          )
        };
      });
    setTimeout(() => {
      this.allCategories = [];
      this.getAllCategories();
    }, 500);
    }
  }

  sortTable(column: TableColumn, index: number) {
    for (const [key, value] of Object.entries(this.theadColObject)) {
      if(value != column){
        value.order = false;
      }
    }
    column.order = !column.order;
    if (index == 0) {
      if (column.order == false) {
        this.allCategoriesFlatten.sort(function (a, b) {
          if (a.name < b.name) { return 1; }
          if (a.name > b.name) { return -1; }
          return 0;
        });

      } else {
        this.allCategoriesFlatten.sort(function (a, b) {
          if (a.name < b.name) { return -1; }
          if (a.name > b.name) { return 1; }
          return 0;
        });
      }
    } else if (index == 1) {
      if (column.order == false) {
        this.allCategoriesFlatten.sort(function (a, b) {
          if (a.description < b.description) { return 1; }
          if (a.description > b.description) { return -1; }
          return 0;
        });

      } else {
        this.allCategoriesFlatten.sort(function (a, b) {
          if (a.description < b.description) { return -1; }
          if (a.description > b.description) { return 1; }
          return 0;
        });
      }
    } else if (index == 2) {
      if (column.order == false) {
        this.allCategoriesFlatten.sort(function (a, b) {
          if (a.childrenCount < b.childrenCount) { return 1; }
          if (a.childrenCount > b.childrenCount) { return -1; }
          return 0;
        });

      } else {
        this.allCategoriesFlatten.sort(function (a, b) {
          if (a.childrenCount < b.childrenCount) { return -1; }
          if (a.childrenCount > b.childrenCount) { return 1; }
          return 0;
        });
      }
    }

    this.state.querySet = this.allCategoriesFlatten;
    this.buildTable();
  }
}
