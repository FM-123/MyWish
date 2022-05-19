// 愿望单数据
var wishList = []
// 页码索引
var index = 1;
// 条数
var pageSize = 3;
// 最大数
var maxPage = 0;
// 许愿贴姓名
var name = '';
// 许愿贴id
var id = 0;
// 验证密码取回内容
var editData = [];
// 验证是删除还是编辑
var flag = '';

// 获取许愿贴
function getWishList() {
    $.ajax({
        type: "POST",
        url: '../controller/index.php',
        data: ({
            func: 'getWish'
        }),
        success: function (res) {
            wishList = JSON.parse(res);
            maxPage = Math.ceil(wishList.length / pageSize);
            $('.total').text(maxPage);
            sign();
        }
    })
}

getWishList()
// 上一页
function prevPage() {
  if(index==1){
    index=1
  }else{
    index--
  }
  sign(index);
  numChange(index);
}
// 下一页
function nextPage() {
  if(index<maxPage){
    index++
  }else{
    return sign(index);
  }
  sign(index);
  numChange(index);
}
//首页
function firstPage() {
  index = 1;
  sign(index);
  numChange(index);
}
//尾页
function lastPage() {
  index = maxPage;
  sign(index);
  numChange(index);
} 
// 页码发生变化
function numChange(num) {
  $('.pageNum').text(num);
}
// 时间戳转换
function gettime(time) {
  let lastTime = new Date(parseInt(time));
  // console.log(lastTime)
  return lastTime.toLocaleString().replace(/:\d{1,2}$/,' ').trim();
}



// 渲染愿望单
function sign(page = 1) {
  let str = '';
  let data = wishList.slice((page - 1) * pageSize, page * pageSize);
  for (var i = 0; i < data.length; i++) {
      str += `<div class="col-lg-4 col-md-4 mt-2 mb-2">` +
          `<div class="card wish_card position-relative" style="width: 100%;height: 180px;background-color: ${data[i].color}; ">` +
          `<div class="edit_btn">` +
          `<button>` +
          `<svg data-target="#editModal" data-flag="edit" onclick="openValidation('${data[i].id}','${data[i].name}',event)" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16"><path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/></svg>`+
          `</button>` +
          `<button  class="btn_del">` +
          `<svg data-flag="del" onclick="openValidation('${data[i].id}','${data[i].name}',event)" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg>` +
          `</button>` +
          ` </div>` +
          `<div class="card-body">` +
          `<h5 class="card-title border-bottom pb-2">From:${data[i].name}</h5>` +
          `<p class="card-text wishContent">${data[i].content}</p>` +
          `<p class="card-text wishContent">${gettime(data[i].time)}</p>` +
          `</div></div></div>`

  }
  $('#wish_card').html(str);
}
function openEditadd(){
  //页面跳转
  window.location.href = '../view/add.html';
}
//打开编辑对话框
function openEdit(editName) {
  if (editName === 'edit') {
      $('#editModal').modal('show')
      $('#EditNameFormControlInput1').val(editData[0].name)
      $('#EditColorFormControlInput1').val(editData[0].color)
      $('#EditContentFormControlTextarea1').val(editData[0].content)
      flag = '';
  } else if (editName === 'del') {
      $('#delModal').modal('show')
      flag = '';
  } 
  flag = '';
}
// 打开验证密码框
function openValidation(wishId,wishName,e) {
  name = wishName;
  id = wishId;
  flag = e.target.getAttribute('data-flag');
  console.log(flag);
  $('#validationModal').modal('show')
}

// 验证密码,并通过flag进行判断编辑还是删除
function editWish() {
  let pwd = $('#pwd').val();
  let reg = /^[a-zA-Z0-9]{0,6}$/;
  if (!reg.test(pwd)) {
      // alertShow('alert-warning');
      alert('密码格式错误');
      $('#pwd').val('');
  } else {
      $.ajax({
          type: "POST",
          url: '../controller/index.php',
          data: ({
              func: 'validation',
              name: name,
              pwd: pwd
          }),
          success: function (res) {
              if (JSON.parse(res).length == 0) {
                alert('密码错误');
                  $('#validationModal').modal('hide');
                  return $('#pwd').val('');
              } else {
                  $('#pwd').val('');
                  alert("密码正确！")
                  editData = JSON.parse(res);
                  $('#validationModal').modal('hide');
                  let editName = flag;
                  openEdit(editName);
              }
          }
      })
  }
}
// 删除愿望单
function delWish() {
  $.ajax({
      type: "POST",
      url: '../controller/index.php',
      data: ({
          func: 'delWish',
          name: name,
          id: id
      }),
      success: function (res) {
          console.log(res);
          if(parseInt(res)===1){
            alert('删除成功!!!');
              $('#delModal').modal('hide');
              getWishList();
              index = 1;
              numChange(index);
          }
      }
  })
}
//修改愿望单
function editUpload() {
  let name = $('#EditNameFormControlInput1').val();
  let color = $('#EditColorFormControlInput1').val();
  let content = $('#EditContentFormControlTextarea1').val();
  $.ajax({
      type: "POST",
      url: '../controller/save.php',
      data: ({
          func: 'editWish',
          name: name,
          color: color,
          content: content.replace('<script>',"*").replace('</script>',"*"),
          id: id,
      }),
      success: function (res) {
          if (parseInt(res) === 1) {
            alert('修改成功!!!');
              $('#editModal').modal('hide');
              getWishList();
              numChange()
          }
      }
  })
}
