<?php
function input($method, $name, $type = 's', $default = '')
{
    switch ($method) {
        case 'get': $method = $_GET;
            break;
        case 'post': $method = $_POST;
            break;
    }
    $data = isset($method[$name]) ? $method[$name] : $default;
    switch ($type) {
        case 's': return is_string($data) ? $data : $default;
        case 'd': return (int) $data;
        default: trigger_error('不存在的过滤类型“' . $type . '”');
    }
}