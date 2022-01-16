import { templateJitUrl } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogUploadComponent } from 'src/app/shared/components/dialog-upload/dialog-upload.component';
import { MediaCategory, MediaCategoryPagination, MediaCategoryParams, TableColumn } from 'src/app/shared/models/upload';
import { UploadService } from '../upload.service';

@Component({
  selector: 'app-upload-category',
  templateUrl: './upload-category.component.html',
  styleUrls: ['./upload-category.component.scss']
})
export class UploadCategoryComponent implements OnInit {

  @ViewChild(DialogUploadComponent) dialogUploadComponent!: DialogUploadComponent;
  tableRows: number = 8;
  currentPage: number = 0;
  tableRowsTotal!: number;
  // categories: MediaCategory[] = [];
  allCategories: MediaCategory[] = [];
  allCategoriesPaginated: MediaCategoryPagination[] = [];
  allCategoriesTemp: MediaCategory[] = [];
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

  constructor(private uploadService: UploadService, private messageService: MessageService, private confirmationService: ConfirmationService) {
    this.getAllCategories();
  }

  ngOnInit(): void {
  }

  getAllCategoriesTemp: any[] = [];
  getAllCategoriesReqSize = 1;
  getAllCategories() {
    this.uploadService.getCategories({ page: this.currentPage, size: this.getAllCategoriesReqSize }).subscribe(
      (data) => {
        this.tableRowsTotal = data.totalElements;
        this.getAllCategoriesTemp = this.getAllCategoriesTemp.concat(data.content);
        if (this.tableRowsTotal > this.getAllCategoriesTemp.length) {
          this.currentPage++;
          this.getAllCategories();
        } else if (this.getAllCategoriesTemp.length) {
          this.currentPage = 0;
          this.allCategoriesTemp = this.flat(this.getAllCategoriesTemp);
          this.arrayDivider(this.allCategoriesTemp);
        }
      },
      (error) => { }
    );
  }
  // getDividedCategories(pageNumber:number){

  // }
  closeEditRow(category: MediaCategory) {
    this.editCategoryName = category.name;
    this.editCategoryDesc = category.description;
    this.editCategoryParent = this.allCategories.findIndex(Element => category.parentId == Element.categoryUUID) + '';
    category.isEditOpen = !category.isEditOpen;
    this.allCategories.map((x: MediaCategory) => {
      if (x != category) {
        x.isEditOpen = false;
      }
    });
  }

