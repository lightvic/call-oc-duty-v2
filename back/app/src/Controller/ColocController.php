<?php

namespace App\Controller;

use App\Model\Entity\Coloc;
use App\Model\Entity\User;
use App\Model\Entity\UserColoc;
use App\Model\Factory\PDOFactory;
use App\Model\Repository\ColocRepository;
use App\Model\Repository\ExpenseRepository;
use App\Model\Repository\UserColocRepository;
use App\Model\Repository\UserRepository;
use App\Route\Route;
use App\Services\JWTHelper;
use http\Message;

class colocController extends Controller
{
    #[Route('/api/colocSection', 'colocSection', ['GET'])]
    public function colocSection()
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
        $colocRepository = new ColocRepository(new PDOFactory());
        $colocs = $colocRepository->getAllColocByUserId($currentUser);

        if($colocs) {
            $this->renderJSON([
                "colocs" => $colocs
            ]);
            http_response_code(200);
            die;
        }
        $this->renderJSON([
            "message" => "Aucune call'oc"
        ]);
        die();
    }

    #[Route('/api/colocStat/{colocUuid}&{limitDate}', 'colocStat', ['GET'])]
    public function colocStat($colocUuid, $limitDate)
    {
        /*$cred = str_replace("Bearer ", "", getallheaders()['authorization']);
        $token = JWTHelper::decodeJWT($cred);
        if (!$token) {
            $this->renderJSON([
                "message" => "invalid cred"
            ]);
            die;
        }*/
        $userUuid = 'd2da2a15-b22c-4403-ad33-345f0f59ad03';
        $date = (new \DateTime("- $limitDate days"))->format('Y-m-d H:i:s');
        $expenseRepository = new ExpenseRepository(new PDOFactory());
        $userExpense = $expenseRepository->getAllExpenseByColocAndUserAndDateLimit($colocUuid, $userUuid, $date);
        $colocExpense = $expenseRepository->getAllExpenseByColocUuidAndDateLimit($colocUuid, $date);

        if($userExpense && $colocExpense) {
            $this->renderJSON([
                "userExpense" => $userExpense,
                "colocExpense" => $colocExpense
            ]);
            http_response_code(200);
            die;
        }
        $this->renderJSON([
            "message" => "Aucune call'oc"
        ]);
        die();
    }


    #[Route('/api/newColoc', 'new coloc', ['POST'])]
    public function newColoc()
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
        $users = [];
        foreach (array_keys($_POST) as $post_key) {
            if (str_starts_with($post_key, 'users')) {
                array_push($users, $_POST[$post_key]);
            }
        }
        $colocArgs = [
            'address' => $_POST['address'],
            'town' => $_POST['town'],
            'post_code' => $_POST['post_code']
        ];

        $colocRepository = new ColocRepository(new PDOFactory());
        $coloc = new Coloc($colocArgs);

        $colocUuid = $this->MakeUuid();
        $coloc->setUuid($colocUuid);
        $coloc = $colocRepository->insert($coloc);

        $userColoc = [];
        foreach ($users as $user) {
            $userRepository = new UserRepository(new PDOFactory());
            $newUser = $userRepository->getUserByMail($user);
            $admin = 0;
            if ($newUser->getUuid() === $currentUser) {
                $admin = 1;

            }

            $colocArgs = [
                'uuid' => $this->MakeUuid(),
                'user_uuid' => $newUser->getUuid(),
                'coloc_uuid' => $colocUuid,
                'admin' => $admin
            ];

            $newUserColoc = new UserColoc($colocArgs);
            $userColocRepository = new UserColocRepository(new PDOFactory());
            $newUserColoc = $userColocRepository->insertUserColoc($newUserColoc);

            $userColoc[] = $newUserColoc;
        }

        if(count($userColoc) > 0 && $coloc) {
            $this->renderJSON([
                "coloc" => $coloc,
                "userColoc" => $userColoc
            ]);
            http_response_code(200);
            die;
        }
        $this->renderJSON([
            "error" => 'un problème est survenu'
        ]);
        http_response_code(200);
        die;
    }

    #[Route('/api/modifyInfo/{colocUuid}', 'modify info', ['GET'])]
    public function modifyInfo($colocUuid)
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
        $userRepository = new UserRepository(new PDOFactory());
        $users = $userRepository->getAllUsersByCollocUuid($colocUuid);

        $colocRepository = new ColocRepository(new PDOFactory());
        $coloc = $colocRepository->getColocByUuid($colocUuid);

        if($coloc && count($users) > 0 ) {
            $this->renderJSON([
                "coloc" => $coloc,
                "users" => $users
            ]);
            http_response_code(200);
            die;
        }
        $this->renderJSON([
            "message" => "Aucune call'oc"
        ]);
        die();
    }

    #[Route('/api/modifyColoc/{colocUuid}', 'modify coloc', ['POST'])]
    public function modifyColoc($colocUuid)
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
        $userColocRepository = new UserColocRepository(new PDOFactory());
        $admin = $userColocRepository->getAdminByColocUuid($colocUuid);

        if ($admin['user_uuid'] !== $currentUser) {
            $this->renderJSON([
                "error" => 'Vous n\'étes pas admin'
            ]);
            http_response_code(200);
            die;
        }

        $colocRepository = new ColocRepository(new PDOFactory());
        $coloc = $colocRepository->getColocByUuid($colocUuid);

        if ($_POST['address'] != null) {
            $coloc->setAddress($_POST['address']);
        }
        if ($_POST['post_code'] != null) {
            $coloc->setPostCode($_POST['post_code']);
        }
        if ($_POST['town'] != null) {
            $coloc->setTown($_POST['town']);
        }

        $file = null;
        if ($_FILES['fileToUpload']['name']) {
            $fileName = $this->MakeUuid() . '.' . strtolower(pathinfo($_FILES["fileToUpload"]['name'],PATHINFO_EXTENSION));
            $isSaved = $this->saveFile($fileName);
            if ($isSaved[0] === 'error'){
                $this->renderJSON($isSaved);
                die();
            }
            $file = $fileName;
        }
        $coloc->setPicture($file);

        $colocRepository->update($coloc);

        $this->renderJSON([
            'success' => 'mise à jour du user effectuée avec succès'
        ]);
        die();
    }


    #[Route('/api/deleteUserFromColoc/{userUuid}&{colocUuid}', 'delete_user from coloc', ['POST'])]
    public function deleteUserFromColoc($userUuid, $colocUuid)
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
        $userColocRepository = new UserColocRepository(new PDOFactory());
        $admin = $userColocRepository->getAdminByColocUuid($colocUuid);

        if ($admin['user_uuid'] !== $currentUser) {
            $this->renderJSON([
                "error" => 'Vous n\'étes pas admin'
            ]);
            http_response_code(200);
            die;
        }

         if ($currentUser === $userUuid) {
             $this->renderJSON([
                 "error" => 'tu dois être très très con pour vouloir te supprimer...'
             ]);
             http_response_code(200);
             die;
         }

         $userColocRepository->deleteUserColocByUserUuidAndColocUuid($userUuid, $colocUuid);

        $this->renderJSON([
            'success' => 'mise à jour du user effectuée avec succès'
        ]);
        die();
    }

    #[Route('/api/deleteColoc/{colocUuid}', 'delete coloc', ['POST'])]
    public function deleteColoc($colocUuid)
    {
        /*$cred = str_replace("Bearer ", "", getallheaders()['authorization']);
        $token = JWTHelper::decodeJWT($cred);
        if (!$token) {
            $this->renderJSON([
                "message" => "invalid cred"
            ]);
            die;
        }*/

        $currentUser = '4aad1ecd-77cd-48cf-bbe1-b101868f69a8';
        $userColocRepository = new UserColocRepository(new PDOFactory());
        $admin = $userColocRepository->getAdminByColocUuid($colocUuid);

        if ($admin['user_uuid'] !== $currentUser) {
            $this->renderJSON([
                "error" => 'Vous n\'étes pas admin'
            ]);
            http_response_code(200);
            die;
        }

        $colocRepository = new ColocRepository(new PDOFactory());
        $colocRepository->delete($colocUuid);

        $this->renderJSON([
            'success' => 'mise à jour du user effectuée avec succès'
        ]);
        die();
    }
}
