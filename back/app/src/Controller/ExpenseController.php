<?php

namespace App\Controller;

use App\Model\Factory\PDOFactory;
use App\Model\Repository\ExpenseRepository;
use App\Route\Route;
use App\Services\JWTHelper;
use http\Env\Response;

class ExpenseController extends Controller
{
    #[Route('/api/unFixExpense/{colocUuid}&{limitDate}', 'unfix expense', ['GET'])]
    public function unfixExpense($colocUuid, $limitDate)
    {
        $currentUser = $this->checkJwtAndGetUser();

        $date = (new \DateTime("- $limitDate days"))->format('Y-m-d H:i:s');
        $expenseRepository = new ExpenseRepository(new PDOFactory());
        $unfixExpense = $expenseRepository->getAllUnfixExpenseByColocUuid($colocUuid, $date);

        if($unfixExpense != null) {
            $this->renderJSON([
                "unfix" => $unfixExpense,
            ]);
            http_response_code(200);
            die;
        }
        $this->renderJSON([
            "message" => "Aucune dépense récente"
        ]);
        die();
    }

    #[Route('/api/fixExpense/{colocUuid}&{limitDate}', 'fix expense', ['GET'])]
    public function fixExpense($colocUuid, $limitDate)
    {
        $cred = str_replace("Bearer ", "", getallheaders()['Authorization']);
        $currentUser = $this->checkJwtAndGetUser($cred);

        $date = (new \DateTime("- $limitDate days"))->format('Y-m-d H:i:s');
        $expenseRepository = new ExpenseRepository(new PDOFactory());
        $unfixExpense = $expenseRepository->getAllfixExpenseByColocUuid($colocUuid, $date);

        if($unfixExpense != null) {
            $this->renderJSON([
                "unfix" => $unfixExpense,
            ]);
            http_response_code(200);
            die;
        }
        $this->renderJSON([
            "message" => "Aucune dépense mensuel"
        ]);
        die();
    }

    #[Route('/api/newExpense', 'new expense', ['POST'])]
    public function newExpense()
    {
        $response = (array) json_decode(file_get_contents('php://input'));

        $currentUser = $this->checkJwtAndGetUser();

        $otherParticipant = $response['other_participant'];
        $toDivid = count($otherParticipant);

        echo "truc";
        die;
        /*$expenseArgs = [
            'uuid' => $this->MakeUuid(),
            'name' => $response['name'],
            'value' => $response['value'],
            'category' => $response['category'],
            'type' => $response['type'],
            'fix' => $response['fix'],
            'token' => $this->MakeUuid(),
            'user_uuid' => $response['user_uuid'],
            'coloc_uuid' => $response['coloc_uuid']
        ];*/

        $expense = new Expense($expenseArgs);
        $expenseRepository = new ExpenseRepository(new PDOFactory());

        $expenseRepository->insertExpense($expense);

        $this->renderJSON([
            'success' => 'Enregistré avec succés'
        ]);
        die();
    }

    #[Route('/api/expensesCalcul/{colocUuid}', 'expense calcul', ['GET'])]
    public function expenseCalcul($colocUuid)
    {
        $currentUser = $this->checkJwtAndGetUser();

        $userRepository = new UserRepository(new PDOFactory());
        $users = $userRepository->getAllUsersByCollocUuid($colocUuid);

        $expenseRepository = new ExpenseRepository(new PDOFactory());

        $expenses = [];
        foreach ($users as $user) {
            $result = $expenseRepository->getAllExpenseByColocAndUser($colocUuid, $user['uuid']);
            if (count($result) > 0) {
                $expenses[$result[0]['pseudo']] = $result[0]['value'];
            }
        }

        arsort($expenses);

        $people = array_keys($expenses);
        $debts = array();
        foreach($people as $person) {
            if ($expenses[$person] < 0) {
                foreach($people as $person_to) {
                    if ($expenses[$person_to] > 0) {
                        $debt = min(abs($expenses[$person]), $expenses[$person_to]);
                        $debts[] = array($person, $person_to, $debt);
                        $expenses[$person] += $debt;
                        $expenses[$person_to] -= $debt;
                    }
                }
            }
        }
        $due = [];
        foreach ($debts as $debt) {
            $due[] = [
                "this_user" => $debt[0],
                "owes" => $debt[2],
                "to" => $debt[1]
            ];
            /*$due[] = $debt[0]." doit ".$debt[2]." à ".$debt[1];*/
        }

}