  toggleAllCheckboxs() {
    this.allCategories.map((x: MediaCategory) => {
      x.isSelected = this.rootCheckbox;
    });
  }
  toggleCategorySelect() {

  }
  dashLevelCount(n: number = 0): Array<number> {
    return Array(n);
  }
  tableSearchOpration() {
    let temp = this.allCategoriesTemp.filter((res) => {
      return res.name.concat(' ' + res.description).toLocaleLowerCase().match(this.tableSearch.trim().toLocaleLowerCase());
    });
    this.currentPage = 0;
    this.arrayDivider(temp);
  }
  addNewCategory() {
    this.addNewCatSpinner = true;
    let parentId: string | null, parent: MediaCategory | null;
    if (this.newCategoryParent == '-1') {
      parentId = null;
      parent = null;
    } else {
      parent = this.allCategoriesTemp[+this.newCategoryParent];
      parentId = parent.categoryUUID;
    }
    this.uploadService.addCategory({ "categoryUUID": null, "name": this.newCategoryName, "description": this.newCategoryDesc, "parentId": parentId }).subscribe(
      (data) => {
        data.isAdded = true;
        setTimeout(() => {
          data.isAdded = false;
        }, 7000);
        if (!parent) {
          data.level = 0;
          // data.isSelected = false;
          // data.isEditOpen = false;
          this.allCategoriesTemp.unshift(data);
          this.currentPage = 0;
        } else {
          data.level = parent.level! + 1;
          // data.isSelected = false;
          // data.isEditOpen = false;
          console.log(this.newCategoryParent);
          this.currentPage = Math.floor((+this.newCategoryParent) / this.tableRows);
          console.log(this.currentPage);
          if ((+this.newCategoryParent + 1 ) % this.tableRows == 0) {
            this.currentPage++;
          }
          console.log(this.currentPage);
          this.arrayInsertAt(+this.newCategoryParent + 1, [data]);
        }

        this.arrayDivider(this.allCategoriesTemp);
        this.addNewCatSpinner = false;
      },
      (error) => {
        console.log(error);
        this.messageService.add({ key: 'MediaCategoryToast', severity: 'error', summary: 'خطا', detail: error.error.message, life: 7000 });
        this.addNewCatSpinner = false;
      }
    );
  }
  arrayInsertAt(index: number, elements: MediaCategory[]) {
    this.allCategoriesTemp.splice(index, 0, ...elements);
  }
  updateCategory(category: MediaCategory) {
    this.addEditCatSpinner = true;
    let parentId: string | null, parent: MediaCategory | null;
    if (this.editCategoryParent == '-1') {
      parentId = null;
      parent = null;
    } else {
      parent = this.allCategoriesTemp[+this.editCategoryParent];
      parentId = parent.categoryUUID;
    }
    this.uploadService.editCategory({ "categoryUUID": category.categoryUUID, "name": this.editCategoryName, "description": this.editCategoryDesc, "parentId": parentId }).subscribe(
      (data) => {
        if (category.parentId != data.parentId) {
          let index = this.allCategoriesTemp.findIndex(Element => Element.categoryUUID == category.categoryUUID);
          if (index > -1) {
            this.allCategoriesTemp.splice(index, 1);
          }
          if (!parent) {
            data.level = 0;
            // data.isSelected = false;
            // data.isEditOpen = false;
            this.currentPage = 0;
            this.allCategoriesTemp.unshift(data);
          } else {
            data.level = parent.level! + 1;
            // data.isSelected = false;
            // data.isEditOpen = false;
            this.currentPage = (+this.editCategoryParent) / this.tableRows;
            if ((+this.editCategoryParent + 1) % this.tableRows == 0) {
              this.currentPage++;
            }
            this.arrayInsertAt(+this.editCategoryParent + 1, [data]);
          }
        }
        data.isEdited = true;
        setTimeout(() => {
          data.isEdited = false;
        }, 7000);
        // this.allCategoriesTemp = this.allCategories;
        this.addEditCatSpinner = false;
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
            category.isRemoved = true;
            setTimeout(() => {
              let index = this.allCategoriesTemp.findIndex(Element => Element.categoryUUID == category.categoryUUID);
              if (index > -1) {
                this.allCategoriesTemp.splice(index, 1);
              }
              this.arrayDivider(this.allCategoriesTemp);
              category.isRemoved = false;
            }, 7000);
            this.messageService.add({ key: 'MediaCategoryToast', severity: 'success', summary: 'موفقیت آمیز', detail: `${category.name} با موفقیت حذف شد`, life: 7000 });
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

  // pagination functions 
  goPage(paginateItem: MediaCategoryPagination, pageNum: number = this.currentPage) {
    this.currentPage = pageNum;
    this.allCategoriesPaginated.forEach((Element) => {
      if (Element != paginateItem) {
        Element.isActive = false;
      }
    });
    paginateItem.isActive = true;
    this.allCategories = paginateItem.records;
  }

  arrayDivider(array: MediaCategory[]) {
    let i, j, counter = 0, temporary: MediaCategory[] = [];
    this.allCategoriesPaginated = [];
    for (i = 0, j = array.length; i < j; i += this.tableRows) {
      counter++;
      temporary = array.slice(i, i + this.tableRows);
      this.allCategoriesPaginated.push({
        pageNumber: counter,
        isActive: (counter == 1) ? true : false,
        records: temporary
      });
    }
    if (this.allCategoriesPaginated.length) {
      while (!this.allCategoriesPaginated[this.currentPage]) {
        this.currentPage--;
      }
      this.goPage(this.allCategoriesPaginated[this.currentPage]);
    }
    console.log(this.allCategoriesPaginated);
  }
}
