<?php

				require "config.php";

        header("Content-Type: text/html;charset=utf-8");

        $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
		    $dbh -> exec("SET CHARACTER SET utf8");
        $sql = 'select ID, NAME, PARENTID, IMAGE FROM categories WHERE SUBSTRING(NAME,1,2) != :X ORDER BY NAME';
				// como necesito también que traiga la subcategoría para poder luego seleccionarla, la filtro luego en el home.html
        // $sql = 'select ID, NAME, IMAGE FROM categories WHERE SUBSTRING(NAME,1,2) != :X AND PARENTID is null ORDER BY NAME';
        $stmt = $dbh->prepare($sql);
        $stmt->bindValue(':X', 'X_');
        $stmt->execute();
        $result =  $stmt->fetchAll(PDO::FETCH_ASSOC);

				foreach($result as $key => $question)
				{
					 $result[$key]['IMAGE'] = base64_encode($question['IMAGE']);
				 }

        $json = json_encode($result);
        echo $json;
?>
