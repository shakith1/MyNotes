<?php
    class Database{
        public static $connection;
        public static function createConnection(){
            if (!isset(Database::$connection)) {
                Database::$connection = new mysqli("localhost", "root", "1234", "mynotes", "3306");
            }
        }

        public static function iud($query){
            Database::createConnection();
            Database::$connection->query($query);
        }
    
        public static function search($query){
            Database::createConnection();
            $resultSet = Database::$connection->query($query);
            return $resultSet;
        }
    }
?>
