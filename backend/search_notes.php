<?php

require "connection.php";

$data = json_decode(file_get_contents("php://input"));

$resultSet = Database::search("SELECT * FROM `user_has_note` WHERE `user_mobile` = '" . $data->mobile . "'");

$list = array();

if ($resultSet->num_rows > 0) {
    for ($i = 0; $i < $resultSet->num_rows; $i++) {
        $data = $resultSet->fetch_assoc();

        $resultSet1 = Database::search("SELECT * FROM `note` WHERE `id` = '" . $data["note_id"] . "'");
        $data1 = $resultSet1->fetch_assoc();

        $note = new stdClass();
        $note->title = $data1["title"];
        $note->category = $data1["category"];
        $note->description = $data1["description"];
        $note->date = $data["date_time"];

        array_push($list, $note);
    }
    echo json_encode($list);
} else {
    echo json_encode("");
}
?>