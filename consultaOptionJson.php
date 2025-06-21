<?php
// Recursively called for each character added to the search text box
// Returns a list of results with products found matching the criteria
require "config.php";

$conexion = new mysqli($hostname, $username,$password, $db_name);

if ($conexion->connect_error)
{
    die("Connection failed: " . $conexion->connect_error);
}

if (!$conexion->set_charset("utf8"))
{
    printf("Error loading utf8 character set utf8: %s\n", $conexion->error);
    exit();
}
// else {
//     printf("Conjunto de caracteres actual: %s\n", $conexion->character_set_name());
// }

$query="";
if(isset($_GET['filtro']))
{
      // mysqli::real_escape_string -- mysqli_real_escape_string — Escapa los caracteres especiales de una cadena para usarla en una sentencia SQL, tomando en cuenta el conjunto de caracteres actual de la conexión
    	$q=$conexion->real_escape_string($_GET['filtro']);
      $aKeyword = explode(" ", $q);
      // $query="SELECT ID, NAME FROM products WHERE NAME LIKE '%".$aKeyword[0]."%'";
      $query="SELECT ID, NAME FROM products WHERE (NAME LIKE '%".$aKeyword[0]."%' OR TEXTTIP LIKE '%".$aKeyword[0]."%')";


      for($i = 1; $i < count($aKeyword); $i++)
      {
             if(!empty($aKeyword[$i]) AND strlen($aKeyword[$i])>=2)
             {
                // $query .= " AND NAME LIKE '%" . $aKeyword[$i] . "%'";
                $query .= " AND (NAME LIKE '%".$aKeyword[$i]."%' OR TEXTTIP LIKE '%".$aKeyword[$i]."%')";
             }
      }

      $query .=" AND CATEGORY IN (select ID FROM categories WHERE substr(NAME,1,2) != 'X_')";
      $buscarProductos=$conexion->query($query);

      if ($buscarProductos->num_rows > 0)
      {
      	$result =  $buscarProductos->fetch_all(MYSQLI_ASSOC);
      	$json = json_encode($result);
      	echo $json;
      }
      else
      {
      	die("No matches found");
      }

}
else
{
	die("No parameter");
}


?>
