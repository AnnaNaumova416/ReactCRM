import $ from 'jquery';
import BASEURL from './urlConfig.jsx';
//import dispatcher from "../dispatchers/dispatcher";

module.exports ={

	_callAPI: function(url,method,data,target){
		$.ajax({
			url: url,
			method: method,
			data: data,
			processData: true,
			dataType: 'json',
			contentType: "application/json",
			
			
			success: (data,textStatus, jqXHR) => {
	        	target('success', data);        	
	        },
	        error: (jqXhr,textStatus,error) => {
	        	target('error',jqXhr,textStatus,error);
	        }
		});
	},

}
