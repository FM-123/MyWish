<?php
header("Content-type:text/html;charset=utf-8");
// 引入mysql连接
include '../common/init.php';
// 是否有调用方法
if (isset($_POST['func'])) {
    switch ($_POST['func']) {
        case 'getWish' :
            getWish();
            break;
        case 'validation':
            validation($_POST['name'], $_POST['pwd']);
            break;
        case 'delWish':
            delWish($_POST['id'], $_POST['name']);
            break;
        default:
            echo '404';
            break;
    }
}
// 获取愿望单列表并返回主页
function getWish()
{
    $sql = 'SELECT * FROM wish';
    $result = mysqli_query($GLOBALS['conn'], $sql);
    $arr = array();
    while ($row = mysqli_fetch_array($result)) {
        $count = count($row);
        for ($i = 0; $i < $count; $i++) {
            unset($row[$i]);//删除冗余数据
        }
        array_push($arr, $row);
    }
    echo json_encode($arr, JSON_UNESCAPED_UNICODE);
}

// 验证密码是否存在并返回主页
function validation($name, $pwd)
{
    $sql = "SELECT name,color,content FROM wish WHERE name='$name' and password='$pwd'";
    $result = mysqli_query($GLOBALS['conn'], $sql);
    $arr = array();
    while ($row = mysqli_fetch_array($result)) {
        $count = count($row);
        if ($row == 0) {
            $arr = '未找到';
            break;
        }
        for ($i = 0; $i < $count; $i++) {
            unset($row[$i]);//删除冗余数据
        }
        array_push($arr, $row);
    }
    echo json_encode($arr, JSON_UNESCAPED_UNICODE);
}

// 删除愿望
function delWish($id, $name)
{
    $sql = "DELETE FROM wish WHERE id = $id and name = '$name' ";
    if (mysqli_query($GLOBALS['conn'], $sql)){
        $rowcount=mysqli_affected_rows($GLOBALS['conn']);
        echo $rowcount;
    }
}
