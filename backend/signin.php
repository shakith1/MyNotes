<?php
require "connection.php";

$data = json_decode(file_get_contents("php://input"));

if (empty($data->mobile))
    echo json_encode("error_1");
elseif (!preg_match("/0((11)|(2(1|[3-7]))|(3[1-8])|(4(1|5|7))|(5(1|2|4|5|7))|(6(3|[5-7]))|(7[0|1|2|4|5|6|7|8])|([8-9]1))[0-9]{7}/", $data->mobile))
    echo json_encode("error_2");
elseif (empty($data->password))
    echo json_encode("error_3");
else {
    $resultSet = Database::search("SELECT * FROM `user` WHERE `mobile`='" . $data->mobile . "' AND `password`='" . $data->password . "'");
    if ($resultSet->num_rows == 1) {
        $data = $resultSet->fetch_assoc();

        $user = new stdClass();
        $user->mobile = $data["mobile"];
        $user->fname = $data["fname"];
        $user->lname = $data["lname"];

        echo json_encode($user);
    } else {
        echo json_encode("error_4");
    }
}
?>