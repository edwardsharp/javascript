import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {TaskService} from "../services/task.service";
import {LinkService} from "../services/link.service";
import {Task} from "../models/task";
import {Link} from "../models/link";

import "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/ext/dhtmlxgantt_marker";
import "dhtmlx-gantt/codebase/ext/dhtmlxgantt_undo";
import "dhtmlx-gantt/codebase/ext/dhtmlxgantt_keyboard_navigation";

import {} from "@types/dhtmlxgantt";

@Component({
	selector: "gantt",
	styles: [`:host{
			display: block;
			height: 100vh;
			position: relative;
			width: 100%;
		}
		header{
			height: 64px;
			width: 100%;
			display: flex;
			align-items: center;
		}	
		header input{
			margin-left: 32px;
		}
		header label{
			margin-left: 5px;
			margin-right: 1em;
		}
		.app-gantt{
			height: 100vh;
			height: calc(100vh - 64px); 
			width: 100%;
		}
		.status_line{
			background-color: #0ca30a;
		}
		
	`],
	providers: [TaskService, LinkService],
	template: `
		<header>
		<input type="radio" id="scale0" name="scale" value="0" /><label for="scale0">Hour</label>
		<input type="radio" id="scale1" name="scale" value="1" /><label for="scale1">Week</label>
		<input type="radio" id="scale2" name="scale" value="2" /><label for="scale2">Year</label>
		<input type="radio" id="scale3" name="scale" value="3" checked /><label for="scale3">Work Hours</label>
		
		<input value="Undo" type="button" onclick='gantt.undo()' style='margin:20px;'>
		<input value="Redo" type="button" onclick='gantt.redo()' style='margin:20px;'>
		</header>
		<div #gantt_here class='app-gantt'></div>`,
})
export class GanttComponent implements OnInit {
	@ViewChild("gantt_here") ganttContainer: ElementRef;

	constructor(private taskService: TaskService, private linkService: LinkService){}

