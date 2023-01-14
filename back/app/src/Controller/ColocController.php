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
        $cred = str_replace("Bearer ", "", getallheaders()['Authorization']);
        $currentUser = $this->checkJwtAndGetUser($cred);

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
        $cred = str_replace("Bearer ", "", getallheaders()['Authorization']);
        $currentUser = $this->checkJwtAndGetUser($cred);

        $date = (new \DateTime("- $limitDate days"))->format('Y-m-d H:i:s');
        $expenseRepository = new ExpenseRepository(new PDOFactory());
        $userExpense = $expenseRepository->getAllExpenseByColocAndUserAndDateLimit($colocUuid, $currentUser, $date);
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
        $response = (array) json_decode(file_get_contents('php://input'));

        $cred = str_replace("Bearer ", "", getallheaders()['Authorization']);
        $currentUser = $this->checkJwtAndGetUser($cred);

        $users = $response['users'];
        $colocArgs = [
            'name' => $response['name'],
            'address' => $response['address'],
            'town' => $response['town'],
            'post_code' => $response['post_code']
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

            $userColocArgs = [
                'uuid' => $this->MakeUuid(),
                'user_uuid' => $newUser->getUuid(),
                'coloc_uuid' => $colocUuid,
                'admin' => $admin
            ];

            $newUserColoc = new UserColoc($userColocArgs);
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
        $cred = str_replace("Bearer ", "", getallheaders()['Authorization']);
        $currentUser = $this->checkJwtAndGetUser($cred);

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
        $response = (array) json_decode(file_get_contents('php://input'));

        $cred = str_replace("Bearer ", "", getallheaders()['Authorization']);
        $currentUser = $this->checkJwtAndGetUser($cred);

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

        if (isset($response['address'])) {
            $coloc->setAddress($response['address']);
        }
        if (isset($response['name'])) {
            $coloc->setName($response['name']);
        }
        if (isset($response['post_code'])) {
            $coloc->setPostCode($response['post_code']);
        }
        if (isset($response['town'])) {
            $coloc->setTown($response['town']);
        }

        $file = null;
        if (isset($_FILES['fileToUpload']['name'])) {
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
        $cred = str_replace("Bearer ", "", getallheaders()['Authorization']);
        $currentUser = $this->checkJwtAndGetUser($cred);

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
        $cred = str_replace("Bearer ", "", getallheaders()['Authorization']);
        $currentUser = $this->checkJwtAndGetUser($cred);

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

    #[Route('/api/addUserToColoc/{colocUuid}', 'add user to coloc', ['POST'])]
    public function addUserToColoc($colocUuid)
    {
        $response = (array) json_decode(file_get_contents('php://input'));

        $cred = str_replace("Bearer ", "", getallheaders()['Authorization']);
        $currentUser = $this->checkJwtAndGetUser($cred);

        $userColocRepository = new UserColocRepository(new PDOFactory());
        $admin = $userColocRepository->getAdminByColocUuid($colocUuid);

        if ($admin['user_uuid'] !== $currentUser) {
            $this->renderJSON([
                "error" => 'Vous n\'étes pas admin'
            ]);
            http_response_code(200);
            die;
        }

        $userMail = $response['email'];
        $userRepository = new UserRepository(new PDOFactory());
        $user = $userRepository->getUserByMail($userMail);

        $userColoc = $userColocRepository->getUserColocByUserUuidAndColocUuid($user->getUuid(), $colocUuid);

        if ($userColoc) {
            $this->renderJSON([
                "error" => 'aucun user avec cette email'
            ]);
            http_response_code(200);
            die;
        }

        $userColocArgs = [
            'uuid' => $this->MakeUuid(),
            'user_uuid' => $user->getUuid(),
            'coloc_uuid' => $colocUuid
        ];

        $userColoc = new UserColoc($userColocArgs);
        $userColocRepository->insertUserColoc($userColoc);

        $this->renderJSON([
            'success' => 'mise à jour du user effectuée avec succès'
        ]);
        die();
    }
}
