<?php
    header("Access-Control-Allow-Origin: http://localhost:2000");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Headers: Authorization, Content-Type");

    if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
        die;
    }

    //session_start();

    require_once __DIR__ . '/../vendor/autoload.php';

    require_once "../router.php";
