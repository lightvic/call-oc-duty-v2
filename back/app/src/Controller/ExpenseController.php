<?php

namespace App\Controller;

use App\Model\Entity\Expense;
use App\Model\Entity\UserColoc;
use App\Model\Factory\PDOFactory;
use App\Model\Repository\ExpenseRepository;
use App\Model\Repository\UserRepository;
use App\Route\Route;
use App\Services\JWTHelper;

class ExpenseController extends Controller
{
    #[Route('/api/unFixExpense/{colocUuid}&{limitDate}', 'unfix expense', ['GET'])]
    public function unfixExpense($colocUuid, $limitDate)
    {
        $cred = str_replace("Bearer ", "", getallheaders()['Authorization']);
        $currentUser = $this->checkJwtAndGetUser($cred);

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

        $cred = str_replace("Bearer ", "", getallheaders()['Authorization']);
        $currentUser = $this->checkJwtAndGetUser($cred);

        $expenseArgs = [
            'uuid' => $this->MakeUuid(),
            'name' => $response['name'],
            'value' => $response['value'],
            'category' => $response['category'],
            'type' => $response['type'],
            'fix' => $response['fix'],
            'token' => $this->MakeUuid(),
            'user_uuid' => $response['user_uuid'],
            'coloc_uuid' => $response['coloc_uuid']
        ];

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
        $cred = str_replace("Bearer ", "", getallheaders()['Authorization']);
        $currentUser = $this->checkJwtAndGetUser($cred);

        $userRepository = new UserRepository(new PDOFactory());
        $users = $userRepository->getAllUsersByCollocUuid($colocUuid);

        $expenseRepository = new ExpenseRepository(new PDOFactory());

        $userExpenses = [];
        foreach ($users as $user) {
            $result = $expenseRepository->getAllExpenseByColocAndUser($colocUuid, $user['uuid']);
            if (count($result) > 0) {
                $userExpenses[$result[0]['pseudo']] = $result[0]['value'];
            }
        }

        arsort($userExpenses);



        $expenses = array(
            "jb" => 180,
            "valentine" => 60,
            "adrien" => -240
        );
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
        $array = [];
        foreach ($debts as $debt) {
            $array[] = $debt[0]." doit ".$debt[2]." à ".$debt[1];
        }

        $this->renderJSON([
            "expenses" => $array
        ]);
        http_response_code(200);
        die();
    }
}
