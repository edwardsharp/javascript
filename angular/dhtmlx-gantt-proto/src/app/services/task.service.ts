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

	get(): Promise<Task[]>{
		return this.db.allDocs({
		  include_docs: true,
		  attachments: false
		}).then(ExtractData)
			.catch(HandleError);
	}

	insert(task: Task): Promise<Task> {
		return this.db.put(task)
			.then(ExtractData)
			.catch(HandleError);
	}


	update(task: Task): Promise<void> {
		return this.db.put(task)
			.then(ExtractData)
			.catch(HandleError);
	}

	remove(task: Task): Promise<void> {
		return this.db.remove(task._id,task._rev);
	}
}
