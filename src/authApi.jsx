import $ from 'jquery';
import BASEURL from './urlConfig.jsx';
//import dispatcher from "../dispatchers/dispatcher";

module.exports ={

	_callAPI: function(url,method,data,target){
		let username = "admin";
		let password = "admincms";
		let  token = username + ":" + password;
		let  hash = btoa(token);
		console.log(hash);
		$.ajax({
			url: url,
			method: method,
			data: data,
			processData: true,
			dataType: 'json',
			headers: {
            "Authorization" :"Basic " + hash,
            "Content-Type": 'application/x-www-form-urlencoded;charset=UTF-8'
            
            
            },
				        
	        success: (data,textStatus, jqXHR) => {
	        	target('success', data);        	
	        },
	        error: (jqXhr,textStatus,error) => {
	        	target('error',jqXhr,textStatus,error);
	        }
		});
	},

}
