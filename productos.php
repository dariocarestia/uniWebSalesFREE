<?php
				// set_time_limit(50000000000000000);
				require "config.php";

        $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
		    $dbh -> exec("SET CHARACTER SET utf8");


				$sql = 'select ID, NAME, IMAGE FROM categories WHERE PARENTID = :CATEGORY ORDER BY NAME' ;
				$stmt = $dbh->prepare( $sql );
				$stmt->bindValue(':CATEGORY', $_GET['keyId'], PDO::PARAM_STR);
        $stmt->execute();
				$result =  $stmt->fetchAll(PDO::FETCH_ASSOC);
				// $cantsubcats = $stmt->rowCount();
				$counts = 0;

				// $sql = 'select ID, NAME, PRICESELL , IMAGE , ATTRIBUTES from products where CATEGORY = :CATEGORY ORDER BY NAME' ;
				$sql = 'select ID, NAME, PRICESELL , IMAGE from products where CATEGORY = :CATEGORY ORDER BY NAME' ;
        $stmt = $dbh->prepare( $sql );
        $stmt->bindValue(':CATEGORY', $_GET['keyId'], PDO::PARAM_STR);
        $stmt->execute();
        $result1 =  $stmt->fetchAll(PDO::FETCH_ASSOC);
				// $cantproducts = $stmt->rowCount();

				// Aquí se agregan las subcategorías
				foreach($result as $key => $question){

					 $result3[$counts]['ID'] = $question['ID'];
					 $result3[$counts]['NAME'] = "SUBCATEGORÍA:";
					 $result3[$counts]['PRICESELL'] = $question['NAME'];
					 $result3[$counts]['IMAGE'] = base64_encode($question['IMAGE']);
					 // $result3[$counts]['ATTRIBUTES'] = "";
					 $result3[$counts]['SUBCATEGORY'] = TRUE;
					 $counts++;

				 }

				 // Aquí se agregan los productos normales de la categoría
				 foreach($result1 as $key1 => $question){

						$result3[$counts]['ID'] = $question['ID'];
						$result3[$counts]['NAME'] = $question['NAME'];
						$result3[$counts]['PRICESELL'] = "$ ".round($question['PRICESELL'],-1);
						// $result3[$counts]['PRICESELL'] = round($question['PRICESELL'],-1);
						$result3[$counts]['IMAGE'] = base64_encode($question['IMAGE']);
						// $result3[$counts]['ATTRIBUTES'] = $question['ATTRIBUTES'];
						$result3[$counts]['SUBCATEGORY'] = FALSE;
						$counts++;

					}


       $json = json_encode($result3);
       echo $json;

?>
