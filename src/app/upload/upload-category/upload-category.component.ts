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
  // tableRows: number = 8;
  // currentPage: number = 0;
  // tableRowsTotal!: number;
  // categories: MediaCategory[] = [];
  // allCategories: MediaCategory[] = [];
  // allCategoriesPaginated: MediaCategoryPagination[] = [];
  // allCategoriesTemp: MediaCategory[] = [];
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
          this.allCategoriesFlatten = this.flat(this.allCategories);
          this.state.querySet = this.allCategoriesFlatten;
          this.buildTable();
        }
      },
      (error) => { }
    );
  }

  closeEditRow(category: MediaCategory) {
    this.editCategoryName = category.name;
    this.editCategoryDesc = category.description;
    this.editCategoryParent = this.allCategoriesFlatten.findIndex(Element => category.parentId == Element.categoryUUID) + '';
    category.isEditOpen = !category.isEditOpen;
    this.state.querySet.map((x: MediaCategory) => {
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
    let temp = this.allCategoriesFlatten.filter((res) => {
      return res.name.concat(' ' + res.description).toLocaleLowerCase().match(this.tableSearch.trim().toLocaleLowerCase());
    });
    this.state.querySet = temp;
    this.buildTable();
    
  }
  addNewCategory() {
    this.addNewCatSpinner = true;
    let parentId: string | null, parent: MediaCategory | null;
    if (this.newCategoryParent == '-1') {
      parentId = null;
      parent = null;
    } else {
      parent = this.allCategoriesFlatten[+this.newCategoryParent];
      parentId = parent.categoryUUID;
    }
    this.uploadService.addCategory({ "categoryUUID": null, "name": this.newCategoryName, "description": this.newCategoryDesc, "parentId": parentId }).subscribe(
      (data) => {
        this.messageService.add({ key: 'MediaCategoryToast', severity: 'success', summary: 'موفقیت آمیز', detail: `${data.name} با موفقیت حذف شد`, life: 7000 });
        data.isAdded = true;
        setTimeout(() => {
          data.isAdded = false;
        }, 7000);
        if (!parent) {
          data.level = 0;
          // data.isSelected = false;
          // data.isEditOpen = false;
          this.allCategoriesFlatten.unshift(data);
        } else {
          data.level = parent.level! + 1;
          // data.isSelected = false;
          // data.isEditOpen = false;
          // if ((+this.newCategoryParent + 1 ) % this.tableRows == 0) {
          //   this.currentPage++;
          // }
          this.arrayInsertAt(+this.newCategoryParent + 1, [data]);
        }
        this.addNewCatSpinner = false;
        this.state.page = Math.ceil(+this.newCategoryParent / this.state.rows);
        this.buildTable();
      },
      (error) => {
        console.log(error);
        this.messageService.add({ key: 'MediaCategoryToast', severity: 'error', summary: 'خطا', detail: error.error.message, life: 7000 });
        this.addNewCatSpinner = false;
      }
    );
  }
  arrayInsertAt(index: number, elements: MediaCategory[]) {
     this.allCategoriesFlatten.splice(index, 0, ...elements);
  }
  updateCategory(category: MediaCategory) {
    // this.addEditCatSpinner = true;
    // let parentId: string | null, parent: MediaCategory | null;
    // if (this.editCategoryParent == '-1') {
    //   parentId = null;
    //   parent = null;
    // } else {
    //   parent = this.allCategoriesTemp[+this.editCategoryParent];
    //   parentId = parent.categoryUUID;
    // }
    // this.uploadService.editCategory({ "categoryUUID": category.categoryUUID, "name": this.editCategoryName, "description": this.editCategoryDesc, "parentId": parentId }).subscribe(
    //   (data) => {
    //     if (category.parentId != data.parentId) {
    //       let index = this.allCategoriesTemp.findIndex(Element => Element.categoryUUID == category.categoryUUID);
    //       if (index > -1) {
    //         this.allCategoriesTemp.splice(index, 1);
    //       }
    //       if (!parent) {
    //         data.level = 0;
    //         // data.isSelected = false;
    //         // data.isEditOpen = false;
    //         this.currentPage = 0;
    //         this.allCategoriesTemp.unshift(data);
    //       } else {
    //         data.level = parent.level! + 1;
    //         // data.isSelected = false;
    //         // data.isEditOpen = false;
    //         this.currentPage = (+this.editCategoryParent) / this.tableRows;
    //         if ((+this.editCategoryParent + 1) % this.tableRows == 0) {
    //           this.currentPage++;
    //         }
    //         this.arrayInsertAt(+this.editCategoryParent + 1, [data]);
    //       }
    //     }
    //     data.isEdited = true;
    //     setTimeout(() => {
    //       data.isEdited = false;
    //     }, 7000);
    //     // this.allCategoriesTemp = this.allCategories;
    //     this.addEditCatSpinner = false;
    //   },
    //   (error) => {
    //     console.log(error);
    //     this.messageService.add({ key: 'MediaCategoryToast', severity: 'error', summary: 'خطا', detail: error.error.message, life: 7000 });
    //     this.addEditCatSpinner = false;
    //   }
    // );
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
              let index = this.allCategoriesFlatten.findIndex(Element => Element.categoryUUID == category.categoryUUID);
              if (index > -1) {
                this.allCategoriesFlatten.splice(index, 1);
                this.buildTable();
              }
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

}
