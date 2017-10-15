export function ExtractData(response: any): any {
	console.log('ExtractData response:',response);
	if(response.rows && response.rows[0] && response.rows[0].doc){
    return response.rows.map( r => r.doc );
  }else{
  	return {};
  }
}

export function HandleError(error: any): Promise<any>{
	console.log(error);
	return Promise.reject(error);
}
