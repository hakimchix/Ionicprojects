import { Component, OnInit } from '@angular/core';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { File } from '@ionic-native/file/ngx/index';
import * as firebase from 'firebase';
import { FilePath } from '@ionic-native/file-path/ngx';
import { AngularFireStorage } from "@angular/fire/storage";
import { map, finalize } from "rxjs/operators";
import { Observable } from "rxjs";
import { TypeofExpr } from '@angular/compiler';

@Component({
  selector: 'app-docwallet',
  templateUrl: './docwallet.page.html',
  styleUrls: ['./docwallet.page.scss'],
})
export class DocwalletPage implements OnInit {
  filenametosave:string
  title = "cloudsSorage";
  selectedFile:any= {loading:false,totalbyte:0,loadbyte:0.0
  } ;
  fb;
  filePath
  file
  walet=[]
  downloadURL: Observable<string>;
  index
  public showparent:boolean=true
  constructor(private fileChooser: FileChooser, private storage: AngularFireStorage ) { 
   
  }

  ngOnInit() { 
this.loadwallet('wallet')

  }
  loadwallet(ref){
    
    this.showparent= ref.split('/').length>1 ?true:false
    this.walet=[]
    const task = this.storage.storage.ref(ref)
    task.list().then(v=>v.prefixes.forEach(a=>this.walet.push ({name:a.name,path:a.fullPath,type:'folder'})))
   
    let listRef = this.storage.ref(ref);
    this.storage.ref('wallet').child('wallet/bplan').listAll().subscribe(a=> console.log(a))
  listRef.listAll().subscribe(resut=>(resut.items.forEach(a=>{
    a.getDownloadURL().then((b)=>{
      this.walet.push ({name:a.name,path:a.fullPath,urlwalet:b,type:'file'})
    });
    
    
  })
  )
  )
  }
  onFileSelected(event) {
  var n = this.filenametosave +'_'+Date.now()
   this.file = event.target.files[0];
     this.filePath = `wallet/${n}`;

  }

  onSelected(event) {
   
    this.filenametosave=event.target.value
      
  
    }
    openfolder(index){
      this.showparent=true
      
      this.loadwallet('wallet/'+this.walet[index].name)
    }
    async checkparrent(){
      var x=(  this.walet.filter(f=>  f.type==='file').pop().path.split('/'))

return (x.length>2)
    }
    indexselected(index){
this.index=index
    }
removefile(index){
 if(index>-1){
  this.storage.ref(this.walet[index].path).delete().toPromise().then(()=>this.loadwallet('wallet'))
}

}
  uploadfile(){   
    
    var n =this.filenametosave ? this.filenametosave + '/'+ this.file.name.split('.')[0]+'_'+new Date(Date.now()):  this.file.name.split('.')[0]+'_'+new Date(Date.now())
    
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(`wallet/${n}`, this.file);
    this.selectedFile.loading=true
    task
     .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb = url;
            }
            
          });
        })
      )
      .subscribe(url => {
        if (url) {this.selectedFile.loading=true
         this.selectedFile.loadbyte=url.bytesTransferred/url.totalBytes;
         this.selectedFile.totalbyte=url.totalBytes
         var na=url.ref.fullPath.split('/')
         na.pop()
         console.log('url upload'+na)
        }
      });
      
      task
      .then(()=> {this.loadwallet('wallet');this.filenametosave=''}).catch(e=>alert('upload not comleted'+e));

  }
}