	ngOnInit(){
		gantt.config.xml_date = "%Y-%m-%d %H:%i";


		//today marker
		var date_to_str = gantt.date.date_to_str(gantt.config.task_date);
		var todayMarker = gantt.addMarker({ 
		    start_date: new Date(), 
		    css: "today", 
		    title:date_to_str( new Date())
		});
		setInterval(function(){
		    var today = gantt.getMarker(todayMarker);
		    today.start_date = new Date();
		    today.title = date_to_str(today.start_date);
		    gantt.updateMarker(todayMarker);
		}, 1000*60);

		gantt.config.scale_unit = "month";
		gantt.config.date_scale = "%F, %Y";
		gantt.config.scale_height = 50;
		gantt.config.subscales = [
			{unit:"day", step:1, date:"%j, %D" }
		];

		gantt.templates.rightside_text = function(start, end, task){
			if(task.type == gantt.config.types.milestone){
				return task.text;
			}
			return "";
		};

		gantt.templates.progress_text = function(start, end, task){
			return "<span style='text-align:left;'>"+Math.round(task.progress*100)+ "% </span>";
		};

		gantt.locale.labels['time_enable_button'] = 'Schedule';
		gantt.locale.labels['time_disable_button'] = 'Unschedule';
		gantt.config.lightbox.sections = [
			{name: "description", height: 70, map_to: "text", type: "textarea", focus: true},
			{name: "time", map_to: "auto", button: true,  type: "duration_optional"}
		];

		gantt.config.lightbox.milestone_sections = [
			{name: "description", height: 70, map_to: "text", type: "textarea", focus: true},
			{name: "time", map_to: "auto", button: true, single_date:true, type: "duration_optional"}
		];

		gantt.attachEvent("onLightboxSave", function(id, task, is_new){
			task.unscheduled = !task.start_date;
			return true;
		});


		function setScaleConfig(value){
			switch (value) {
				case "0":
					gantt.config.work_time = false;
					gantt.config.scale_unit = "hour";
					gantt.config.step = 1;
					gantt.config.date_scale = "%g";
					// gantt.config.min_column_width = 20;
					// gantt.config.duration_unit = "minute";
					// gantt.config.duration_step = 60;
					gantt.config.scale_height = 50;
					gantt.config.subscales = [
						{unit:"day", step:1, date : "%j %F, %l"}
					];
					gantt.config.min_column_width = 25;

					break;
				case "1":
					gantt.config.work_time = false;
					var weekScaleTemplate = function(date){
						var dateToStr = gantt.date.date_to_str("%d %M");
						var endDate = gantt.date.add(gantt.date.add(date, 1, "week"), -1, "day");
						return dateToStr(date) + " - " + dateToStr(endDate);
					};

					gantt.config.scale_unit = "week";
					gantt.config.step = 1;
					gantt.templates.date_scale = weekScaleTemplate;
					gantt.config.subscales = [
						{unit:"day", step:1, date:"%j, %D" }
					];
					gantt.config.min_column_width = 50;
					gantt.config.scale_height = 50;
					break;
				case "2":
					gantt.config.work_time = false;
					gantt.config.scale_unit = "year";
					gantt.config.step = 1;
					gantt.config.date_scale = "%Y";
					gantt.config.min_column_width = 50;

					gantt.config.scale_height = 50;
					gantt.templates.date_scale = null;

					
					gantt.config.subscales = [
						{unit:"month", step:1, date:"%M" }
					];
					break;
				case "3":
					//work work work time
					gantt.config.work_time = true;

					gantt.config.scale_unit = "day";
					gantt.config.date_scale = "%l, %F %d";
					gantt.config.min_column_width = 33;
					gantt.config.duration_unit = "hour";
					gantt.config.scale_height = 20*3;

					gantt.templates.task_cell_class = function(task, date){
						if(!gantt.isWorkTime(date, 'hour')){
							return ("no_work_hour");
						}

						return "";
					};

					var weekScaleTemplate = function(date){
						var dateToStr = gantt.date.date_to_str("%d %M");
						var weekNum = gantt.date.date_to_str("(week %W)");
						var endDate = gantt.date.add(gantt.date.add(date, 1, "week"), -1, "day");
						return dateToStr(date) + " - " + dateToStr(endDate) + " " + weekNum(date);
					};

					gantt.config.subscales = [
						{unit:"week", step:1, template:weekScaleTemplate},
						{unit:"hour", step:3, date:"%g%a"}

					];

					gantt.setWorkTime({hours : [8,18]});//global working hours
					// gantt.setWorkTime({day : 2, hours : false});// make Tuesdays day-off
					// gantt.setWorkTime({day : 5, hours : [8,12]});//Fridays and Saturdays are short days
					// gantt.setWorkTime({day : 6, hours : [8,12]});//Saturdays are also work days
					// gantt.setWorkTime({date : new Date(2013, 2, 31)});//specific working day

					// var hints = [
					// 	"Global working time is: <b>8:00-17:00</b>",
					// 	"<b>Tuesdays</b> are not working days",
					// 	"<b>Saturdays</b> are working days",
					// 	"<b>Saturdays</b> and <b>Fridays</b> are short days",
					// 	"<b>Sunday, 31th March</b> is working day"
					// ];
					// for(var i=0; i < hints.length; i++){
					// 	setTimeout(
					// 		(function(i){
					// 			return function(){
					// 				gantt.message(hints[i]);
					// 			} })(i)
					// 		, (i+1)*600);
					// }

					gantt['ignore_time'] = function(date){
						if(date.getHours() < 8 || date.getHours() > 16){
							return true;
						}
						return false;
					};
				break;
			}
		}

		setTimeout(()=> setScaleConfig('3'), 100);
		var func = function(e) {
			e = e || window.event;
			var el = e.target || e.srcElement;
			var value = el.value;
			setScaleConfig(value);
			gantt.render();
		};

		var els = document.getElementsByName("scale");
		for (var i = 0; i < els.length; i++) {
			els[i].onclick = func;
		}




		//selected col highlight
		var selected_column = null;

		gantt.attachEvent("onScaleClick", function (e, date) {
			selected_column = date;
			var pos = gantt.getScrollState();
			gantt.render();
			gantt.scrollTo(pos.x, pos.y);
		});

		function is_selected_column (column_date){
			if(selected_column && column_date.valueOf() == selected_column.valueOf()){
				return true;
			}
			return false;
		}
		gantt.templates.scale_cell_class = function (date) {
			if(is_selected_column(date))
				return "highlighted-column";
		};
		gantt.templates.task_cell_class = function (item, date) {
			if(is_selected_column(date))
				return "highlighted-column";
		};



		//constraintz
		gantt.templates.task_class = function(st,end,item){
			return gantt.getChildren(item.id).length ? "gantt_project" : "";
		};
		// gantt.init("gantt_here");

		function limitMoveLeft(task, limit){
			var dur = task.end_date - task.start_date;
			task.end_date = new Date(limit.end_date);
			task.start_date = new Date(+task.end_date - dur);
		}
		function limitMoveRight(task, limit){
			var dur = task.end_date - task.start_date;
			task.start_date = new Date(limit.start_date);
			task.end_date = new Date(+task.start_date + dur);
		}

		function limitResizeLeft(task, limit){
			task.end_date = new Date(limit.end_date);
		}
		function limitResizeRight(task, limit){
			task.start_date = new Date(limit.start_date)
		}

		gantt.attachEvent("onTaskDrag", function(id, mode, task, original, e){
			var parent = task.parent ? gantt.getTask(task.parent) : null,
				children = gantt.getChildren(id),
				modes = gantt.config.drag_mode;

			var limitLeft = null,
				limitRight = null;

			if(!(mode == modes.move || mode == modes.resize)) return;

			if(mode == modes.move){
				limitLeft = limitMoveLeft;
				limitRight = limitMoveRight;
			}else if(mode == modes.resize){
				limitLeft = limitResizeLeft;
				limitRight = limitResizeRight;
			}

			//check parents constraints
			if(parent && +parent.end_date < +task.end_date){
				limitLeft(task, parent);
			}
			if(parent && +parent.start_date > +task.start_date){
				limitRight(task, parent);
			}

			//check children constraints
			for(var i=0; i < children.length; i++){
				var child = gantt.getTask(children[i]);
				if(+task.end_date < +child.end_date){
					limitLeft(task, child);
				}else if(+task.start_date > +child.start_date){
					limitRight(task, child)
				}
			}


		});





		// this should show the task name outside of the task container if the current 
		// sizeof the container is too small for the task name! ...cool!
		(function(){
			gantt.config['font_width_ratio'] = 14;
			gantt.templates.leftside_text = function leftSideTextTemplate(start, end, task) {
				if (getTaskFitValue(task) === "left") { return task.text; }
				return "";
			};
			gantt.templates.rightside_text = function rightSideTextTemplate(start, end, task) {
				if (getTaskFitValue(task) === "right") { return task.text; }
				return "";
			};
			gantt.templates.task_text = function taskTextTemplate(start, end, task){
				if (getTaskFitValue(task) === "center") { return task.text; }
				return "";
			};

			function getTaskFitValue(task){
				var taskStartPos: any;
				var taskEndPos: any;
				taskStartPos = gantt.posFromDate(task.start_date);
				taskEndPos = gantt.posFromDate(task.end_date);

				var width = taskEndPos - taskStartPos;
				var textWidth = (task.text || "").length * gantt.config['font_width_ratio'];

				if(width < textWidth){
					var ganttLastDate:any, ganttEndPos:any;
					ganttLastDate = gantt.getState().max_date;
					ganttEndPos = gantt.posFromDate(ganttLastDate);
					if(ganttEndPos - taskEndPos < textWidth){
						return "left"
					}else { return "right" }
				}else { return "center"; }
			}
		})();



		//   O K A Y   G O ! !
		gantt.init(this.ganttContainer.nativeElement);

		gantt.attachEvent("onAfterTaskAdd", (id, item) => {
			this.taskService.insert(this.serializeTask(item, true))
				.then((response)=> {
					if (response.id != id) {
						gantt.changeTaskId(id, response.id);
					}
				});
		});

		gantt.attachEvent("onAfterTaskUpdate", (id, item) => {
			this.taskService.update(this.serializeTask(item));
		});

		gantt.attachEvent("onAfterTaskDelete", (id) => {
			this.taskService.remove(id);
		});

		gantt.attachEvent("onAfterLinkAdd", (id, item) => {
			this.linkService.insert(this.serializeLink(item, true))
				.then((response) => {
					if(response.id != id){
						gantt.changeLinkId(id, response.id);
					}
				});
		});

		gantt.attachEvent("onAfterLinkUpdate", (id, item) => {
			this.linkService.update(this.serializeLink(item));
		});

		gantt.attachEvent("onAfterLinkDelete", (id) => {
			this.linkService.remove(id);
		});

		Promise.all([this.taskService.get(), this.linkService.get()])
			.then(([data, links]) => {
				console.log('gonna gantt.parse data,links:',data,links);
				gantt.parse({data, links});
			});
	}

	private serializeTask(data: any, insert: boolean = false): Task {
		return this.serializeItem(data, insert) as Task;
	}

	private serializeLink(data: any, insert: boolean = false): Link {
		return this.serializeItem(data, insert) as Link;
	}

	private serializeItem(data: any, insert: boolean): any{
		var result = {};

		for (let i in data) {
			if (i.charAt(0) == "$" || i.charAt(0) == "_") continue;
			if(insert && i == "id") continue;
			if (data[i] instanceof Date) {
				result[i] = gantt.templates.xml_format(data[i]);
			}
			else {
				result[i] = data[i];
			}
		}

		return result;
	}
}
