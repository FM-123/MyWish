<?php
$servername = "127.0.0.1";
$username = "root";
$password = "";
$dbname = "php_wish";
//建立连接
$conn = new mysqli($servername, $username, $password, $dbname);
//检测连接
if (!$conn) {
    die('连接失败' . mysqli_connect_error());
}
//设置编码
$conn->set_charset('utf8');
