import {Injectable} from "@angular/core";
import {Task} from "../models/task";
import {Http} from "@angular/http";
import {ExtractData, HandleError} from "./service-helper";

import 'rxjs/add/operator/toPromise';

declare var PouchDB:any;

@Injectable()
export class TaskService {
	tasks: Array<Task>;
	db: any;

	constructor(private http: Http) {
		this.initDb();
	}

	initDb(): void{
  	if(navigator.vendor && navigator.vendor.indexOf('Apple') > -1){
  		console.log("LOADING FRUITDONW DB!");
      this.db = new PouchDB('tasks', {adapter: 'fruitdown'});
    }else{
      this.db = new PouchDB('tasks');
    }
  }

  resetDb(): void{
  	this.db.destroy().then( response => {
		  // success
		  this.initDb();
		}).catch(function (err) {
		  console.log(err);
		});
  }

	get(): Promise<Task[]>{
		// console.log('getting all docz');
		return this.db.allDocs({
		  include_docs: true,
		  attachments: false
		}).then(ExtractData)
			.catch(HandleError);
	}

	getTask(_id: string): Promise<Task>{
		// console.log('getTask _id:',_id);
		return this.db.get(_id)
			.then(ExtractData)
			.catch(HandleError);
	}

	insert(task: Task): Promise<Task> {
		return this.db.put(task)
			.then( response => {
				if(response.ok){
					return Promise.resolve(task);
				}else{ return Promise.reject(task); }
			})
			.catch(HandleError);
	}

	update(task: Task): Promise<void> {
		// console.log('gonna update task:',task);
		return this.db.put(task)
			.then( response => {
				if(response.ok){
					task._rev = response.rev;
					return Promise.resolve(task);
				}else{ return Promise.reject(task); }
			})
			.catch(HandleError);
	}

	remove(task: Task): Promise<void> {
		if(task._id && task._rev){
			return this.db.remove(task._id,task._rev);
		}
	}
}
