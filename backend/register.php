<?php
require "connection.php";

$data = json_decode(file_get_contents("php://input"));

if (empty($data->fname))
    echo "error_1";
elseif (empty($data->lname))
    echo "error_2";
elseif (empty($data->mobile))
    echo "error_3";
elseif (!preg_match("/0((11)|(2(1|[3-7]))|(3[1-8])|(4(1|5|7))|(5(1|2|4|5|7))|(6(3|[5-7]))|(7[0|1|2|4|5|6|7|8])|([8-9]1))[0-9]{7}/", $data->mobile))
    echo "error_7";
elseif (empty($data->type))
    echo "error_4";
elseif (empty($data->password))
    echo "error_5";
elseif (strlen($data->password) < 6)
    echo "error_8";
elseif (empty($data->c_password))
    echo "error_6";
elseif ($data->password != $data->c_password)
    echo "error_9";
else{

    $result =  Database::search("SELECT * FROM `user` WHERE `mobile`='".$data->mobile."'");
    if($result->num_rows != 1){
    Database::iud("INSERT INTO user(`mobile`,`fname`,`lname`,`user_type`,`password`) 
    VALUES('".$data->mobile."','".$data->fname."','".$data->lname."','".$data->type."','".$data->password."')");

    echo "success";
    }else{
        echo "error_10";
    }
}
?>