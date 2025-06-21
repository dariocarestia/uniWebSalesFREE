<?php
// Se llama para devolver un conjunto de productos encontrados para visualizarlos como si fuera una categoríarra
// Es llamada al presionar ver todos
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
if(isset($_GET['filtro']))
{
			$q=$conexion->real_escape_string($_GET['filtro']);
			$aKeyword = explode(" ", $q);
      // $query="SELECT ID, NAME, PRICESELL, IMAGE FROM products WHERE NAME LIKE '%".$aKeyword[0]."%'";
      $query="SELECT ID, NAME, PRICESELL, IMAGE FROM products WHERE (NAME LIKE '%".$aKeyword[0]."%' OR TEXTTIP LIKE '%".$aKeyword[0]."%')";


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
				foreach($result as $key => $question)
				{
					 $result[$key]['IMAGE'] = base64_encode($question['IMAGE']);
						 // Dario ---> Para redondear los precios y que vaya de $10 en $10
					 $result[$key]['PRICESELL'] = "$ ". round($question['PRICESELL'],-1);
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
