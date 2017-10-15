import {Injectable} from "@angular/core";
import {Link} from "../models/link";
import {ExtractData, HandleError} from "./service-helper";

declare var PouchDB:any;

@Injectable()
export class LinkService {

	links: Array<Link>;
	db: any;

	constructor() {
		this.initDb();
	}

	initDb(): void{
  	if(navigator.vendor && navigator.vendor.indexOf('Apple') > -1){
  		console.log("LOADING FRUITDONW DB!");
      this.db = new PouchDB('links', {adapter: 'fruitdown'});
    }else{
      this.db = new PouchDB('links');
    }
  }

	get(): Promise<Link[]>{
		return this.db.allDocs({
		  include_docs: true,
		  attachments: false
		}).then(ExtractData)
			.catch(HandleError);
	}

	insert(link: Link): Promise<Link> {
		return this.db.put(link)
			.then(ExtractData)
			.catch(HandleError);
	}


	update(link: Link): Promise<void> {
		return this.db.put(link)
			.then(ExtractData)
			.catch(HandleError);
	}

	remove(link: Link): Promise<void> {
		return this.db.remove(link._id,link._rev);
	}
}
