<?php
  require 'chotarest/app.php';
  $restapp = new RestfulApp();
  $restapp->HandleCors();
  $restapp->run();

  // To test this out
  // http://localhost:8089/services/rest.api.php/testrest/booga
  function testrest($param){
    echo "<div style='background-color:#9baedd;color:#723014;font-size:30px;padding:20px;border:5px solid #723014;'>If you called the <code>testrest</code> API and passed <code>" . $param . "</code> as the parameter, then your <b>Rest server</b> is set up good!</div>";
  }

  function console_log($message) {
    $STDERR = fopen("php://stderr", "w");
              fwrite($STDERR, "\n".$message."\n");
              fclose($STDERR);
  }

  function validuser(){
    require_once('objectlayer/appusercollection.php');
    require_once('objectlayer/namevalue.php');
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
      $json = file_get_contents('php://input');
      $data = json_decode($json);
      $filter = array(
        new namevalue('username','=',$data->userdata->username),
        new namevalue('password','=',$data->userdata->password),
      );
      $appusercollection = new appusercollection($filter);
      if ($appusercollection->length()){
        echo json_encode([1,"Valid user"]);
      } else {
        echo json_encode([0,"Invalid user"]);
      }
    }
  }


  function adduser(){
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
      $json = file_get_contents('php://input');
      $data = json_decode($json);
      require_once('objectlayer/appuser.php');
      $appuser = new appuser();
      $appuser->username = $data->userdata->username;
      $appuser->password = $data->userdata->password;
      $appuser->Save();
      echo json_encode($appuser);
    }
  }

  function getuserlist(){
    require_once('objectlayer/appusercollection.php');
    $appusercollection = new appusercollection();
    echo json_encode($appusercollection->getobjectcollection());
  }

  function getuserbyid($userid){
    require_once('objectlayer/appuser.php');
    require_once('objectlayer/namevalue.php');
    $appuser = new appuser($userid);
    $filter = array(new namevalue('id','=',$userid));
    echo json_encode($appuser);
  }

  
?>
