<!DOCTYPE html>
<html>
<?php include("../includes/head.class.php"); ?>

<?php include("../includes/header.class.php"); ?>

<body>   
    <?php
        //header("Content-Type:text/html; charset=utf-8");
        // Get the web value
        $send_name = $_GET[user_name];
        $send_sex = $_GET[sex];
        $send_birthday = $_GET[user_birthday];
        $send_id = $_GET[user_id];
        $send_pw = $_GET[user_pw];
        $send_email = $_GET[user_email];
        $send_mobile = $_GET[user_mobile];
        $send_addr = $_GET[user_add];
        $send_license = $_GET[user_licenseNum];
        $send_date = date("y-m-d");
        // mySQL Login Info.
        $dbHost = '172.17.9.85';
        $dbUser = 'cc3200';
        $dbPassWD = '000000';
        $dbName = 'mydatabase';

        // Login mySQL
        $conn = mysqli_connect($dbHost, $dbUser, $dbPassWD, $dbName);
        mysqli_set_charset($conn,"utf8");
        if($conn -> connect_error)
        {
            die("Connection Faild :" . $conn -> connect_error);   
        }
        // Check Not Double data
        $sql_id = "select count(User_id) from mydatabase.MemberList where User_id='$send_id';";
        $sql_name = "select count(User_Name) from mydatabase.MemberList where User_Name='$send_name';";

        $result_id = $conn -> query($sql_id);
        $result_name = $conn -> query($sql_name);

        $row_id = mysqli_fetch_row($result_id);
        $row_name = mysqli_fetch_row($result_name);

        if(($row_id[0]) > 0)
            echo '使用者帳號重複' . $conn -> error;  
        else if(($row_name[0]) > 0)
            echo '使用者重複' . $conn -> error;
        else
        {
            // Insert the infomation into mysql
            $sql = "INSERT into mydatabase.MemberList(User_Name, Sex, Birthday, User_id, PW, email, Mobile, License_Number, Address, join_time) values ( '$send_name', '$send_sex', '$send_birthday', '$send_id', '$send_pw', '$send_email', '$send_mobile', '$send_license', '$send_addr', '$send_date')";
            if($conn -> query($sql) ===TRUE)
            {
                echo "Record Updated Successfully";
            }
            else 
            {
                echo "Error Updating Record :" . $conn -> error;   
            }
        }
        //$result = mysql_query($sql) or die ('MySQL query ERROR');
    ?>

<?php include("../includes/head.class.php"); ?>

<?php include("../includes/header.class.php"); ?>

</html>
