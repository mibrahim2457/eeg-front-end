import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import { NgForm} from '@angular/forms';
import {UserMetaModel} from '../../models/userMeta.model';
import {EegModel} from '../../models/eeg.model';
import { FormGroup, FormControl, } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Directive, forwardRef, Attribute, OnChanges, SimpleChanges, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../services/user_service/user.service';
import {AlertService} from '../../services/alert_service/alert.service';
import {FileItem, FileUploader} from 'ng2-file-upload';
import {SimpleGlobal} from 'ng2-simple-global';


@Component({
  selector: 'app-user-data-form',
  templateUrl: './user-data-form.component.html',
  styleUrls: ['./user-data-form.component.css']
})
export class UserDataFormComponent implements OnInit, AfterViewInit, OnDestroy {

  userMetaModel: UserMetaModel;
  selectedFile: any= {};
  eegSignal: EegModel;
  isFileSelected: boolean;
  loading = false;
  @Input() disabled: boolean;
  private currentUser: any;
  // const URL = '/api/';
  URL = this.simplGlobal['SERVER_HOST'] + '/eeg/';
  uploader: FileUploader;
  allowedMimeTypes: any[];
  private response: string;
  isValidFile= true;
  canEdit= false;

  constructor(private elRef: ElementRef,
              private router: Router,
              private userService: UserService,
              private alertService: AlertService,
              private simplGlobal: SimpleGlobal) {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.userMetaModel = this.currentUser.user.meta;
    this.allowedMimeTypes = ['text/csv'];
    let currToken = this.currentUser.token;
     if (currToken.startsWith('JWT') && currToken.indexOf(' ') === -1) {
          const jwt = 'JWT ';
          const token = currToken.substring(3, currToken.length);
          currToken = jwt.concat(token);
          this.currentUser.token = currToken;
    }
    console.log('New Token:   ' + this.currentUser.token);
    this.uploader = new FileUploader({url: 'http://localhost:3000/eeg/' + this.currentUser.user._id,
      disableMultipart: false,
      itemAlias: 'eegFile',
      headers: [{name: 'Authorization', value: this.currentUser.token}]});
    this.response = '';
    if (this.userMetaModel.age && this.userMetaModel.age && this.userMetaModel.age && this.userMetaModel.age) {
      this.canEdit = false;
    }else {
      this.canEdit = true;
    }
  }

  ngOnInit() {
    this.eegSignal = new EegModel(null, 256.0);
    this.isFileSelected = false;
    this.disabled = true;

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };

    this.uploader.onBuildItemForm = (item, form) => {
      form.append('sampleRate', this.eegSignal.sampleRate);
      return {item, form};
    };
  }

  ngAfterViewInit() {  }

  onFormSubmit(): boolean {
    this.updateCurrentUser();
     this.loading = true;
     this.simplGlobal['isLoading'] = true;
     this.userService.update(this.currentUser.user)
       .subscribe(
         data => {
           console.log('Data:   ' + data);
           //////Write here file upload code
           this.uploader.uploadAll();
           console.log('File Upoaded...!!');
          /*
           let currToken = this.currentUser.token;
           if (currToken.startsWith('JWT')) {
                const jwt = 'JWT ';
                const token = currToken.substring(3, currToken.length);
                currToken = jwt.concat(token);
                this.currentUser.token = currToken;
            }
            */
           // console.log("Token:   " + this.currentUser.token);
            // const headers = new Headers({ 'Authorization': currToken });

           this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
             // console.log('FileUpload:uploaded:', item, response);
             console.log('OnComplete...');
             if (response) {
               if (item.isUploaded) {
                 console.log('File Upload Successful...');
                 this.loading = false;
                 this.simplGlobal['isLoading'] = false;
                 if (status === 500) {
                   alert('Internal Server Error. Reconsider you signal file');
                   this.isValidFile = false;
                 } else if (item.isError) {
                   if (status === 406) {
                     this.isValidFile = false;
                   }
                 } else if (item.isSuccess) {
                   localStorage.setItem('results', response);
                   this.router.navigate(['/results']);
                 }
               }
             }
           };
           /////////////////////////////////
         },
         error => {
           console.log('Error Log:   ' + error);
           this.alertService.error(error);
           console.log(error);
           this.loading = false;
           this.simplGlobal['isLoading'] = false;
         });
     return false;
   }

   updateCurrentUser(): void {
    this.currentUser.user.meta = this.userMetaModel;
     // console.log("User:  " + this.currentUser.user.meta.gender);
    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
  }

  onFileSelect(event: any) {
    this.isValidFile = true;
    this.isFileSelected = true;
    const files = event.target.files;
    console.log(files);
    this.selectedFile = files[0];

  }
  onFormReset(): void {
    this.isFileSelected = false;
    this.selectedFile = {};
  }

  submit() {

  }

  ngOnDestroy(): void {
    // this.updateCurrentUser();
  }

  toggleEdit(): boolean {
    this.canEdit = !this.canEdit;
    return false;
  }

}
