import { Component } from '@angular/core';
import { moveItemInArray, transferArrayItem, CdkDragDrop } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { AddtaskComponent } from './addtask/addtask.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'KanbanBoard';

  value:string='';

  task:string='';

  currentTask:string='';

  indexOfList:number=0;

  nextIndex:number;

  mb:boolean=true;
  mf:boolean=true;
  dl:boolean=false;

  backlog=[];
  todo=[];
  ongoing=[];
  done=[];


  constructor(public dialog: MatDialog){
    
  }
  doubleClick(type,event)
  {
    console.log(type+" "+event.currentTarget.id);
    let na=this.getValue(type,event.currentTarget.id);
    console.log(na);
    
    this.editTodo(event.currentTarget.id,na,type)

    
  }

  getValue(type,ind)
  {
    console.log(this.todo);
    
    switch(type)
    {
      case 0:
        return this.backlog[ind];
      case 1:
        return this.todo[parseInt(ind)];       
      case 2:
        return this.ongoing[ind];      
      case 3:
        return this.done[ind];        
      default:
        return 'error'; 
    }
  }

  receiveMessage($event) {
    this.openDialog();
  }

  editTodo(arrIndex,tname,ttype): void {
    const dialogRef = this.dialog.open(AddtaskComponent, {
      width: '400px',
      data:{
        
          name:tname,
          type:ttype
        
      }
      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      this.updateTask(ttype,arrIndex,result);
      
      
    });
  }

  updateTask(type,ind,result)
  {
    switch(type)
    {
      case 0:
        return this.backlog[parseInt(ind)]=result.name;
      case 1:
        return this.todo[parseInt(ind)]=result.name;       
      case 2:
        return this.ongoing[parseInt(ind)]=result.name;         
      case 3:
        return this.done[parseInt(ind)]=result.name;        
      default:
        return 'error'; 
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddtaskComponent, {
      width: '400px',
      data:{
        
        name:"",
        type:""
      
    }
      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      this.addTask(result);
      
      
    });
  }

  opench()
  {
    console.log("Sdsdsdsds");
    
  }



  getArrayElement(arr,index)
  {
    if(arr == 0 )
    {
      
      return this.backlog.splice(index, 1)+"";
    }
      
    if(arr == 1 )
    {
      return this.todo.splice(index, 1)+"";
    }
    if(arr == 2 )
    {
      return this.ongoing.splice(index, 1)+"";
    }
    if(arr == 3 )
    {
      return this.done.splice(index, 1)+"";
    }
    
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log(event);
    
    console.log(event.previousContainer.id);
    console.log(event.container.id);

    

    let prev=event.previousContainer.id.split('-')[3];
    let current=event.container.id.split('-')[3];
    

    switch(current)
    {
      case '0':
        this.backlog.splice(event.currentIndex, 0,this.getArrayElement(prev,event.previousIndex));
        break;
      case '1':
        this.todo.splice(event.currentIndex, 0,this.getArrayElement(prev,event.previousIndex));
        break;
      case '2':
        this.ongoing.splice(event.currentIndex, 0,this.getArrayElement(prev,event.previousIndex));
        break;
      case '3':
        this.done.splice(event.currentIndex, 0,this.getArrayElement(prev,event.previousIndex));
        break;
      default:
        console.log("error");   
    }

    


    

    
    // if (event.previousContainer === event.container) {
    //   moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    // } else {
    //   transferArrayItem(event.previousContainer.data,
    //                     event.container.data,
    //                     event.previousIndex,
    //                     event.currentIndex);
    // }
  }



  delIndex:number=0;
  

  
  

  addTask(task)
  {
    switch(task.type)
    {
      case 1:
        this.backlog.push(task.name);
        break;
      case 2:
        this.todo.push(task.name);
        break;
      case 3:
        this.ongoing.push(task.name);
        break;
      case 4:
        this.done.push(task.name);
        break;
      default:
        console.log("error");

        
      
    }
    
    
  }
}
