(function () {
	var student_list = []
		,$student_search_name = $("#name")
		,$student_search_num = $("#uid")
		,$student_search_btn = $("#search")
		,$search_list = $("#searchList")
		,$search_body = $("#search-body") 
		;

	student_list = store.get("student_list") || []; //获取到本地数据
	//console.log(student_list);
	$student_search_btn.on("click",function (e) {
		e.preventDefault();//阻止默认点击事件
		var $student_search_name_val = $student_search_name.val()
			,$student_search_num_val = $student_search_num.val()
			;
		for(var i = 0; i < student_list.length;i++){
			if($student_search_name_val == student_list[i].name || $student_search_num_val == student_list[i].num){
				$search_list.html(null);
				$search_list.append(search_student_tpl(student_list[i],i));
				
				return;
			}else{
				var $p = $("<p>您的输入有误，请重新输入！</p>");
			 	$p.css("color","red");
			 	$search_list.html(null).html($p);
			 }
		}
	});
function search_student_tpl(data,index) {
	if(!data || (index < 0)) return;
	var str ='<tr data-index="'+index+'">'+
                '<th scope="row">'+(index+1)+'</th>'+
                '<td id="editing-name">'+ data.name +'</td>'+
                '<td id="editing-num">'+ data.num +'</td>'+
                '<td>'+
                    '<div role="presentation" class="dropdown">'+
                        '<button class="btn btn-default dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">'+
                             '操作<span class="caret"></span>'+
                       	'</button>'+
                       '<ul class="dropdown-menu">'+
                            '<li><a href="#" class="editing">编辑</a></li>'+
                            '<li><a href="#" class="delete">删除</a></li>'+
                            '<li><a href="#" class="sure">确定</a></li>'+
                        '</ul>'+
                    '</div>'+
                '</td>'+
              '</tr>';
    return $(str);
}
})();