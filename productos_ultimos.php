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
if(isset($_GET['cant']))
{
      $cantidad = $_GET['cant'];

      // $query = "select ID, NAME, PRICESELL, IMAGE, ATTRIBUTES from products WHERE CATEGORY IN";
      // $query .= "(select ID FROM categories WHERE SUBSTRING(NAME,1,2) != 'X_') ORDER BY CODE DESC limit 0,15";


      // $query = "select ID, NAME, PRICESELL, IMAGE, ATTRIBUTES from products WHERE CATEGORY IN";
      $query = "select ID, NAME, PRICESELL, IMAGE from products WHERE CATEGORY IN";
      $query .= "(select ID FROM categories WHERE SUBSTRING(NAME,1,2) != 'X_') ORDER BY REFERENCE DESC limit 0,".$cantidad."";

      // echo $query;

			$buscarProductos=$conexion->query($query);

			if ($buscarProductos->num_rows > 0)
			{
				$result =  $buscarProductos->fetch_all(MYSQLI_ASSOC);
				foreach($result as $key => $question)
				{
					 $result[$key]['IMAGE'] = base64_encode($question['IMAGE']);
						 // Dario ---> Para redondear los precios y que vaya de $10 en $10
					 $result[$key]['PRICESELL'] = "$ ".round($question['PRICESELL'],-1);
           $result[$key]['SUBCATEGORY'] = FALSE;
				 }
				 $json = json_encode($result);
				echo $json;
			}
			else
      {
      	die("No hay coincidencias");
      }
}
else
{
	die("No hay parametro");
}


?>
