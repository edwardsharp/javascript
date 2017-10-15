import {InMemoryDbService} from "angular-in-memory-web-api";


function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

export class InMemoryDataService implements InMemoryDbService {
	createDb() {
		let	tasks = [
			{id: "1", text: "Task #1", start_date: "2017-10-09 00:00", duration: 5, progress: 0.6},
			{id: "2", text: "Task #2 THIS IS A REALLY LONG TITLE NAME", start_date: "2017-10-10 00:00", duration: 10, progress: 0.3}
		];
		let links = [
			{id: "1", source: "1", target: "2", type: "0"}
		];

		// for(var i=0; i<100; i++){
		// 	tasks.push({
		// 		id: 1, text: "Task #"+i, start_date: (1507967392934 + (i * (1000 * 60 * 24))).toString(), duration: 5, progress: 0.6
		// 	})
		// }
		return {tasks, links};
	}

	// Pseudo guid generator
  genId<T extends { id: any }>(collection: T[], collectionName: string): any {
    return guid();
  }
}
