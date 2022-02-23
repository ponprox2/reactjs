import React, { Component } from 'react';

class TaskItem extends Component {

  onUpdateStatus =()=>{
    this.props.onUpdateStatus(this.props.task.id);
  }
  onDelete =()=>{
    this.props.onDelete(this.props.task.id);
  }
  onUpdate =()=>{
    this.props.onUpdate(this.props.task.id);
  }
  render() {
      var {task, index} =this.props;
        
    return (
        <tr>
        <td>{index}</td>
        <td>{task.name}</td>
        <td className="text-center">
          <span className={task.status === true ? 'progress progress-bar bg-danger' : 'progress progress-bar bg-info' } onClick={this.onUpdateStatus}>
           {task.status === true ? 'kích hoạt' : 'ẩn'}
          </span>
        </td>
        <td className="text-center">
          <button type="button" className="btn btn-warning" onClick={this.onUpdate}>
            <span className="fa fa-pencil " />Sửa
          </button>
          &nbsp;
          <button type="button" className="btn btn-danger" onClick={this.onDelete}>
            <span className="fa fa-trash " />Xóa
          </button>
        </td>
      </tr>
    );
  }
}

export default TaskItem;
