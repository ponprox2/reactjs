import React, { Component } from 'react';

class TaskForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id:'',
      name:'',
      status: false
    }
  }

  onCloseForm = () => {
    this.props.onCloseForm();
  }
  
  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    if(name=== 'status'){
      value=target.value ==='true'? true:false;
    }
    this.setState({
      [name]: value
    })
  }
  onSubmit =(event)=>{
    event.preventDefault();
    this.props.onSubmit(this.state);
    this.onClear();
    this.onCloseForm();
  }
  onClear=()=>{
    this.setState({
      name:'',
      status:false
    })
  }
  componentDidMount(){
    if(this.props.task){
      this.setState({
        id: this.props.task.id,
        name:this.props.task.name,
        status:this.props.task.status
      })
    }
  }
  UNSAFE_componentWillReceiveProps(nextProps){
    if(nextProps && nextProps.task){
      this.setState( {
        id: nextProps.task.id,
        name:nextProps.task.name,
        status:nextProps.task.status
      })
    }
    else if(!nextProps.task)
    {
      this.setState( {
        id: '',
        name:'',
        status:false
      })
    }
  }
  render() {
    var {id } = this.state;
    return (

      <div className="card border-warning">
        <div className="card-heading">
          <h4 className="card-title mt-15 mlr-15" >{id !==""? 'cập nhập công việc' : 'thêm công việc'}
            <span onClick={this.onCloseForm}>
              <i class="fa fa-times-circle text-righ " aria-hidden="true"></i>
            </span>
          </h4>
        </div>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
          <div class="form-group">
            <label >tên:</label>
            <input type="text"name="name" class="form-control" value={this.state.name} onChange={this.onChange} ></input>
          </div>
          <div class="form-group" >
            <label >trạng thái</label>
            <select class="form-control" name="status" value={this.state.status}  onChange={this.onChange} >
              <option value={false}>ẩn </option>
              <option value={true}>kích hoạt</option>
            </select>
            <br />
            <div class="text-center">
              <button type="submit" className="btn btn-warning">Lưu Lại</button>&nbsp;
              <button type="button" className="btn btn-danger" onClick={this.onClear}>Hủy Bỏ</button>
            </div>
          </div>
          </form>
        </div>
        
      </div>
    );
  }
}

export default TaskForm;
