import React, { Component } from 'react';
import './App.css';
import TaskForm from './component/TaskForm';
import Control from './component/Control';
import TaskList from './component/TaskList';
class App extends Component {

  constructor(props) {
    super(props);
    this.state= {
      tasks: [],
      isDisplayForm : false,
      taskEditing : null,
      filter:{
        name:'',
        status:-1
      },
      keyword:''
    }
  }

  componentDidMount()
  {
    if(localStorage && localStorage.getItem('tasks'))
    {
      var tasks = JSON.parse(localStorage.getItem('tasks'))
      this.setState({
        tasks:tasks
      })
    }
  }
  // onGendata =()=>{
  //   var tasks = [
  //     {
  //       id:this.genID(),
  //       name: 'học lập trình',
  //       status:true
  //     },
  //     {
  //       id: this.genID(),
  //       name: 'đi bơi',
  //       status:true
  //     },
  //     {
  //       id: this.genID(),
  //       name: 'ngủ',
  //       status:false
  //     }
  //   ];
  //   localStorage.setItem('tasks', JSON.stringify(tasks));
  // }
  s4(){
    var min = 1;
   var max = 1000;
   var rand = Math.floor(min + (Math.random() * (max-min)));
    return rand;
  }
  genID(){
    return this.s4() + this.s4() +this.s4()+this.s4() ;
  }

  onForm =() =>{
    if(this.state.isDisplayForm && this.state.taksEditing !== null)
    {
      this.setState({
        isDisplayForm : true,
        taksEditing: null
      });
    }
    else{
      this.setState({
        isDisplayForm : !this.state.isDisplayForm,
        taksEditing: null
      });
    }
  }
  onCloseForm =()=>{
    this.setState({
      isDisplayForm: false
    })
  }
  onSubmit =(data)=>{
   
   var {tasks} =this.state;
   if(data.id ===""){
    data.id=this.genID();
    tasks.push(data);
   }
   else{
     var index= this.findIndex(data.id)
     tasks[index] =data;
   }
   this.setState({
     tasks:tasks,
     taksEditing:null
   })
   localStorage.setItem('tasks', JSON.stringify(tasks));
  }
   
  onUpdateStatus=(id)=>{
  var {tasks} =this.state;
   var index = this.findIndex(id);
   if(index !== -1)
   {
    tasks[index].status =! tasks[index].status;
    this.setState({
      tasks:tasks
    })
    localStorage.setItem('tasks', JSON.stringify(tasks));
   }
  
  }
  onDelete =(id)=>{
    var {tasks} =this.state;
    var index = this.findIndex(id);
    if(index !== -1)
    {
     tasks.splice(index,1);
     this.setState({
       tasks:tasks
     })
     localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
    this.onCloseForm();
  }
  findIndex = (id) =>{
    var {tasks} =this.state;
    var res=-1;
    tasks.forEach((task,index) =>{
        if(task.id === id){
          res = index;
        }
       
    });
    return res;
  }
  onShowForm =()=>{
    this.setState({
      isDisplayForm:true
    })
  }
  onUpdate =(id)=>{
    var {tasks} =this.state;
    var index = this.findIndex(id);
    var taksEditing = tasks[index];
    this.setState({
      taksEditing:taksEditing
    })
    this.onShowForm();
    }
    onFilter =(filterName,filterStatus)=>{
      
      filterStatus =parseInt(filterStatus,10);
      this.setState({
        filter :{
          name:filterName,
          status:filterStatus
        }
      })
    }
    onSearch =(keyword)=>{
      this.setState({
        keyword:keyword
      })
    }
  render() {
    var {tasks, isDisplayForm, taksEditing, filter,keyword} = this.state;
    if(filter)
    {
      if(filter.name){
        tasks = tasks.filter((task)=>{
          return task.name.toLowerCase().indexOf(filter.name ) !== -1;
        })
      }
          tasks = tasks.filter((task)=>{
            if(filter.status === -1){
              return task;
            }else{
               return task.status === (filter.status === 1 ?true : false)
            }
          })
    }
    if(keyword){
      tasks = tasks.filter((task)=>{
        return task.name.toLowerCase().indexOf(keyword) !== -1;
      })
    }
    var elmtaskform  = isDisplayForm === true ? <TaskForm onSubmit={this.onSubmit} onCloseForm={this.onCloseForm}
        task={taksEditing}
    /> :'';
    return (
      <div className="container">
        <div >
          <h1 className="text-center ">Quản Lý Công Việc</h1>
          <hr />
        </div>
        <div class="row ">
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 mt-15'">
            {elmtaskform}
          </div>
          <div className={isDisplayForm === true ?'col-xs-8 col-sm-8 col-md-8 col-lg-8 mt-15' :'col-xs-12 col-sm-12 col-md-12 col-lg-12 mt-15'} >
            <button type="button" className="btn btn-primary text-center "onClick ={this.onForm}>
              <span className="fa fa-plus "   />Thêm Công Việc
            </button>
            {/* <button type="button" className="btn btn-primary text-center ml-5" onClick={this.onGendata} >Gen Data</button> */}
            <Control onSearch ={this.onSearch}/>
            <div className="row ">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <TaskList  tasks={ tasks} onUpdateStatus ={this.onUpdateStatus} onDelete ={this.onDelete} onUpdate ={this.onUpdate}
                onFilter={this.onFilter}
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default App;
