<?php

function mail_utf8($to, $from, $subject='(No subject)', $message='', $add_header='') {
    $headers = "MIME-Version: 1.0\r\n" . "Content-type: text/plain; charset=UTF-8\r\n" . "From: $from\r\n" . $add_header;
    mail($to, '=?UTF-8?B?'.base64_encode($subject).'?=', $message, $headers);
}

$recepient = 'bakay.sergey28@gmail.com';  //*self Email*/
$sitename = "highbit";

$name = trim($_POST["name"]);
$tel = trim($_POST["phone"]);
$from = trim($_POST["email"]);
$company = trim($_POST["company"]);
$message = trim($_POST["msg"]);
$subject = "New contact";

$message = "I wish to contact you, $subject\nName: $name\nTel: $tel\nE-mail: $from \nCompany: $company\nMessage: $message";

$pagetitle = 'have a new contact with the site "'.$sitename.'"';

mail_utf8($recepient, $from, $pagetitle, $message, "Reply-To: $from\r\n");

?>