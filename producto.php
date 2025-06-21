<?php
require "config.php";

$conexion = new mysqli($hostname, $username,$password, $db_name);
if ($conexion->connect_error)
{
    die("la conexión ha fallado: " . $conexion->connect_error);
}

if (!$conexion->set_charset("utf8"))
{
    printf("Error al cargar el conjunto de caracteres utf8: %s\n", $conexion->error);
    exit();
}

$query="";
if(isset($_GET['keyId']))
{
			// $aKeyword = $_GET['keyId'];
      $aKeyword = $conexion->real_escape_string($_GET['keyId']);
      // echo $aKeyword;
      $query= "SELECT NAME, REFERENCE, PRICESELL, IMAGE, CATEGORY, ATTRIBUTES FROM products WHERE ID = '".$aKeyword."' ORDER BY NAME";
			$buscarProductos=$conexion->query($query);
			$result =  $buscarProductos->fetch_all(MYSQLI_ASSOC);

      foreach($result as $key => $question){
         $result[$key]['IMAGE'] = base64_encode($question['IMAGE']);
         // Dario ---> Para redondear los precios y que vaya de $10 en $10
         $result[$key]['PRICESELL'] = round($question['PRICESELL'],-1);
       }
       $json = json_encode($result[0]);
      echo $json;

}
else
{
	die("No hay parametro");
}

?>
