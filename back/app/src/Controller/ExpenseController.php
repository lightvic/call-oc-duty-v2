<?php

namespace App\Controller;

use App\Model\Entity\Expense;
use App\Model\Factory\PDOFactory;
use App\Model\Repository\ExpenseRepository;
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

        $colocUuid = $response['colocUuid'];
        $user = $response['user'];

        $expenseArgs = [
            'uuid' => $this->MakeUuid(),
            'name' => $response['name'],
            'value' => $response['value'],
            'category' => $response['category'],
            'type' => $response['type'],
            'date' => $response['date'],
            'fix' => $response['fix'],
            'token' => $this->MakeUuid(),
            'user_uuid' => $user,
            'coloc_uuid' => $colocUuid
        ];

        $expense = new Expense($expenseArgs);
        $expenseRepository = new ExpenseRepository(new PDOFactory());

        $expenseRepository->insertExpense($expense);

        $this->renderJSON([
            'success' => 'Enregistré avec succés'
        ]);
        die();
    }
}
