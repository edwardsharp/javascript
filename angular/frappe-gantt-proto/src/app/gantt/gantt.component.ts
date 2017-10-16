import { Component, OnInit } from '@angular/core';

import * as moment from "moment";

declare var Gantt:any;

@Component({
  selector: 'app-gantt',
  templateUrl: './gantt.component.html',
  styleUrls: ['./gantt.component.css']
})
export class GanttComponent implements OnInit {

	tasks: Array<any>;
	gantt: any;
	config: any;

  constructor() { }

  ngOnInit() {

  	this.config = {
	    // can be a function that returns html
	    // or a simple html string
	    custom_popup_html: function(task) {
	      // the task object will contain the updated
	      // dates and progress value
	      const end_date = task._end.format('MMM D');
	      return `
	        <div class="details-container">
	          <h5>${task.name}</h5>
	          <p>Expected to finish by ${end_date}</p>
	          <p>${task.progress}% completed!</p>
	        </div>
	      `;
	    }
	  }

  	this.tasks = [
		  {
		    id: 'Task 1',
		    name: 'Task 1',
		    start: '2017-10-28',
		    end: '2017-10-31',
		    progress: 10
		  },
		  {
		    id: 'Task 2',
		    name: 'Task 2',
		    start: '2017-10-28',
		    end: '2017-10-29',
		    progress: 10,
		    dependencies: 'Task 1'
		  },
		  {
		    id: 'Task 3',
		    name: 'Task 3',
		    start: '2017-10-30',
		    end: '2017-10-31',
		    progress: 0,
		    dependencies: 'Task 1'
		  },
  		{
		    id: 'Task A',
		    name: 'Task A',
		    start: '2017-11-01',
		    end: '2017-11-04',
		    progress: 0
		  },
		  {
		    id: 'Task B',
		    name: 'Task B',
		    start: '2017-11-01',
		    end: '2017-11-02',
		    progress: 0,
		    dependencies: 'Task A'
		  },
		  {
		    id: 'Task C',
		    name: 'Task C',
		    start: '2017-11-03',
		    end: '2017-11-04',
		    progress: 0,
		    dependencies: 'Task A'
		  }
		];

		this.gantt = new Gantt('#gantt', this.tasks, this.config);
  }

  addRandomTask(): void{
  	const rand = (Math.random() * 28);
  	this.tasks = this.tasks.concat([
		  {
		  	id: this.guid(),
		    name: `Task ${Math.floor(Math.random() * 100000).toString(36)}`,
		    start: `2017-11-${rand.toFixed()}`,
		    end: `2017-11-${rand + 2}`,
		    progress: (Math.random() * 99)
		  }]);
  	this.refresh();
  }
  refresh(): void {
  	this.gantt.refresh(this.tasks);
  }

  changeViewMode(mode:string): void {
  	this.gantt.change_view_mode(mode);
  }

  private guid(): string {
	  function s4() {
	    return Math.floor((1 + Math.random()) * 0x10000)
	      .toString(16)
	      .substring(1);
	  }
	  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
	    s4() + '-' + s4() + s4() + s4();
	}

}
