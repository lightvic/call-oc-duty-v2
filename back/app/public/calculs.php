<?php
// Je note ici les calculs à réaliser en back. Vous n'aurez plus qu'à utiliser les formules là où vous en avez besoin, en changeant les noms de variables. (Je mets des valeurs bidon juste pour que php ne me pop pas d'erreur.)

// Ajout dépense
$totalValueExpense = 400;
$numberOfParticipants = 6;

$valueByParticipantExceptLast = -1 * floor(100 * $totalValueExpense/$numberOfParticipants) / 100
$valueLastParticipant = -1 * ($totalValueExpense - ($valeurParParticipant * ($numberOfParticipants - 1)))

// On crée donc les dépenses suivantes dans la BDD (toutes avec le même token) :
// * Une pour celui qui crée la dépense, de valeur $totalValueExpense
// * Une pour chaque participant sauf le dernier, de valeur $valueByParticipantExceptLast
// * Une pour le dernier participant, de valeur $valueLastParticipant




// Remboursements
// Je ne sais pas encore comment seront les données, donc on reverra ça, mais au moins on aura le principe.

// Je stocke les membres dans un array sous la forme uuid => score (l'argent qu'ils doivent encore payer ou se faire rembourser)
$members = array(
	"uuid1" => -30,
	"uuid2" => 50,
	"uuid3" => -70,
	"uuid4" => 40,
	"uuid5" => 10
);
$membersScoreNotNull = len($members);
$moneyTransfers = array();

while($membersScoreNotNull > 0)
{
	// Je trie les membres en fonction de leur "score"
	asort($members);
	// Je calcule la valeur du transfert d'argent du 1er au dernier de la liste (celui qui doit le plus d'argent -> celui qui a le plus payé)
	$transferValue = min(value($members[0]),value($members[-1]));
	// Je mets à jour leurs "scores" (À NE PAS FAIRE DANS LA BDD ! C'EST SUELEMENT POUR LE CALCUL !)
	value($members[0]) -= $transferValue;
	value($members[-1]) -= $transferValue;
	// Je stocke les infos du transfert d'argent
	array_push($moneyTransfers, array(
		"sender" => key($members[0]),
		"receiver" => key($members[-1]),
		"value" => $transferValue
	));
	// Si le 1er a remboursé sa dette, on le supprime du tableau.
	if(value($members[0]) === 0){
		array_splice($members,0,1);
	}
	// Si le dernier a récupéré tout son argent, on le supprime du tableau.
	if(value($members[-1]) === 0){
		array_splice($members,-1,1);
	}
	$membersScoreNotNull = len($members);
}
// tous les transferts d'argent à effectuer sont dans $moneyTransfers.
?>