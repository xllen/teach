$(function () {
	var $btn = $("button[type=submit]");
	$btn.on("click",function (e) {
		e.preventDefault();
		var $studnet_name = $("#student-name"),
			$studnet_num = $("#student-num");
		var $studnet_name_val = $studnet_name.val(),
			$studnet_num_val = $studnet_num.val();
		$.ajax({
			type:"GET",
			url:"student-grade.json",
			dataType:"json",
			success:function (data) {
				console.log(data);
				$.each(data.student,function (index,student) {
					if($studnet_name_val == student.name || $studnet_num_val == student.num){
						var str = '<tr>'+
				                    '<th scope="row">'+(index+1)+'</th>'+
				                    '<td>'+student.name+'</td>'+
				                    '<td>'+student.num+'</td>'+
				                    '<td>'+student.English+'</td>'+
				                    '<td>'+student.math+'</td>'+
				                    '<td>'+student.computer+'</td>'+
			               		  '</tr>';
			             $("#student-grade").html(str);
					}
				});
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
			//这个error函数调试时非常有用，如果解析不正确，将会弹出错误框
			alert(XMLHttpRequest.responseText); 
			alert(XMLHttpRequest.status);
			alert(XMLHttpRequest.readyState);
			alert(textStatus); // parser error;
			}
		});
	});
})