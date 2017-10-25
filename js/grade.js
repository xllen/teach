$(function () {
	$.ajax({
		type:"GET",
		url:"student-grade.json",
		dataType:"json",
		success:function (data) {
			console.log(data);
			var $student_grade_list = $("#student-grade");
			var str = '';
			$.each(data.student,function (index,student) {
				str += '<tr>'+
		                    '<th scope="row">'+(index+1)+'</th>'+
		                    '<td>'+student.name+'</td>'+
		                    '<td>'+student.num+'</td>'+
		                    '<td>'+student.English+'</td>'+
		                    '<td>'+student.math+'</td>'+
		                    '<td>'+student.computer+'</td>'+
		                '</tr>';
			});
			$student_grade_list.html(str);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
		//如果解析不正确，将会弹出错误框
		alert(XMLHttpRequest.responseText); 
		alert(XMLHttpRequest.status);
		alert(XMLHttpRequest.readyState);
		alert(textStatus); // parser error;
		}
	});

})
	



	
