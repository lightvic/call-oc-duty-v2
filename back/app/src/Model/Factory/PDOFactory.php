<?php

    namespace App\Model\Factory;

    use App\Model\Interfaces\Database;

    class PDOFactory implements Database
    {
        private string $host;
        private string $dbName;
        private string $userName;
        private string $password;

        public function __construct(string $host = "db", string $dbName = "COD", string $userName = "root", string $password = "calloc")
        {
            $this->host = $host;
            $this->dbName = $dbName;
            $this->userName = $userName;
            $this->password = $password;
        }

        public function getMySqlPDO(): \PDO
        {
            return new \PDO("mysql:host=" . $this->host . ";dbname=" . $this->dbName . ';charset=utf8', $this->userName, $this->password);
        }
    }
