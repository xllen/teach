(function () {
//用户提交基本信息
var $submit = $(".submit")
	,$addname = $("#addname")
	,$addnum = $("#addnum")
	,$password = $("#addpassword")
	,$password1 = $("#addpassword1")
	,$delete
	,$editing
	,$sure
	,$inputs1 = $("<input>") //创建两个input标签，用于编辑学生信息
	,$inputs2 = $("<input>")
	,student_list = []	//用来保存localstorage
	;

init();
//点击添加学生
$submit.on("click",function () {
	var newStudent_list ={} //创建一个空对象来保存学生信息
	newStudent_list.name = $addname.val(); //将姓名保存到这个空对象中
	newStudent_list.num = $addnum.val();	//将学号保存到这个空对象中
	console.log($password.val() ,$password1.val());
	if($password.val() != $password1.val()){ //判断二次密码输入是否一样
		$password1.val(null);
		return $password1.parent().addClass("has-error");
	}
	if(!newStudent_list.name || !newStudent_list.num) return; //判断是否含有名称和编号
	if(add_student(newStudent_list)){
		$addname.val(null);
		$addnum.val(null);
		$password.val(null);
		$password1.val(null);
	}
});

//监听所有删除事件
function delete_student_list() {
	$delete.on("click",function () {
		var $this = $(this); 
		var $item = $this.parent().parent().parent().parent().parent();
		//console.log($item);
		var index = $item.data('index');
		//console.log(index);
		var r = confirm("确定删除？");
		r ? delete_student(index) : null;
	});
}

//监听编辑事件
function editing_student_list() {
	$editing.on("click",function () {
		var $that = $(this); 
		var $lists = $that.parent().parent().parent().parent().parent();
		var $editing_name = $lists.find("td#editing-name")  //找到要编辑的name
			,$editing_num = $lists.find("td#editing-num");  //找到要编辑的学号
		var names = $editing_name.text()  //获取名字
			,nums = $editing_num.text();  //获取学号
		$inputs1.attr("value",names); 
		$inputs2.attr("value",nums);
		$editing_name.html(null).append($inputs1);
		$editing_num.html(null).append($inputs2);
	});
}

//确定编辑
function sure_student_list() {
	editing_student_list();
	$sure.on("click",function () {
		var $that = $(this); 
		var $lists = $that.parent().parent().parent().parent().parent();
		var $editing_name = $lists.find("td#editing-name")
			,$editing_num = $lists.find("td#editing-num");
		var $inputs1_val = $inputs1.val()
			,$inputs2_val = $inputs2.val();
		$editing_name.html($inputs1_val);
		$editing_num.html($inputs2_val);
	});
}

function add_student(newStudent_list) {
	student_list.push(newStudent_list);
	 //console.log(student_list);
	refresh_student_list();
	return true;
}

function init() {
	student_list = store.get("student_list") || [];
	 if(student_list.length){
	 	render_student_list();
	 }
}

//遍历添加进来的学生
function render_student_list() {
	var $studentList = $("#studentList");
	$studentList.html("");
	for(var i = 0; i < student_list.length; i++){
		var $student_list_item = render_student_tpl(student_list[i],i);
		$studentList.append($student_list_item);
	}
	$delete = $(".delete");
	$editing = $(".editing");
	$sure = $(".sure");
	delete_student_list(); 
	sure_student_list();	
}

//更新列表 
function refresh_student_list() {
	//更新localstorage
	store.set("student_list",student_list);
	render_student_list();
}

//删除
function delete_student(index) {
	//如果index值为undefined 或者不存在，则直接返回。
	
	if(index === undefined || !student_list[index] ) return; 
	delete student_list[index];
	refresh_student_list();
}


//学生列表模板
function render_student_tpl(data,index) {
	if(!data || (index < 0)) return;
	var str = '<tr data-index="'+index+'">'+
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

refresh_student_list();

})();