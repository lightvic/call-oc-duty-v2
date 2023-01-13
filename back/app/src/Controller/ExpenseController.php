<?php

namespace App\Controller;

use App\Model\Factory\PDOFactory;
use App\Model\Repository\ExpenseRepository;
use App\Route\Route;

class ExpenseController extends Controller
{
    #[Route('/api/unFixExpense/{colocUuid}&{limitDate}', 'unfix expense', ['GET'])]
    public function unfixExpense($colocUuid, $limitDate)
    {
        /*$cred = str_replace("Bearer ", "", getallheaders()['authorization']);
        $token = JWTHelper::decodeJWT($cred);
        if (!$token) {
            $this->renderJSON([
                "message" => "invalid cred"
            ]);
            die;
        }*/

        $currentUser = 'd2da2a15-b22c-4403-ad33-345f0f59ad03';
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
        /*$cred = str_replace("Bearer ", "", getallheaders()['authorization']);
        $token = JWTHelper::decodeJWT($cred);
        if (!$token) {
            $this->renderJSON([
                "message" => "invalid cred"
            ]);
            die;
        }*/

        $currentUser = 'd2da2a15-b22c-4403-ad33-345f0f59ad03';
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
}
