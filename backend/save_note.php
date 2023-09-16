<?php
require "connection.php";

$data = json_decode(file_get_contents("php://input"));

if (empty($data->title))
    echo "error_1";
elseif (empty($data->category))
    echo "error_2";
elseif (empty($data->description))
    echo "error_3";
else{
    $unique_id = uniqid();
    
    Database::iud("INSERT INTO `note`(`title`,`category`,`description`,`unique_id`) 
    VALUES('".$data->title."','".$data->category."','".$data->description."','".$unique_id."')");

    $resultSet =  Database::search("SELECT `id` FROM `note` WHERE `unique_id`='".$unique_id."'");
    $id = $resultSet->fetch_assoc();
    

    Database::iud("INSERT INTO `user_has_note`(`user_mobile`,`note_id`,`date_time`) 
    VALUES('".$data->mobile."','".$id["id"]."','".$data->date."')");

    echo "success";
    
}
?>