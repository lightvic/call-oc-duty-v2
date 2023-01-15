<?php

namespace App\Controller;

use App\Model\Entity\Expense;
use App\Model\Entity\UserColoc;
use App\Model\Factory\PDOFactory;
use App\Model\Repository\ExpenseRepository;
use App\Model\Repository\UserRepository;
use App\Route\Route;
use App\Services\JWTHelper;
use http\Env\Response;

class ExpenseController extends Controller
{
    #[Route('/api/unFixExpense/{colocUuid}', 'unfix expense', ['GET'])]
    public function unfixExpense($colocUuid)
    {
        $currentUser = $this->checkJwtAndGetUser();

        $expenseRepository = new ExpenseRepository(new PDOFactory());
        $unfixExpense = $expenseRepository->getAllUnfixExpenseByColocUuid($colocUuid);

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

    #[Route('/api/fixExpense/{colocUuid}', 'fix expense', ['GET'])]
    public function fixExpense($colocUuid)
    {
        $currentUser = $this->checkJwtAndGetUser();

        $expenseRepository = new ExpenseRepository(new PDOFactory());
        $unfixExpense = $expenseRepository->getAllfixExpenseByColocUuid($colocUuid);

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
        $otherParticipant[] = $currentUser;
        $toDivid = count($otherParticipant);
        $value = $response['global_value'];
        $eachDue = floor(100* $value / $toDivid) / 100;

        $diff = $value - $eachDue * $toDivid;
        $token = $this->MakeUuid();

        foreach ($otherParticipant as $participant) {
            $this->setNewExpenseArgs(-$eachDue, $participant, $response, $token, $diff, $currentUser);
        }

        $this->setNewExpenseArgs($value, $currentUser, $response, $token);

        $this->renderJSON([
            'success' => 'Enregistré avec succés'
        ]);
        die();
    }

    public function setNewExpenseArgs(int|float $eachDue, string $userUuid, array $response, string $token, int|float $diff = 0, ?string $currentUser = null)
    {
        $expenseRepository = new ExpenseRepository(new PDOFactory());

        if ($currentUser && $userUuid === $currentUser) {
            $eachDue += $diff;
        }

        $expenseArgs = [
            'uuid' => $this->MakeUuid(),
            'name' => $response['name'],
            'value' => $eachDue,
            'category' => $response['category'],
            'type' => $response['type'],
            'fix' => $response['fix'],
            'token' => $token,
            'user_uuid' => $userUuid,
            'coloc_uuid' => $response['coloc_uuid']
        ];

        $expense = new Expense($expenseArgs);

        $expenseRepository->insertExpense($expense);
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
            if ($debt[2] === 0) {
                continue;
            }
            $due[] = [
                "this_user" => $debt[0],
                "owes" => $debt[2],
                "to" => $debt[1]
            ];
        }

        $this->renderJSON([
            "expenses" => $due
        ]);
        http_response_code(200);
        die();
    }
}
