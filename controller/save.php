<?php
header("Content-type:text/html;charset=utf-8");
// 引入mysql连接
include '../common/init.php';

if (isset($_POST['func'])) {
    switch ($_POST['func']) {
        case 'addWish':
            addWish($_POST['name'], $_POST['content'],$_POST['time'], $_POST['color'], $_POST['password']);
            break;
        case 'editWish' :
            editWish($_POST['id'], $_POST['name'], $_POST['content'], $_POST['color']);
            break;
        default:
            echo '404';
            break;
    }
}
// 新增
function addWish($name, $content,$time, $color, $password)
{
    $sql = "INSERT INTO wish(name,content,time,color,password) values('$name','$content','$time','$color','$password')";
    if (mysqli_query($GLOBALS['conn'], $sql)) {
        $rowcount = mysqli_affected_rows($GLOBALS['conn']);
        echo $rowcount;
    }
}
// 修改
function editWish($id, $name, $content, $color)
{
    $time = time();
    $sql = "UPDATE wish set name = '$name' , content = '$content',time='$time',color='$color' WHERE id = $id";
    if (mysqli_query($GLOBALS['conn'], $sql)) {
        $rowcount = mysqli_affected_rows($GLOBALS['conn']);
        echo $rowcount;
    }
}

?>